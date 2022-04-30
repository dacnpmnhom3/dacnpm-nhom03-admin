import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
// material
import { Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import axiosClient from "src/api/axiosClient";
import { setErrorMsg } from "src/redux/alert";
import { useDispatch } from "react-redux";
// ----------------------------------------------------------------------

export default function ForgotPasswordForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      redirectUrl: "http://localhost:3000/passwordreset",
    },
    validationSchema: LoginSchema,
    onSubmit: async () => {
      try {
        const res = await axiosClient.post("/api/admin/requestPasswordReset", {
          email: values.email,
          redirectUrl: "http://localhost:3000/passwordreset",
        });
        console.log(res.data);

        navigate(`/emailsent/${values.email}`, { replace: true });
      } catch (error) {
        if (error.response.data.message) {
          dispatch(setErrorMsg(error.response.data.message));
        } else console.log(error);
      }
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Enter your Email address"
            {...getFieldProps("email")}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{ mt: 3 }}
        >
          Submit
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}

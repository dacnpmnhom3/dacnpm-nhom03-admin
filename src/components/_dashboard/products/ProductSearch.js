import { Icon } from "@iconify/react";
import searchFill from "@iconify/icons-eva/search-fill";
// material
import { styled } from "@mui/material/styles";
import { Box, TextField, Autocomplete, InputAdornment } from "@mui/material";
import { useNavigate } from "react-router-dom";
// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  "& .MuiAutocomplete-root": {
    width: 200,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter,
    }),
    "&.Mui-focused": {
      width: 240,
      "& .MuiAutocomplete-inputRoot": {
        boxShadow: theme.customShadows.z12,
      },
    },
  },
  "& .MuiAutocomplete-inputRoot": {
    "& fieldset": {
      borderWidth: `1px !important`,
      borderColor: `${theme.palette.grey[500_32]} !important`,
    },
  },
  "& .MuiAutocomplete-option": {
    "&:not(:last-child)": {
      borderBottom: `solid 1px ${theme.palette.divider}`,
    },
  },
}));

// ----------------------------------------------------------------------

export default function ProductSearch({ products }) {
  const navigate = useNavigate();
  const handleChangeInput = (event, value) => {
    navigate(`./${value._id}`, { replace: true });
  };
  return (
    <RootStyle>
      <Autocomplete
        size="small"
        disablePortal
        popupIcon={null}
        options={products}
        getOptionLabel={(clss) => clss.name}
        onChange={handleChangeInput}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search product..."
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <>
                  <InputAdornment position="start">
                    <Box
                      component={Icon}
                      icon={searchFill}
                      sx={{
                        ml: 1,
                        width: 20,
                        height: 20,
                        color: "text.disabled",
                      }}
                    />
                  </InputAdornment>
                  {params.InputProps.startAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </RootStyle>
  );
}

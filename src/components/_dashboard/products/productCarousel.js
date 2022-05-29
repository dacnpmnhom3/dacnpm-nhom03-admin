// import * as React from "react";
// import { useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import MobileStepper from "@mui/material/MobileStepper";
// import Paper from "@mui/material/Paper";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import { Icon } from "@iconify/react";
// import arrowLeftFill from "@iconify/icons-eva/arrow-left-fill";
// import arrowRightFill from "@iconify/icons-eva/arrow-right-fill";
// import SwipeableViews from "react-swipeable-views";
// // import { autoPlay } from "react-swipeable-views-utils";

// // const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

// const images = [
//   {
//     label: "San Francisco – Oakland Bay Bridge, United States",
//     imgPath:
//       "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
//   },
//   {
//     label: "Bird",
//     imgPath:
//       "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60",
//   },
//   {
//     label: "Bali, Indonesia",
//     imgPath:
//       "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80",
//   },
//   {
//     label: "Goč, Serbia",
//     imgPath:
//       "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
//   },
// ];

// function ImagesCarousel() {
//   const theme = useTheme();
//   const [activeStep, setActiveStep] = React.useState(0);
//   const maxSteps = images.length;

//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleStepChange = (step) => {
//     setActiveStep(step);
//   };

//   return (
//     <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
//       <Paper
//         square
//         elevation={0}
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           height: 50,
//           pl: 2,
//           bgcolor: "background.default",
//         }}
//       >
//         <Typography>{images[activeStep].label}</Typography>
//       </Paper>
//       <SwipeableViews
//         axis={theme.direction === "rtl" ? "x-reverse" : "x"}
//         index={activeStep}
//         onChangeIndex={handleStepChange}
//         enableMouseEvents
//       >
//         {images.map((step, index) => (
//           <div key={step.label}>
//             {Math.abs(activeStep - index) <= 2 ? (
//               <Box
//                 component="img"
//                 sx={{
//                   height: 255,
//                   display: "block",
//                   maxWidth: 400,
//                   overflow: "hidden",
//                   width: "100%",
//                 }}
//                 src={step.imgPath}
//                 alt={step.label}
//               />
//             ) : null}
//           </div>
//         ))}
//       </SwipeableViews>
//       <MobileStepper
//         steps={maxSteps}
//         position="static"
//         activeStep={activeStep}
//         nextButton={
//           <Button
//             size="medium"
//             onClick={handleNext}
//             disabled={activeStep === maxSteps - 1}
//           >
//             Next
//             {theme.direction === "rtl" ? (
//               <Icon icon={arrowLeftFill} />
//             ) : (
//               <Icon icon={arrowRightFill} />
//             )}
//           </Button>
//         }
//         backButton={
//           <Button onClick={handleBack} disabled={activeStep === 0}>
//             {theme.direction === "rtl" ? (
//               <Icon icon={arrowRightFill} />
//             ) : (
//               <Icon icon={arrowLeftFill} />
//             )}
//             Back
//           </Button>
//         }
//       />
//     </Box>
//   );
// }

// export default ImagesCarousel;

import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export default function StandardImageList({ images }) {
  return (
    <ImageList sx={{ width: "100%", height: 450 }} cols={3} rowHeight={164}>
      {images.map((item, index) => (
        <ImageListItem key={index}>
          <img src={item} loading="lazy" />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

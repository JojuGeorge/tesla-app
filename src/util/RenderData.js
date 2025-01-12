import { vehicleModels, commonViews, uniqueViews, modelColors } from "./Config";

// Render image data
const RenderData = () => {
  const renderImage = Object.keys(vehicleModels).reduce((acc, model) => {
    // Get the vehicle code for the model
    const vehicleCode = vehicleModels[model];

    // If the model has unique views, merge them with common views
    if (vehicleCode !== "my") {
      acc[vehicleCode] = {
        view_value: [...commonViews, ...(uniqueViews[vehicleCode] || [])],
        colors: modelColors[vehicleCode], // Add the colors for this model
      };
    } else {
      acc[vehicleCode] = {
        view_value: [...(uniqueViews[vehicleCode] || [])],
        colors: modelColors[vehicleCode], // Add the colors for Model Y
      };
    }

    return acc;
  }, {});
  return renderImage;
};

export default RenderData;

// OUTPUT
// {
//   "ms": {
//       "view_value": [
//           "STUD_3QTR",
//           "STUD_REAR",
//           "STUD_SIDE",
//           "STUD_SEAT"
//       ],
//       "colors": [
//           "COL3-PPSW",
//           "COL1-PBSB",
//           "COL2-PMNG",
//           "COL2-PPSB",
//           "COL3-PPMR"
//       ]
//   },
//   "m3": {
//       "view_value": [
//           "STUD_3QTR",
//           "STUD_REAR",
//           "STUD_SIDE",
//           "STUD_SEAT",
//           "STUD_WHEEL"
//       ],
//       "colors": [
//           "PPSW",
//           "PBSB",
//           "PMNG",
//           "PPSB",
//           "PPMR"
//       ]
//   },
//   "mx": {
//       "view_value": [
//           "STUD_3QTR",
//           "STUD_REAR",
//           "STUD_SIDE",
//           "STUD_SEAT"
//       ],
//       "colors": [
//           "COL3-PPSW",
//           "COL1-PBSB",
//           "COL2-PMNG",
//           "COL2-PPSB",
//           "COL3-PPMR"
//       ]
//   },
//   "my": {
//       "view_value": [
//           "STUD_3QTR",
//           "STUD_SEAT",
//           "STUD_WHEEL"
//       ],
//       "colors": [
//           "PPSW",
//           "PBSB",
//           "PMNG",
//           "PPSB",
//           "PPMR"
//       ]
//   },
//   "rd": {
//       "view_value": [
//           "STUD_3QTR",
//           "STUD_REAR",
//           "STUD_SIDE",
//           "STUD_SEAT"
//       ],
//       "colors": [
//           "COL3-THGR",
//           "COL2-OBBK",
//           "COL2-STSL",
//           "COL3-ELBL",
//           "COL1-FURD"
//       ]
//   }
// }

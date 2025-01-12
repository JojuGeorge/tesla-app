import { vehicleModels, commonStuds, uniqueStuds, modelColors } from "./Config";

// Render image data
const Render = () => {
  const renderImage = Object.keys(vehicleModels).reduce((acc, model) => {
    // Get the vehicle code for the model
    const vehicleCode = vehicleModels[model];

    // If the model has unique studs, merge them with common studs
    if (vehicleCode !== "my") {
      acc[vehicleCode] = {
        stud_value: [...commonStuds, ...(uniqueStuds[vehicleCode] || [])],
        colors: modelColors[vehicleCode], // Add the colors for this model
      };
    } else {
      acc[vehicleCode] = {
        stud_value: [...(uniqueStuds[vehicleCode] || [])],
        colors: modelColors[vehicleCode], // Add the colors for Model Y
      };
    }

    return acc;
  }, {});
  return renderImage;
};

export default Render;

// OUTPUT
// {
//   ms: {
//     stud_value: [ 'STUD_3QTR', 'STUD_REAR', 'STUD_SIDE', 'STUD_SEAT' ],
//     colors: [ 'COL3-PPSW', 'COL1-PBSB', 'COL2-PMNG', 'COL2-PPSB', 'COL3-PPMR' ]
//   },
//   m3: {
//     stud_value: [
//       'STUD_3QTR',
//       'STUD_REAR',
//       'STUD_SIDE',
//       'STUD_SEAT',
//       'STUD_WHEEL'
//     ],
//     colors: [ 'PPSW', 'PBSB', 'PMNG', 'PPSB', 'PPMR' ]
//   },
//   mx: {
//     stud_value: [ 'STUD_3QTR', 'STUD_REAR', 'STUD_SIDE', 'STUD_SEAT' ],
//     colors: [ 'COL3-PPSW', 'COL1-PBSB', 'COL2-PMNG', 'COL2-PPSB', 'COL3-PPMR' ]
//   },
//   my: {
//     stud_value: [ 'STUD_3QTR', 'STUD_WHEEL', 'STUD_SEAT' ],
//     colors: [ 'PPSW', 'PBSB', 'PMNG', 'PPSB', 'PPMR' ]
//   },
//   rd: {
//     stud_value: [ 'STUD_3QTR', 'STUD_REAR', 'STUD_SIDE', 'STUD_SEAT' ],
//     colors: undefined
//   },
//   cy: {
//     stud_value: [ 'STUD_3QTR', 'STUD_REAR', 'STUD_SIDE', 'STUD_SEAT' ],
//     colors: undefined
//   }
// }

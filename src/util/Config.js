export const vehicleDetailsApi =
  "https://jojugeorge.github.io/tesla_cars_api/tesla_cars.json";

// Vehicle model mapping to codes
export const vehicleModels = {
  "Model S": "ms",
  "Model 3": "m3",
  "Model X": "mx",
  "Model Y": "my",
  Roadster: "rd",
};

// Common stud values for all vehicles
export const commonStuds = ["STUD_3QTR", "STUD_REAR", "STUD_SIDE", "STUD_SEAT"];

// Unique stud values for specific models
export const uniqueStuds = {
  m3: ["STUD_WHEEL"], // Model 3 unique studs
  my: ["STUD_WHEEL"], // Model Y unique studs
};

// Colors associated with each model
export const modelColors = {
  ms: ["COL3-PPSW", "COL1-PBSB", "COL2-PMNG", "COL2-PPSB", "COL3-PPMR"],
  m3: ["PPSW", "PBSB", "PMNG", "PPSB", "PPMR"],
  mx: ["COL3-PPSW", "COL1-PBSB", "COL2-PMNG", "COL2-PPSB", "COL3-PPMR"],
  my: ["PPSW", "PBSB", "PMNG", "PPSB", "PPMR"],
  rd: ["COL3-THGR", "COL2-OBBK", "COL2-STSL", "COL3-ELBL", "COL1-FURD"],
};

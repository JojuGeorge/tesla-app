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

export const colorCode = {
  ms: {
    "Pearl White Multi-Coat": "COL3-PPSW",
    "Midnight Silver Metallic": "COL2-PMNG",
    "Deep Blue Metallic": "COL2-PPSB",
    "Eclipse Black": "COL1-PBSB",
    "Sunset Red Multi-Coat": "COL3-PPMR",
  },
  mx: {
    "Pearl White Multi-Coat": "COL3-PPSW",
    "Midnight Silver Metallic": "COL2-PMNG",
    "Deep Blue Metallic": "COL2-PPSB",
    "Eclipse Black": "COL1-PBSB",
    "Sunset Red Multi-Coat": "COL3-PPMR",
  },

  m3: {
    "Pearl White Multi-Coat": "PPSW",
    "Midnight Silver Metallic": "PMNG",
    "Deep Blue Metallic": "PPSB",
    "Eclipse Black": "PBSB",
    "Sunset Red Multi-Coat": "PPMR",
  },
  my: {
    "Pearl White Multi-Coat": "PPSW",
    "Midnight Silver Metallic": "PMNG",
    "Deep Blue Metallic": "PPSB",
    "Eclipse Black": "PBSB",
    "Sunset Red Multi-Coat": "PPMR",
  },

  rd: {
    "Thunder Grey Premium": "COL3-THGR",
    "Obsidian Black Metallic": "COL2-OBBK",
    "Sterling Silver Metallic": "COL2-STSL",
    "Electric Blue Premium": "COL3-ELBL",
    "Fusion Red": "COL1-FURD",
  },
};

export const colorName = {
  "Pearl White Multi-Coat": "white",
  "Midnight Silver Metallic": "silver",
  "Deep Blue Metallic": "darkBlue",
  "Eclipse Black": "black",
  "Sunset Red Multi-Coat": "darkRed",
  "Thunder Grey Premium": "grey",
  "Obsidian Black Metallic": "black",
  "Sterling Silver Metallic": "silver",
  "Electric Blue Premium": "darkBlue",
  "Fusion Red": "darkRed",
};

// Common view values for all vehicles
export const commonViews = ["STUD_3QTR", "STUD_REAR", "STUD_SIDE", "STUD_SEAT"];

// Unique view values for specific models
export const uniqueViews = {
  m3: ["STUD_WHEEL"], // Model 3 unique views
  my: ["STUD_3QTR", "STUD_SEAT", "STUD_WHEEL"], // Model Y unique views
};

// Colors associated with each model
export const modelColors = {
  ms: ["COL3-PPSW", "COL1-PBSB", "COL2-PMNG", "COL2-PPSB", "COL3-PPMR"],
  m3: ["PPSW", "PBSB", "PMNG", "PPSB", "PPMR"],
  mx: ["COL3-PPSW", "COL1-PBSB", "COL2-PMNG", "COL2-PPSB", "COL3-PPMR"],
  my: ["PPSW", "PBSB", "PMNG", "PPSB", "PPMR"],
  rd: ["COL3-THGR", "COL2-OBBK", "COL2-STSL", "COL3-ELBL", "COL1-FURD"],
};

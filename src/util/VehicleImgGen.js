import RenderData from "./RenderData";
import { vehicleModels, colorCode } from "./Config";

const parameterGen = (modelCode, view, color) => {
  let mc = "3a1d1c6cdccb462405eee5db90fcbd39";
  if (modelCode == "my") {
    modelCode = mc;
    color += ",INYPB";
  }
  return `model=${modelCode}&options=${color}&view=${view}&size=1691`;
};

export const VehicleImgGen = (model, color) => {
  const modelCode = vehicleModels[model];
  const colorCde = colorCode[modelCode]?.[color];
  const renderData = RenderData();
  const views = renderData[modelCode]?.["view_value"];
  const site = modelCode === "rd" ? "www" : "static-assets";

  let urls = [];

  views?.forEach((view) => {
    const params = parameterGen(modelCode, view, colorCde);
    const url = `https://${site}.tesla.com/configurator/compositor/?${params}`;
    urls.push(url);
  });

  return urls;
};

import { toast } from "react-toastify";
import { TOAST_TYPE } from "../constants/AppConstants";

function buildUrl(url: string, searchParam: any, pathParams: any) {
  url = url.trim();
  if (pathParams) {
    Object.keys(pathParams).forEach((key: any) => {
      url = url.replace("{" + key + "}", pathParams[key]);
    });
  }

  if (searchParam) {
    Object.keys(searchParam).forEach((key: any) => {
      if (searchParam[key] === null || searchParam[key] === undefined) {
        delete searchParam[key];
      }
    });
    url += "?";
    url += Object.keys(searchParam)
      .map(function (key: any) {
        return [key, searchParam[key]].map(encodeURIComponent).join("=");
      })
      .join("&");
  }

  return url;
}
const showToast = (type: string, text: string) => {
  switch (type) {
    case TOAST_TYPE.SUCCESS:
      toast.success(text);
      break;
    case TOAST_TYPE.ERROR:
      toast.error(text);
      break;
    case TOAST_TYPE.INFO:
      toast.info(text);
      break;
    case TOAST_TYPE.WARNING:
      toast.warning(text);
    case TOAST_TYPE.DEFAULT:
      // toast.default(text);
      break;
    default:
      break;
  }
};


export function CommonUtils() {
  return {
    buildUrl,
    showToast,
  };
}

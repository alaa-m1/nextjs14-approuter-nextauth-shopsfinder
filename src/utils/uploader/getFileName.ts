import { v4 as uId } from "uuid";

export const getFileName = (file: File) => {
  const fullNameArr = file.name.split(".");
  fullNameArr.pop();
  const uniqueName = `${uId()}--${fullNameArr.join(".")}`;
  const ext = file.type.split("/")[1];
  return { uniqueName, fullName: `${uniqueName}.${ext}` };
};

import { allowedInfoToPrint } from "@/shared";
import { UserInfo } from "@/types";

export const sizeInMB = (sizeInBytes: number, decimalsNum = 2) => {
  const result = sizeInBytes / (1024 * 1024);
  return +result.toFixed(decimalsNum);
};

export const mapUserInfo = (userInfo: UserInfo) => {
  if (!userInfo) return [];
  const userInfoArr = Object.entries(userInfo);
  const bolbpart = [];
  for (const singleInfo of userInfoArr) {
    if (
      allowedInfoToPrint.includes(singleInfo[0]) &&
      typeof singleInfo[0] === "string" &&
      typeof singleInfo[1] === "string"
    ) {
      const partTitle = singleInfo[0].split(/(?=[A-Z])/).join(" ");

      bolbpart.push(`${upperFirstCharacter(partTitle,"firstWord")}: ${singleInfo[1]}\n`);
    }
  }
  return bolbpart;
};

export const upperFirstCharacter = (
  str: string,
  convert: "firstWord" | "allWords"
) => {
  const words = str.split(/\s+/);
  let result = "";
  if (convert === "allWords")
    result = words
      .map(
        (word) =>
          word.slice(0, 1).toLocaleUpperCase() + word.slice(1).toLowerCase()
      )
      .join(" ");
  if (convert === "firstWord")
    result = words
      .map((word, index) => {
        if (index > 0) return word.toLowerCase()
        else
          return (
            word.slice(0, 1).toLocaleUpperCase() + word.slice(1).toLowerCase()
          );
      })
      .join(" ");
  return result;
};

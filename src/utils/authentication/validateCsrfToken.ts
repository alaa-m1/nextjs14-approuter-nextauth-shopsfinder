import { createHash } from "crypto";
import { cookies } from "next/headers";

export const validateCsrfToken = async () => {
  try {
    const cookie = cookies().get("next-auth.csrf-token");
    if (!cookie) {
      return false;
    }

    if (!cookie.value) {
      return false;
    }
    const tokenHashDelimiter = cookie.value.indexOf("|") !== -1 ? "|" : "%7C";

    const [requestToken, requestHash] = cookie.value.split(tokenHashDelimiter);

    const secret = process.env.NEXTAUTH_SECRET;
    const validHash = createHash("sha256")
      .update(`${requestToken}${secret}`)
      .digest("hex");
    if (requestHash !== validHash) {
      return false;
    }
  } catch (err) {
    return false;
  }
  return true;
};

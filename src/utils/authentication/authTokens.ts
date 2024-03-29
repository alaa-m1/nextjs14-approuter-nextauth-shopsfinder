import jwt from "jsonwebtoken";

export const createActivationJWT = (payload: string | object) => {
  return jwt.sign(payload, process.env.ACTIVATION_ACCOUNT_TOKEN_SECRET!, {
    expiresIn: "3d",
  });
};

export const createResetJWT = (payload: string | object) => {
  return jwt.sign(payload, process.env.RESET_PASSWORD_TOKEN_SECRET!, {
    expiresIn: "5H",
  });
};

export const createUpdateJWT = (payload: string | object) => {
  return jwt.sign(payload, process.env.RESET_PASSWORD_TOKEN_SECRET!, {
    expiresIn: "3H",
  });
};

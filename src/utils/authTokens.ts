import jwt from 'jsonwebtoken';

export const createActivationJWT = (payload: string | object) => {
    return jwt.sign(payload, process.env.ACTIVATION_ACCOUNT_TOKEN_SECRET!, {
        expiresIn: '3d'
    });
}
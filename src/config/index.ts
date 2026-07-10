import 'dotenv/config'

export const config = {
  jwtSecret: process.env.JWT_SECRET ?? (() => { throw new Error("JWT_SECRET missing") })(),
};
// did it this way because when signing the JWT token, it expects the secret to be available. this is for typescript to know that an error will be thrown in the cases it isn't available
import jwt from "jsonwebtoken";

const createToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES,
      algorithm: "HS256",
    },
  );
};

export default createToken;

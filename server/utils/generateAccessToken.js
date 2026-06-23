import jwt from "jsonwebtoken";

const generateAccessToken = (userId) => {
  const token = jwt.sign(
    { id: userId },
    process.env.JSON_WEB_TOKEN_SECRET_KEY,
    { expiresIn: "1d" },
  );

  return token;
};

export default generateAccessToken;

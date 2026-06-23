import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken || req.headers?.authorization?.split(" ")[1];
    //const token = request.cookies?.accessToken;
    console.log("COOKIES:", req.cookies);
    if (!token) {
      return res.status(401).json({
        message: "Authentication token missing. Please log in.",
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

    req.userId = decoded.id;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
      success: false,
    });
  }
};

export default auth;

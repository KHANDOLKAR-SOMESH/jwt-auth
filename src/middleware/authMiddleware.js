import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const token = auth.split(" ")[1];

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);

    next();
  } catch {
    res.status(403).json({
      message: "Invalid token",
    });
  }
};

export default authMiddleware;

import jwt from "jsonwebtoken";
import userModel from "../schemas/userSchema.js";
import "../loadEnv.js";

export async function isAuthenticated(req, res, next) {
  let token;
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.status(401).send("Not Authorized, No token");
  }

  try {
    token = cookies.jwt;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findOne(
      { _id: decoded.id },
      { password: false }
    );

    if (user) {
      req.user = user;
      next();
    } else {
      res.status(401).send("Invalid Token");
    }
  } catch (error) {
    res.status(401).send("Not Authorized");
  }
}

export function isAdmin(req, res, next) {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(401).send("Not An Admin");
  }
}

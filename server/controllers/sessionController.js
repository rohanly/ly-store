import userModel from "../schemas/userSchema.js";
import createError from "http-errors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getUserData = async (req, res, next) => {
  try {
    const user = req.user;
    res.status(200).json({ user });
  } catch (error) {
    return next(createError(error));
  }
};

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const image = req.file;
    const userExists = await userModel.findOne({ email }).lean();

    if (userExists) {
      res.status(400).send("User Already Exists");
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      let userCreated = {};
      if (image) {
        const filePath = `/${image.destination}/${image.filename}`;

        userCreated = await userModel.create({
          ...req.body,
          password: hashedPassword,
          profilePic: filePath,
        });
      } else {
        userCreated = await userModel.create({
          ...req.body,
          password: hashedPassword,
        });
      }

      if (userCreated) {
        const accessToken = jwt.sign(
          { id: userCreated._id },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        res.cookie("jwt", accessToken, {
          httpOnly: true,
          maxAge: process.env.SESSION_EXPIRE * 60 * 60 * 1000,
        });
        const user = userCreated;
        res.status(200).json({ user });
      } else {
        res.status(400).send("Invalid User Data");
      }
    }
  } catch (error) {
    return next(createError(error));
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    console.log(email, password);

    if (!email) {
      res.status(400).send("Please Enter Email");
    }

    if (!password) {
      res.status(400).send("Please Password");
    }

    const user = await userModel.findOne({ email: email });

    if (user && (await bcrypt.compare(password, user.password))) {
      //Create JWT
      const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res.cookie("jwt", accessToken, { httpOnly: true });
      res.status(200).json({ user });
    } else {
      res.status(401).json("Incorrect Email or password");
    }
  } catch (error) {
    return next(createError(error));
  }
};

export const logout = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
      return res.sendStatus(204); //No Content
    } else {
      res.clearCookie("jwt", { httpOnly: true });
      res.sendStatus(204);
    }
  } catch (error) {
    return next(createError(error));
  }
};

export const update = async (req, res, next) => {
  try {
    const image = req.file;
    if (image) {
      const filePath = `/${image.destination}/${image.filename}`;

      await userModel.findOneAndUpdate(
        { _id: req.user._id },
        { $set: { ...req.body, profilePic: filePath } }
      );
    } else {
      await userModel.findOneAndUpdate(
        { _id: req.user._id },
        { $set: { ...req.body } }
      );
    }

    res.sendStatus(204);
  } catch (error) {
    return next(createError(error));
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await userModel.findOneAndUpdate(
      { _id: req.user._id },
      { $set: { password: hashedPassword } }
    );

    res.sendStatus(204);
  } catch (error) {
    return next(createError(error));
  }
};

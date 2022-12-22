import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import cors from "cors";

// routes
import routes from "./route/routes.js";
import gamesRoutes from "./route/gamesRoute.js";
import roundsRoutes from "./route/roundsRoutes.js";

// required for authentication
import passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import UserModel from "./model/userModel.js";
import { ExtractJwt, Strategy as JWTstrategy } from "passport-jwt";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;
const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected! 😍"))
  .catch(() => console.log("Database is not connected! ☹️"));

mongoose.connection.on("error", (msg) => {
  console.log("Oopsi happened", msg);
});

// Express middleware
app.use(express.json());
app.use(cors());

// Authentication
passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        const user = await UserModel.create({ username, password });

        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        const user = await UserModel.findOne({ username });

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: "Wrong Password" });
        }

        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter("secret_token"),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

// End of Authentication

// Routes
app.use("/", routes);

// Secure Routes
app.use(
  "/games",
  passport.authenticate("jwt", { session: false }),
  gamesRoutes
);
app.use(
  "/rounds",
  passport.authenticate("jwt", { session: false }),
  roundsRoutes
);

app.listen(PORT, () => {
  console.log("Server started", PORT);
});

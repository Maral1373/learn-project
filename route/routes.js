import express from "express";
import passport from "passport";

const router = express.Router();

router
  .route("/signup")
  .post(
    passport.authenticate("signup", { session: false }),
    async (req, res, next) => {
      res.json({
        message: "Signup successful",
        user: req.user,
      });
    }
  );

router.route("/login").post(async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error("An error occurred.");

        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, username: user.username };
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET);

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

// router.post(
//   '/login',
//   async (req, res, next) => {
//     passport.authenticate(
//       'login',
//       async (err, user, info) => {
//         try {
//           if (err || !user) {
//             const error = new Error('An error occurred.');

//             return next(error);
//           }

//           req.login(
//             user,
//             { session: false },
//             async (error) => {
//               if (error) return next(error);

//               const body = { _id: user._id, email: user.email };
//               const token = jwt.sign({ user: body }, 'TOP_SECRET');

//               return res.json({ token });
//             }
//           );
//         } catch (error) {
//           return next(error);
//         }
//       }
//     )(req, res, next);
//   }
// );

// router.post(
//   "/signup",
//   passport.authenticate("signup", { session: false }),
//   async (req, res, next) => {
//     res.json({
//       message: "Signup successful",
//       user: req.user,
//     });
//   }
// );

// router.route("/").get(getUsers);
// router.route("/:id").get(getUserById);

export default router;

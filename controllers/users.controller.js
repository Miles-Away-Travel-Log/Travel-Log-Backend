import User from "../models/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// get User

export async function getUser(req, res) {
    const id = req.params.id;
    const user = await User.findById(id);

    if (user === undefined) {
        res.status(400).send("User not found");
        return;
    }

    res.status(200).json({
        message: "User found",
        user: {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            city: user.city,
            country: user.country,
            userName: user.userName,
        },
    });
}

// Login

export async function login(req, res) {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    try {
        if (!user) {
            res.status(400).send("User not found");
            return;
        }
        const newPassword = await bcrypt.compare(password, user.password);
        if (newPassword === true) {
            const token = jwt.sign(
                { id: user._id },
                process.env.SECRET_JWT_KEY
            );
            res.status(200).json({
                message: "Login successful",
                token: token,
                user: {
                    id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    city: user.city,
                    country: user.country,
                    userName: user.userName,
                },
            });
        } else {
            res.status(400).send("Password incorrect");
        }
    } catch (err) {
        res.status(400).send(err);
    }
}

// Register

export async function register(req, res) {
    /*     if (
        !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/? ]).{8,}$/.test(
          password
        )
      ) {
        res
          .status(400)
          .send(
            'Password should contain number, uppercase, lowercase, special character.'
          );
        return;
      } */
    const { firstName, lastName, userName, city, country, email, password } =
        req.body;
    const user = await User.findOne({ email });
    if (user) {
        res.status(400).send("User already exists");
        return;
    }
    const newPassword = await bcrypt.hash(password, 10);

    try {
        await User.create({
            firstName,
            lastName,
            email,
            password: newPassword,
            city,
            country,
            userName,
        });
        res.status(201).send("User created");
    } catch (err) {
        res.status(400).send(err);
    }
}
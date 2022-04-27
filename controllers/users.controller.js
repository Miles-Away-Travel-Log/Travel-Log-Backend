import User from "../models/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import Friend from "../models/friends.model.js";
// get User

export async function getUser(req, res) {
    const id = req.params.id;
    const user = await User.findById(id)
        .populate("seedMoney")
        .populate("budget")
        .exec();

    if (user === undefined) {
        res.status(400).send("User not found");
        return;
    }

    const aggregateFriends = await Friend.aggregate([
        {
            $match: {
                $or: [{ sentRequest: user._id }, { receivedRequest: user._id }],
            },
        },
    ]);

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
            budget: user.budget,
            seedMoney: user.seedMoney,
            status: user.status,
            friends: aggregateFriends,
        },
    });
}

// get all Users

export async function getAllUser(req, res) {
    const listOfUsers = await User.find({ visible: true }).exec();

    if (listOfUsers === undefined || listOfUsers.length === 0 || !listOfUsers) {
        res.status(400).send("No users found");
        return;
    }

    const selectedDataFromListOfUsers = listOfUsers.map((user) => {
        return {
            id: user._id,
            email: user.email,
            userName: user.userName,
        };
    });

    res.status(200).json({
        message: "User found",
        users: selectedDataFromListOfUsers,
    });
}

// Login

export async function login(req, res) {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    const aggregateFriends = await Friend.aggregate([
        {
            $match: {
                $or: [{ sentRequest: user._id }, { receivedRequest: user._id }],
            },
        },
    ]);
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
                    friends: aggregateFriends,
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
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        if (
            !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/? ]).{8,}$/.test(
                req.body.password
            )
        ) {
            res.status(400).send(
                "Password should contain number, uppercase, lowercase, special character."
            );
            return;
        }
        const {
            firstName,
            lastName,
            userName,
            city,
            country,
            email,
            password,
        } = req.body;
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
    } else {
        res.status(400).json({
            message: "Validation failed",
            errors: errors.array(),
        });
    }
}

// delete User

export async function deleteUser(req, res) {
    const id = req.params.id;
    const user = await User.findById({ _id: id });
    if (!user) {
        res.status(400).send("User not found");
        return;
    }
    try {
        await User.findByIdAndDelete({ _id: id });
        res.status(200).send("User deleted");
    } catch (err) {
        res.status(400).send(err);
    }
}

// update User

export async function updateUser(req, res) {
    const errors = validationResult(req);
    const id = req.params.id;
    console.log("id:", id);
    const updatedUser = req.body;
    console.log("body", updatedUser);

    if (!updatedUser || !id) {
        res.status(400).send("User not found");
        return;
    }

    if (errors.isEmpty()) {
        if (req.body.password) {
            if (
                !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/? ]).{8,}$/.test(
                    req.body.password
                )
            ) {
                res.status(400).send(
                    "Password should contain number, uppercase, lowercase, special character."
                );
                return;
            }

            const newPassword = await bcrypt.hash(req.body.password, 10);

            try {
                await User.findByIdAndUpdate(
                    { _id: id },
                    { ...updatedUser, password: newPassword }
                );
                res.status(200).send("User updated");
            } catch (error) {
                res.status(400).send(error);
            }
        } else {
            try {
                await User.findByIdAndUpdate({ _id: id }, updatedUser);
                res.status(200).send("User updated");
            } catch (error) {
                res.status(400).send(error);
            }
        }
    } else {
        res.status(400).json({
            message: "Update failed",
            errors: errors.array(),
        });
    }
}

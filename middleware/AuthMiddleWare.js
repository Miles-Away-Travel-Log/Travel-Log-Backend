import jwt from "jsonwebtoken";
import "dotenv/config";

export function auth() {
    return function (req, res, next) {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            return next();
        }

        try {
            const content = jwt.verify(token, process.env.SECRET_JWT_KEY);
            req.tokenContent = content;
            next();
        } catch (error) {
            next();
        }
    };
}

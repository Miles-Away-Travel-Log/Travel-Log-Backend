export function permission() {
    return function (req, res, next) {
        if (!req.tokenContent) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
        next();
    };
}

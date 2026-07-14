export const businessPage = (req, res) => {
    res.json({
        message: "Protected Route",
        user: req.user
    });
}

export const customerPage = (req, res) => {
    res.json({
        message: "Protected Route",
        user: req.user
    });
}

export const currentUser = (req, res) => {
    res.status(200).json({
        user: req.user,
    });
};
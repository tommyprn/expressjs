const jwt = require("jsonwebtoken");
const { User } = require('../models')

exports.auth = (req, res, next) => {
    let header, token;

    if (
        !(header = req.header("Authorization")) ||
        !(token = header.replace("Bearer ", ""))
    )
        return res.status(401).send({ message: "You are Hacker!?" });

    try {
        const verified = jwt.verify(token, process.env.MY_SECRET);
        req.user = verified;
        next();
    }

    catch (error) {
        res.status(400).send({ message: "This is not your ninja way! Register to choose youy way!" });
    }
};

exports.admin = async (req, res, next) => {
    {
        try {
            const { id } = req.user
            const user = await User.findOne({
                where: {
                    id
                }
            });

            if (user.roleId === 1) {
                next()
            }
            else {
                res.status(400).send({ message: "This is beyond your bouondary as user!" });
            }
        }
        catch (error) {
            console.log(error);
            res.status(400).send({ message: "Something went wrong" });
        }
    }
};
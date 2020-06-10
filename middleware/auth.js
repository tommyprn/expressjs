const jwt = require("jsonwebtoken");

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
        res.status(400).send({ message: "This is not your ninja way!" });
    }
};
const { User } = require("../models");
const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
    try {
        const schema = Joi.object({
            email: Joi.string()
                .email()
                .min(6)
                .required(),

            password: Joi.string()
                .min(6)
                .required(),
        });

        //Login error, input not met requirement
        const { error } = schema.validate(req.body);
        if (error)
            res.status(400).send({
                error: {
                    message: error.details[0].message,
                },
            });

        //Email error on login
        const { email, password } = req.body;
        const user = await User.findOne({
            where: { email },
        });
        if (!user) 
            return res.status(400).send({ message: "Wrong Email/ password" });
        
        //Password error on login    
        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) 
            return res.status(400).send({ message: "Wrong password/email" });
             const token = jwt.sign({ id: user.id }, process.env.MY_SECRET);
                res.send({
                    data: {
                        email,
                        token,
                    },
                });
    } 
    catch (error) {
        console.log(error);
    }
};

exports.register = async (req, res) => {
    try {
        const schema = Joi.object({
        fullName: Joi.string()
            .alphanum()
            .min(3)
            .required(),

        email: Joi.string()
            .email()
            .min(6)
            .required(),

        password: Joi.string()
            .min(6)
            .required(),

        gender: Joi.string()
            .alphanum()
            .min(4)
            .max(6)
            .required(),

        phone: Joi.string()
            .min(6)
            .required(),

        address: Joi.string()
            .min(6)
            .required(),
        });

        //Register error, input not met requirement
        const { error } = schema.validate(req.body);
        if (error)
        return res.status(400).send({
            error: {
            message: error.details[0].message,
            },
        });

        //hased pass & send response & generate token
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ ...req.body, password: hashedPassword });
        const token = jwt.sign({ id: user.id }, process.env.MY_SECRET);

        res.send({
        data: {
            email,
            token,
        },
        });
    } 
    catch (error) {
        console.log(error);
  }
};
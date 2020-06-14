const { User, Role } = require("../models");

exports.read = async (req, res) => {
    try {
        const user = await User.findAll({
            include: {
                model: Role,
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            },
            attributes: {
                exclude: ["createdAt", "updatedAt", "RoleId", "roleId"]
            }
        });
        res.send({ data: user});
    } 
    catch (error) {
        console.log(error);
    }
};

exports.readOne = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({
            include: {
                model: Role,
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            },
            attributes: {
                exclude: ["createdAt", "updatedAt", "RoleId", "roleId"]
            },
            where: {
            id,
            },
        });

        res.send({ data: user });
    } 
    catch (error) {
        console.log(error);
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.destroy({
            where: {
                id 
            }
        });
        res.send({message: 'success deleting user with id: '+id});
    } 
    catch (error) {
        console.log(error);
    }
};
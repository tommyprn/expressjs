const { User, Transaction, Role } = require("../models");

exports.read = async (req, res) => {
    try{
        const transaction = await Transaction.findAll({
            include: {
                model: User, 
                    include: {
                        model: Role,
                        attributes:{
                            exclude:["createdAt", "updatedAt"]
                        },
                    },    
                attributes:{
                    exclude:["createdAt", "updatedAt", "roleId", "RoleId"]
                },
            },
            attributes: {
                exclude: ["createdAt", "updatedAt", "UserId", "userId"]
            },
        });
        res.send({data: transaction})
    }
    catch (error) {
        console.log(error);
    }
};

exports.create = async (req, res) => {
    try {
        const film = await User.create(req.body);
        res.send({ data: transaction });
    
    } catch (error) {
        console.log(error);
    }
};

exports.create = async (req, res) => {
    try {
        const transaction = await Transaction.create(req.body);
        res.send({ data: transaction });
    
    } catch (error) {
        console.log(error);
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.body;
        const check=await Transaction.findOne({
            where: { 
                id 
            }
        })
        
        if(!check){ 
            return res.status(400).send({ message: "no data with id: "+ id });
        }
        else{
        const update=await Transaction.update(
            req.body,
            {where:{"id":check.id}}
            )
            if(update<1){ 
                return res.status(400).send({ message: "you make no difference in User with id: "+ id });
            }    
        
        const updated = await Transaction.findOne({
            attributes: {
                exclude: ["createdAt", "updatedAt", "UserId"]
            },
            where:{"id":id}
          });
          res.send(updated);
        }
    } 
    catch (error) {
        console.log(error);
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.body;
        const transaction = await Transaction.destroy({
            where: {
                id 
            }
        });
        res.send({message: 'success deleting transaction with id: '+id});
    } 
    catch (error) {
        console.log(error);
    }
};
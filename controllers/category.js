const { Category } = require("../models");

exports.read = async (req, res) => {
    try{
        const category = await Category.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            },
        });
        res.send({data: category})
    }
    catch (error) {
        console.log(error);
    }
};

exports.create = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.send({ data: category });
    
    } catch (error) {
        console.log(error);
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const check=await Category.findOne({
            where: { 
                id 
            }
        })
        
        if(!check){ 
            return res.status(400).send({ message: "no data with id: "+ id });
        }
        else{
        const update=await Category.update(
            req.body,
            {where:{"id":check.id}}
            )
            if(update<1){ 
                return res.status(400).send({ message: "you make no difference in Film with id: "+ id });
            }    
        
        const updated = await Category.findOne({
            attributes: {
                exclude: ["createdAt", "updatedAt"]
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
        const { id } = req.params;
        const category = await Category.destroy({
            where: {
                id 
            }
        });
        res.send({message: 'success deleting category with id: '+id});
    } 
    catch (error) {
        console.log(error);
    }
};
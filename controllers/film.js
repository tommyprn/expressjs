const { Film, Category } = require("../models");

exports.read = async (req, res) => {
    try{
        const film = await Film.findAll({
            include: {
                model: Category,
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                },
            },
            attributes: {
                exclude: ["createdAt", "updatedAt", "CategoryId", "categoryId"]
            },
        });
        res.send({data: film})
    }
    catch (error) {
        console.log(error);
    }
};

exports.readOne = async (req, res) => {
    try {
        const { id } = req.params;
        const film = await Film.findOne({
            include: {
                model: Category,
                attributes:{
                    exclude:["createdAt", "updatedAt"]
                },
            },
            attributes: {
                exclude: ["createdAt", "updatedAt", "CategoryId", "categoryId"]
            },
            where: {
            id,
            },
        });

        res.send({ data: film });
    } 
    catch (error) {
        console.log(error);
    }
};

exports.create = async (req, res) => {
    try {
        const film = await Film.create(req.body);
        res.send({ data: film });
    
    } catch (error) {
        console.log(error);
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const check=await Film.findOne({
            where: { 
                id 
            }
        })
        
        if(!check){ 
            return res.status(400).send({ message: "no data with id: "+ id });
        }
        else{
        const update=await Film.update(
            req.body,
            {where:{"id":check.id}}
            )
            if(update<1){ 
                return res.status(400).send({ message: "you make no difference in Film with id: "+ id });
            }    
        
        const updated = await Film.findOne({
            include: {
                model: Category,
                attributes:{
                    exclude:["createdAt", "updatedAt"]
                },
            },
            attributes: {
                exclude: ["createdAt", "updatedAt", "CategoryId", "categoryId"]
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
        const film = await Film.destroy({
            where: {
                id 
            }
        });
        res.send({message: 'success deleting film with id: '+id});
    } 
    catch (error) {
        console.log(error);
    }
};

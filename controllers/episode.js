const { Episode, Film, Category } = require("../models");

exports.read = async (req, res) => {
    try{
        const episode = await Episode.findAll({
            include: {
                model: Film, 
                    include: {
                        model: Category,
                        attributes:{
                            exclude:["createdAt", "updatedAt"]
                        },
                    },    
                attributes:{
                    exclude:["createdAt", "updatedAt", "categoryId", "CategoryId"]
                },
            },
            attributes: {
                exclude: ["createdAt", "updatedAt", "FilmId", "filmId"]
            },
        });
        res.send({data: episode})
    }
    catch (error) {
        console.log(error);
    }
};

exports.readOne = async (req, res) => {
    try {
        const { id } = req.body;
        const episode = await Episode.findOne({
            include: {
                model: Film, 
                    include: {
                        model: Category,
                        attributes:{
                            exclude:["createdAt", "updatedAt"]
                        },
                    },    
                attributes:{
                    exclude:["createdAt", "updatedAt", "categoryId", "CategoryId"]
                },
            },
            attributes: {
                exclude: ["createdAt", "updatedAt", "FilmId", "filmId"]
            },
            where: {
            id,
            },
        });

        res.send({ data: episode});
    } 
    catch (error) {
        console.log(error);
    }
};

exports.create = async (req, res) => {
    try {
        const film = await Film.create(req.body);
        res.send({ data: episode });
    
    } catch (error) {
        console.log(error);
    }
};

exports.create = async (req, res) => {
    try {
        const episode = await Episode.create(req.body);
        res.send({ data: episode });
    
    } catch (error) {
        console.log(error);
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.body;
        const check=await Episode.findOne({
            where: { 
                id 
            }
        })
        
        if(!check){ 
            return res.status(400).send({ message: "no data with id: "+ id });
        }
        else{
        const update=await Episode.update(
            req.body,
            {where:{"id":check.id}}
            )
            if(update<1){ 
                return res.status(400).send({ message: "you make no difference in Film with id: "+ id });
            }    
        
        const updated = await Episode.findOne({
            attributes: {
                exclude: ["createdAt", "updatedAt", "FilmId"]
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
        const episode = await Episode.destroy({
            where: {
                id 
            }
        });
        res.send({message: 'success deleting episode with id: '+id});
    } 
    catch (error) {
        console.log(error);
    }
};
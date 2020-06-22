const { Episode, Film, Category } = require("../models");

exports.read = async (req, res) => {
  try {
    const { id } = req.params;
    const episode = await Episode.findAll({
      where: {
        filmId: id,
      },
      include: {
        model: Film,
        include: {
          model: Category,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "categoryId", "CategoryId"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "FilmId"],
      },
    });

    // if ({data:null}) {
    //     return res.send({ message: 'No episode found for this film' });
    // }
    return res.send({ data: episode });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Bad Request" });
  }
};

exports.readOne = async (req, res) => {
  try {
    const { filmId, episodeId } = req.params;
    const film = await Film.findOne({
      where: {
        id: filmId,
      },
    });

    if (!film) {
      return res.send({ message: "No film with id: " + filmId + " found" });
    }

    const episode = await Episode.findOne({
      where: {
        id: episodeId,
      },
      include: {
        model: Film,
        include: {
          model: Category,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "categoryId", "CategoryId"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "FilmId", "filmId"],
      },
    });

    if (!episode) {
      return res.send({
        message: "No episode with id: " + episodeId + " found",
      });
    }
    return res.send({ data: episode });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Bad Request" });
  }
};

exports.create = async (req, res) => {
  try {
    const episode = await Episode.create(req.body);
    res.send({ data: episode });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Bad Request" });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const check = await Episode.findOne({
      where: {
        id,
      },
    });

    if (!check) {
      return res.status(400).send({ message: "no data with id: " + id });
    } else {
      const update = await Episode.update(req.body, {
        where: { id: check.id },
      });
      if (update < 1) {
        return res
          .status(400)
          .send({ message: "you make no difference in Film with id: " + id });
      }

      const updated = await Episode.findOne({
        attributes: {
          exclude: ["createdAt", "updatedAt", "FilmId"],
        },
        where: { id: id },
      });
      res.send(updated);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Bad Request" });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const episode = await Episode.destroy({
      where: {
        id,
      },
    });
    res.send({ message: "success deleting episode with id: " + id });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Bad Request" });
  }
};

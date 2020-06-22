const { User } = require("../models");

exports.read = async (req, res) => {
  try {
    const user = await User.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.send({ data: user });
  } catch (error) {
    console.log(error);
  }
};

exports.readOne = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      where: {
        id,
      },
    });

    res.send({ data: user });
  } catch (error) {
    console.log(error);
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.destroy({
      where: {
        id,
      },
    });
    if (!user) {
      res.send({ message: "no user with id " + id + " found" });
    }

    res.send({ message: "success deleting user with id: " + id });
  } catch (error) {
    console.log(error);
  }
};

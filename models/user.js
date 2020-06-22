"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      gender: DataTypes.ENUM("Male", "Female"),
      phone: DataTypes.INTEGER,
      address: DataTypes.STRING,
      subscribe: DataTypes.BOOLEAN,
      role: DataTypes.INTEGER,
    },
    {}
  );
  User.associate = function (models) {
    User.hasOne(models.Transaction);
  };
  return User;
};

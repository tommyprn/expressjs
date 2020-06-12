'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    gender: DataTypes.ENUM('Male','Female'),
    phone: DataTypes.INTEGER,
    address: DataTypes.STRING,
    subscribe: DataTypes.BOOLEAN
  }, {});
  User.associate = function(models) {
    User.belongsTo(models.Role, {
      foreignKey: {
        name: "roleId",
      },
    });
    User.hasOne(models.Transaction);
  };
  return User;
};
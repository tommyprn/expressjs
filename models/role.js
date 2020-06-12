'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    roleIs: DataTypes.STRING
  }, {});
  Role.associate = function(models) {
    Role.hasOne(models.User);
  };
  return Role;
};
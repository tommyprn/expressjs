'use strict';
module.exports = (sequelize, DataTypes) => {
  const Episode = sequelize.define('Episode', {
    title: DataTypes.STRING,
    thumbnailEp: DataTypes.STRING,
    linkEp: DataTypes.STRING,
    filmId: DataTypes.INTEGER
  }, {});
  Episode.associate = function(models) {
    Episode.belongsTo(models.Film, {
      foreignKey: {
        name: "filmId",
      },
    });
  };
  return Episode;
};
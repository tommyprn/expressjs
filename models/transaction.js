'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    startDate: DataTypes.DATE,
    dueDate: DataTypes.DATE,
    userId: DataTypes.INTEGER,
    attach: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  Transaction.associate = function(models) {
    Transaction.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
      },
    });
  };
  return Transaction;
};
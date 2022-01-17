'use strict';
module.exports = (sequelize, DataTypes) => {
  const FarmBuilding = sequelize.define('FarmBuilding', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastFedTime: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  });

  FarmBuilding.associate = function (models) {
    models.FarmBuilding.hasMany(models.FarmUnit, {
      foreignKey: 'farmBuildingId'
    });
  };

  return FarmBuilding;
};
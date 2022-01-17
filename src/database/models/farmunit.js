module.exports = (sequelize, DataTypes) => {
  const FarmUnit = sequelize.define('FarmUnit', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    healthPoint: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    prevHealthPoint: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isDead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    lastManualFeedTime: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lastFedTime: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  FarmUnit.associate = function (models) {
    models.FarmUnit.belongsTo(models.FarmBuilding, {
      foreignKey: 'farmBuildingId',
    });
  };

  return FarmUnit;
};

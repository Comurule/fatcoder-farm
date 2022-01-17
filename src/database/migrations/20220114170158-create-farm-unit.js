module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('FarmUnits', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      healthPoint: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      prevHealthPoint: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      lastManualFeedTime: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      lastFedTime: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      isDead: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      farmBuildingId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('FarmUnits');
  },
};

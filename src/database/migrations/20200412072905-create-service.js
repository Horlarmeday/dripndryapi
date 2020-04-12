module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Services', {
      service_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      service_name: {
        type: Sequelize.STRING,
      },
      service_description: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface /* , Sequelize */) => {
    return queryInterface.dropTable('Services');
  },
};

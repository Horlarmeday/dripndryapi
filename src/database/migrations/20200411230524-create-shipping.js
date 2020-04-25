module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Shippings', {
      shipping_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      shipping_type: {
        type: Sequelize.STRING,
      },
      shipping_cost: {
        type: Sequelize.DECIMAL,
      },
      shipping_region_id: {
        type: Sequelize.INTEGER,
      },
      admin_id: {
        type: Sequelize.INTEGER,
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
    return queryInterface.dropTable('Shippings');
  },
};

module.exports = (sequelize, DataTypes) => {
  const OrderDetails = sequelize.define(
    'OrderDetails',
    {
      item_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      service_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      service_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      unit_cost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      tableName: 'order_detail',
    }
  );
  OrderDetails.associate = ({ Order }) => {
    // associations can be defined here
    OrderDetails.belongsTo(Order, {
      foreignKey: 'order_id',
    });
  };
  return OrderDetails;
};

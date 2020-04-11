module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'Order',
    {
      order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
      },
      status: {
        type: DataTypes.ENUM('pending', 'ongoing', 'completed'),
        allowNull: false,
        defaultValue: 'pending',
      },
      shipped_on: DataTypes.DATE,
      reference: DataTypes.STRING(50),
      comments: DataTypes.STRING(255),
      customer_id: DataTypes.INTEGER,
      shipping_id: DataTypes.INTEGER,
    },
    {
      tableName: 'orders',
    }
  );
  Order.associate = ({ Customer, Shipping, OrderDetails }) => {
    // associations can be defined here
    Order.belongsTo(Customer, {
      foreignKey: 'customer_id',
    });
    Order.belongsTo(Shipping, {
      foreignKey: 'shipping_id',
    });
    Order.hasMany(OrderDetails, {
      as: 'orderItems',
      foreignKey: 'order_id',
    });
  };
  return Order;
};

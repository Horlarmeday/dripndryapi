import sequelizePaginate from 'sequelize-paginate';

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
      reference: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      comments: DataTypes.STRING(255),
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      shipping_id: DataTypes.INTEGER,
    },
    {
      tableName: 'orders',
    }
  );
  Order.associate = ({ Customer, Shipping, OrderDetail }) => {
    // associations can be defined here
    Order.belongsTo(Customer, {
      foreignKey: 'customer_id',
    });
    Order.belongsTo(Shipping, {
      foreignKey: 'shipping_id',
    });
    Order.hasMany(OrderDetail, {
      as: 'orderItems',
      foreignKey: 'order_id',
    });
  };
  sequelizePaginate.paginate(Order);
  return Order;
};

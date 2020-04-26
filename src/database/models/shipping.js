module.exports = (sequelize, DataTypes) => {
  const Shipping = sequelize.define(
    'Shipping',
    {
      shipping_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      shipping_type: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      shipping_cost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      shipping_region_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      admin_id: DataTypes.INTEGER,
    },
    {
      tableName: 'shipping',
    }
  );
  Shipping.associate = ({ ShippingRegion, Admin }) => {
    // associations can be defined here
    Shipping.belongsTo(ShippingRegion, {
      foreignKey: 'shipping_region_id',
      onDelete: 'CASCADE',
    });

    Shipping.belongsTo(Admin, {
      foreignKey: 'admin_id',
    });
  };
  return Shipping;
};

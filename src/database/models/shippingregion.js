module.exports = (sequelize, DataTypes) => {
  const ShippingRegion = sequelize.define(
    'ShippingRegion',
    {
      shipping_region_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      shipping_region: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      tableName: 'shipping_region',
    }
  );
  ShippingRegion.associate = ({ Shipping }) => {
    // associations can be defined here
    ShippingRegion.hasMany(Shipping, {
      foreignKey: 'shipping_region_id',
    });
  };
  return ShippingRegion;
};

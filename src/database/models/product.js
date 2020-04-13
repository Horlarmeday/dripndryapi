import sequelizePaginate from 'sequelize-paginate';

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      service_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      service_charge: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      image: DataTypes.STRING(255),
      description: DataTypes.STRING(255),
    },
    {
      tableName: 'products',
    }
  );
  Product.associate = ({ Service }) => {
    // associations can be defined here
    Product.belongsTo(Service, {
      foreignKey: 'service_id',
    });
  };

  sequelizePaginate.paginate(Product);
  return Product;
};

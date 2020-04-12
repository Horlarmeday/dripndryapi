import { sign } from 'jsonwebtoken';

module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    'Customer',
    {
      customer_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstname: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      lastname: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: true,
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: { notEmpty: true },
      },
      phone: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      shipping_region_id: {
        type: DataTypes.INTEGER,
      },
      country: DataTypes.STRING(100),
      state: DataTypes.STRING(100),
      city: DataTypes.STRING(100),
      shipping_address: DataTypes.STRING(100),
      address: DataTypes.STRING(100),
    },
    {
      tableName: 'customers',
    }
  );

  // eslint-disable-next-line func-names
  Customer.prototype.generateAuthToken = function() {
    return sign(
      {
        customer_id: this.customer_id,
        firstname: this.firstname,
        lastname: this.lastname,
      },
      process.env.JWT_SECRET
    );
  };

  Customer.associate = ({ Order }) => {
    // associations can be defined here
    Customer.hasMany(Order, {
      foreignKey: 'customer_id',
    });
  };
  return Customer;
};

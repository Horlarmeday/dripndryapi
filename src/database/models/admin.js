import { sign } from 'jsonwebtoken';

module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    'Admin',
    {
      admin_id: {
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
      address: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: { notEmpty: true },
      },
      phone: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: { notEmpty: true },
      },
      role: {
        type: DataTypes.ENUM('Admin', 'SuperAdmin'),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('Active', 'Suspended', 'Ban'),
        allowNull: false,
        defaultValue: 'Active',
      },
    },
    {
      tableName: 'admins',
    }
  );

  // eslint-disable-next-line func-names
  Admin.prototype.generateAuthToken = function() {
    return sign(
      {
        sub: this.admin_id,
        firstname: this.firstname,
        lastname: this.lastname,
        role: this.role,
      },
      process.env.JWT_SECRET
    );
  };

  Admin.associate = ({ Service, Product, Shipping }) => {
    // associations can be defined here
    Admin.hasMany(Service, {
      foreignKey: 'admin_id',
    });

    Admin.hasMany(Product, {
      foreignKey: 'admin_id',
    });

    Admin.hasMany(Shipping, {
      foreignKey: 'admin_id',
    });
  };
  return Admin;
};

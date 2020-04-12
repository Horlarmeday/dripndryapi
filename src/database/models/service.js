import sequelizePaginate from 'sequelize-paginate';

module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define(
    'Service',
    {
      service_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      service_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      service_description: DataTypes.STRING(255),
    },
    {
      tableName: 'services',
    }
  );
  Service.associate = ({ Product }) => {
    // associations can be defined here
    Service.hasMany(Product, {
      as: 'products',
      foreignKey: 'service_id',
    });
  };

  sequelizePaginate.paginate(Service);

  return Service;
};

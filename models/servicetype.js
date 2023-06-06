module.exports = (sequelize, DataTypes) => {

  const ServiceType = sequelize.define("ServiceType", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
    }
  })

  // TODO: link to service form detail

  return ServiceType;

}
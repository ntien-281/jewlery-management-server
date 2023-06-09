module.exports = (sequelize, DataTypes) => {

  const ServiceFormDetail = sequelize.define("ServiceFormDetail", {
    quantity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    subtotal: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
    },
    paid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
    },
    remain: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
    },
    deliverDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  ServiceFormDetail.associate = (models) => {
    ServiceFormDetail.belongsTo(models.ServiceForm);
    ServiceFormDetail.belongsTo(models.ServiceType);
  }

  return ServiceFormDetail;

}
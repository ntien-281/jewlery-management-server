module.exports = (sequelize, DataTypes) => {

  const ServiceFormDetail = sequelize.define("ServiceFormDetail", {
    ServiceFormId: {
      type: DataTypes.UUID,
      // references: {
      //   model: ServiceForm,
      //   key: 'id'
      // },
      unique: true,
    },
    ServiceTypeId: {
      type: DataTypes.UUID,
      // references: {
      //   model: Product,
      //   key: 'id'
      // },
      unique: true,
    },
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

  return ServiceFormDetail;

}
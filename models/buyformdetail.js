const Product = require("./product");
const BuyForm = require("./buyform");

module.exports = (sequelize, DataTypes) => {

  const BuyFormDetail = sequelize.define("BuyFormDetail", {
    BuyFormId: {
      type: DataTypes.UUID,
      references: {
        model: BuyForm,
        key: 'id'
      },
      unique: true,
    },
    ProductId: {
      type: DataTypes.UUID,
      references: {
        model: Product,
        key: 'id'
      },
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
    }
  });

  return BuyFormDetail;

}
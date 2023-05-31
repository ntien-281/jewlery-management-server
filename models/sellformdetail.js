const Product = require("./product");
const SellForm = require("./sellform");

module.exports = (sequelize, DataTypes) => {

  const SellFormDetail = sequelize.define("SellFormDetail", {
    SellFormId: {
      type: DataTypes.UUID,
      references: {
        model: SellForm,
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
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    subtotal: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
    }
  });

  return SellFormDetail;

}
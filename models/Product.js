const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define(
    "SANPHAM",
    {
      MaSP: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      TenSP: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // Modal options
    }
  );
  return Products;
};

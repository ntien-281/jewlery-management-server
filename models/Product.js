const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');


const Products = sequelize.define("SANPHAM", {
  MaSP: {
    type: DataTypes.INTERGER,
    allowNull: false,
  },
  TenSP: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  // Modal options
});


console.log(User === sequelize.models.User);
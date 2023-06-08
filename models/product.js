'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ ProductType, SellForm, SellFormDetail, BuyForm, BuyFormDetail }) {
      this.belongsTo(ProductType, {
        foreignKey: 'ProductTypeId'
      });
      this.belongsToMany(SellForm, {
        through: SellFormDetail
      });
      this.hasMany(SellFormDetail)
      this.belongsToMany(BuyForm, {
        through: BuyFormDetail
      });
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    price: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
    },
    stock: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
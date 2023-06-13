'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Product, BuyFormDetail, SellFormDetail, ReportDetail }) {
      // define association here
      this.hasMany(Product)
      this.hasMany(BuyFormDetail)
      this.hasMany(SellFormDetail)
      this.hasMany(ReportDetail)
    }
  }
  ProductType.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    unit: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    interest: {
      type: DataTypes.FLOAT(8,2),
      allowNull: false,
      defaultValue: 0.0,
    }
  }, {
    sequelize,
    modelName: 'ProductType',
  });
  return ProductType;
};
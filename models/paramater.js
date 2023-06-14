
module.exports = (sequelize, DataTypes) => {
const Paramater = sequelize.define("Paramater", {
    id:{
        type: DataTypes.INTEGER,
        defaultValue: 0,
        autoIncrement: true,
        allownull: false,
        primaryKey: true,
    },
    name:{
        type: DataTypes.STRING,
        allownull: false,
    },
    value:{
        type: DataTypes.INTEGER,
        allownull: false
    }
    });
    return Paramater;
}
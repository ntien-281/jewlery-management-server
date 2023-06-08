
module.exports = (sequelize, DataTypes) => {
const UserGroup = sequelize.define("UserGroup", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
    });
    UserGroup.associate = (models) => {
        UserGroup.hasMany(models.User)
    };
    return UserGroup;
}
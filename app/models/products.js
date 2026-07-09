const { DataTypes } = require("sequelize");
const sequelize = require("../config/DB");

const Product = sequelize.define("Product", {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },

    category: {
        type: DataTypes.STRING,
        allowNull: false
    }

});

module.exports = Product;
const { DataTypes } = require("sequelize")
const sequelize = require('../server.js')

const Product = sequelize.define("Product", {
    name: {
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        quantity: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
});
export default Product
const { DataTypes } = require('sequelize');
const sequelize = require('../config/bd');

const Produto = sequelize.define(
    'Produto',
    {
    nome: {
        type: DataTypes.STRING,
    },
    preco: {
        type: DataTypes.FLOAT,
    },
    },
    {
        tableName: 'Produtos',
        timestamps: true
    }
);

module.exports = Produto;
const { DataTypes } = require('sequelize');
const sequelize = require('../config/bd');

const Usuario = sequelize.define(
    'Usuario',
    {
    nome: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    idade: {
        type: DataTypes.INTEGER,
    }
    },
    {
        tableName: 'Usuarios',
        timestamps: true
    }
);

module.exports = Usuario;
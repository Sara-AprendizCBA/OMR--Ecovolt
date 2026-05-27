const {DataTypes} = require('sequelize');
const sequelize = require('../../Config/database');

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nombreCompleto: {
        type: DataTypes.STRING(100),
        allowNull: false 
    },
    correo: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true 
        }
    },
    telefono: {
        type: DataTypes.STRING(15),
        allowNull: true
    },
    contrasena: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    CiudadResidencia: {
        type: DataTypes.STRING(80),
        allowNull: false
    },

}, {
        timestamps: true,
        paranoid: true, 
        tableName: 'usuarios'
    });

    module.exports = Usuario;
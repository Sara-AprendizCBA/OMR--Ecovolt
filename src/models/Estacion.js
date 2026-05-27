const { DataTypes } = require('sequelize');
const sequelize = require('../../Config/database');

const Estacion = sequelize.define('Estacion', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    ubicacion: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    latitud: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: false,
        validate: {
            min: -4.0,
            max: 13.0
        }
    },
    longitud: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: false,
        validate: {
            min: -79.0,
            max: -66.0
        }
    },
    precioKw: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
        validate: {
            min: 0.01,
            max: 500.00
        }
    }
}, {
    timestamps: true,
    paranoid: true,
    tableName: 'estaciones'
});

module.exports = Estacion;
const { DataTypes } = require('sequelize');
const sequelize = require('../../Config/database');

const Estacion = sequelize.define('Estacion', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(120),
        allowNull: false
    },
    latitud: {
        type: DataTypes.DECIMAL(9, 6),
        allowNull: false
    },
    longitud: {
        type: DataTypes.DECIMAL(9, 6),
        allowNull: false
    },
    precioKw: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0.0
        }
    }
}, {
    timestamps: true,
    tableName: 'estaciones'
});

module.exports = Estacion;
const { DataTypes } = require('sequelize');
const sequelize = require('../../Config/database');

const Conector = sequelize.define('Conector', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    idEstacion: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'estaciones',     // Nombre real de la tabla
            key: 'id'
        }
    },
    codigoFisico: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    estaBueno: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    estado: {
        type: DataTypes.ENUM('Disponible', 'Ocupado', 'Dañado'),
        allowNull: false,
        defaultValue: 'Disponible'
    }
}, {
    timestamps: true,
    paranoid: true,
    tableName: 'conectores'
});

module.exports = Conector;
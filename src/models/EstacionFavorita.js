const { DataTypes } = require('sequelize');
const sequelize = require('../../Config/database');

const EstacionFavorita = sequelize.define('EstacionFavorita', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    idUsuario: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'id'
        }
    },
    idEstacion: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'estaciones',
            key: 'id'
        }
    },
    valoracion: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min: 1,
            max: 5
        }
    },
    comentario: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    favorito: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    timestamps: true,
    paranoid: true,
    tableName: 'estaciones_favoritas'
});

module.exports = EstacionFavorita;

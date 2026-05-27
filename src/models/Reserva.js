const { DataTypes } = require('sequelize');
const sequelize = require('../../Config/database');

const Reserva = sequelize.define('Reserva', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    idUsuario: {
        type: DataTypes.UUID,
        allowNull: true,           // Permite NULL por Soft Delete
    },
    idEstacion: {
        type: DataTypes.UUID,
        allowNull: false
    },
    idConector: {
        type: DataTypes.UUID,
        allowNull: false
    },
    fechaReserva: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    horaInicio: {
        type: DataTypes.TIME,
        allowNull: false
    },
    duracion: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    estado: {
        type: DataTypes.ENUM('Activa', 'Cancelada', 'Finalizada'),
        allowNull: false,
        defaultValue: 'Activa'
    },
    totalPagar: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    }
}, {
    timestamps: true,
    paranoid: true,
    tableName: 'reservas'
});

module.exports = Reserva;
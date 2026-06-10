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
    tableName: 'conectores',
    hooks: {
        // Cuando un conector se elimina (soft-delete), propagamos el
        // borrado a sus reservas relacionadas para mantener coherencia.
        beforeDestroy: async (conector, options) => {
            const Reserva = sequelize.models.Reserva;
            if (Reserva) {
                await Reserva.destroy({ where: { idConector: conector.id }, individualHooks: true, transaction: options ? options.transaction : null });
            }
        },
        // Manejar borrados por lotes (bulk destroy)
        beforeBulkDestroy: async (options) => {
            const Reserva = sequelize.models.Reserva;
            if (Reserva && options.where) {
                const conectores = await sequelize.models.Conector.findAll({ where: options.where, transaction: options.transaction });
                for (const c of conectores) {
                    await Reserva.destroy({ where: { idConector: c.id }, individualHooks: true, transaction: options.transaction });
                }
            }
        }
    }
});

module.exports = Conector;
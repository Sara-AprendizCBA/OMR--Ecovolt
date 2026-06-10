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
        allowNull: false,
        validate: {
            len: [3, 100]
        }
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
        type: DataTypes.DECIMAL(6, 2),
        allowNull: false,
        validate: {
            min: 0.01,
            max: 150.00,                  
            isDecimal: true
        }
    }
}, {
    timestamps: true,
    paranoid: true,
    tableName: 'estaciones',
    hooks: {
        beforeUpdate: async (estacion) => {
            if (estacion.changed('precioKw')) {
                const precioAnterior = estacion._previousDataValues.precioKw;
                const precioNuevo = estacion.precioKw;

                if (precioAnterior && precioNuevo > precioAnterior * 2) {
                    throw new Error('No se permite aumentar el precio más del 100% en una sola actualización.');
                }
            }
        },
        beforeDestroy: async (estacion, options) => {
            const Conector = sequelize.models.Conector;
            if (Conector) {
                await Conector.destroy({ where: { idEstacion: estacion.id }, individualHooks: true, transaction: options ? options.transaction : null });
            }
        },
        beforeBulkDestroy: async (options) => {
            const Conector = sequelize.models.Conector;
            if (Conector && options.where) {
                const estaciones = await sequelize.models.Estacion.findAll({ where: options.where, transaction: options.transaction });
                for (const e of estaciones) {
                    await Conector.destroy({ where: { idEstacion: e.id }, individualHooks: true, transaction: options.transaction });
                }
            }
        }
    }
});

module.exports = Estacion;
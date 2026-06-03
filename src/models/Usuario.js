const { DataTypes } = require('sequelize');
const sequelize = require('../../Config/database');

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    nombreCompleto: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    telefono: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    contrasena: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    ciudadResidencia: {
        type: DataTypes.STRING(80),
        allowNull: false
    }
}, {
    timestamps: true,
    paranoid: true,
    tableName: 'usuarios',
    
    hooks: {
        afterDestroy: async (usuario, options) => {
            await sequelize.models.Reserva.update(
                { 
                    idUsuario: null,
                    estado: 'Cancelada'     // ← Opcional pero recomendado
                },
                { 
                    where: { idUsuario: usuario.id },
                    transaction: options.transaction 
                }
            );

            console.log(`✅ Soft Delete: Reservas del usuario ${usuario.id} actualizadas (idUsuario = NULL)`);
        }
    }
});

module.exports = Usuario;
const Usuario = require('./Usuario');
const Estacion = require('./Estacion');
const Conector = require('./Conector');
const Reserva = require('./Reserva');


// Usuario - Reserva (Soft Delete)
Usuario.hasMany(Reserva, {
    foreignKey: 'idUsuario',
    as: 'reservas',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
});

Reserva.belongsTo(Usuario, {
    foreignKey: 'idUsuario',
    as: 'usuario'
});

// Estacion - Reserva
Estacion.hasMany(Reserva, {
    foreignKey: 'idEstacion',
    as: 'reservas',
    onDelete: 'RESTRICT'
});

Reserva.belongsTo(Estacion, {
    foreignKey: 'idEstacion',
    as: 'estacion'
});

// Conector - Reserva
Conector.hasMany(Reserva, {
    foreignKey: 'idConector',
    as: 'reservas'
});

Reserva.belongsTo(Conector, {
    foreignKey: 'idConector',
    as: 'conector'
});

module.exports = { Usuario, Estacion, Conector, Reserva };
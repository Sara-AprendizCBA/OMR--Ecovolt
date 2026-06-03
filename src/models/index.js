const Usuario = require('./Usuario');
const Estacion = require('./Estacion');
const Conector = require('./Conector');
const Reserva = require('./Reserva');

// ======================
// Usuario ↔ Reserva
// ======================
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

// ======================
// Conector ↔ Reserva
// ======================
Conector.hasMany(Reserva, {
    foreignKey: 'idConector',
    as: 'reservas'
});

Reserva.belongsTo(Conector, {
    foreignKey: 'idConector',
    as: 'conector'
});

// ======================
// Estacion ↔ Conector 
// ======================
Estacion.hasMany(Conector, {
    foreignKey: 'idEstacion',
    as: 'conectores'
});

Conector.belongsTo(Estacion, {
    foreignKey: 'idEstacion',
    as: 'estacion'
});

module.exports = { Usuario, Estacion, Conector, Reserva };
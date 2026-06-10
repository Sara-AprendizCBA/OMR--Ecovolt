const Usuario = require('./Usuario');
const Estacion = require('./Estacion');
const Conector = require('./Conector');
const Reserva = require('./Reserva');
const EstacionFavorita = require('./EstacionFavorita');


// Usuario ↔ Reserva

Usuario.hasMany(Reserva, {
    foreignKey: 'idUsuario',
    as: 'reservas',
    // Si se elimina un usuario, mantenemos las reservas por auditoría
    // y establecemos la referencia a NULL. (Usuario puede ser soft-deleted)
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    constraints: true
});

Reserva.belongsTo(Usuario, {
    foreignKey: 'idUsuario',
    as: 'usuario'
});


// Conector ↔ Reserva

// Un conector eliminado debe eliminar (o marcar) sus reservas relacionadas.
// Como `Reserva.idConector` es NOT NULL, usamos CASCADE para mantener
// la integridad referencial. Para soportar soft-deletes (paranoid) se
// agregan hooks en el modelo `Conector` para propagar el borrado.
Conector.hasMany(Reserva, {
    foreignKey: 'idConector',
    as: 'reservas',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    constraints: true
});

Reserva.belongsTo(Conector, {
    foreignKey: 'idConector',
    as: 'conector',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    constraints: true
});



// Usuario ↔ Conector (N:M través de Reserva)

// Modelamos la relación N:M usando `Reserva` como tabla intermedia
// (contiene datos adicionales de la reserva). Mapeamos las claves
// a los campos existentes (`idUsuario`, `idConector`).
Usuario.belongsToMany(Conector, {
    through: Reserva,
    foreignKey: 'idUsuario',
    otherKey: 'idConector',
    as: 'conectores',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    constraints: true
});

Conector.belongsToMany(Usuario, {
    through: Reserva,
    foreignKey: 'idConector',
    otherKey: 'idUsuario',
    as: 'usuarios',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    constraints: true
});


// Estacion ↔ Conector 

// Si se elimina una estación, sus conectores deben eliminarse también.
// Usamos CASCADE porque `Conector.idEstacion` es NOT NULL.
Estacion.hasMany(Conector, {
    foreignKey: 'idEstacion',
    as: 'conectores',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    constraints: true
});

Conector.belongsTo(Estacion, {
    foreignKey: 'idEstacion',
    as: 'estacion',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    constraints: true
});

// ======================
// Usuario ↔ Estacion (N:M a través de EstacionFavorita)
// ======================
Usuario.belongsToMany(Estacion, {
    through: EstacionFavorita,
    foreignKey: 'idUsuario',
    otherKey: 'idEstacion',
    as: 'estacionesFavoritas',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    constraints: true
});

Estacion.belongsToMany(Usuario, {
    through: EstacionFavorita,
    foreignKey: 'idEstacion',
    otherKey: 'idUsuario',
    as: 'usuariosFavoritos',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    constraints: true
});

Usuario.hasMany(EstacionFavorita, {
    foreignKey: 'idUsuario',
    as: 'estacionesFavoritasRegistros',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    constraints: true
});

EstacionFavorita.belongsTo(Usuario, {
    foreignKey: 'idUsuario',
    as: 'usuario'
});

Estacion.hasMany(EstacionFavorita, {
    foreignKey: 'idEstacion',
    as: 'usuariosFavoritosRegistros',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    constraints: true
});

EstacionFavorita.belongsTo(Estacion, {
    foreignKey: 'idEstacion',
    as: 'estacion'
});

module.exports = { Usuario, Estacion, Conector, Reserva, EstacionFavorita };
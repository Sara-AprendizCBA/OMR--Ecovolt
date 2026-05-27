const Usuario = require('./Usuario');
const Estacion = require('./Estacion');
const Conector = require('./Conector');
const Reserva = require('./Reserva');


// Usuario - Reserva
Usuario.hasMany(Reserva, { 
    foreignKey: 'idUsuario', 
    as: 'reservas' 
});
Reserva.belongsTo(Usuario, { 
    foreignKey: 'idUsuario', 
    as: 'usuario' 
});

// Estacion - Reserva
Estacion.hasMany(Reserva, { 
    foreignKey: 'idEstacion', 
    as: 'reservas' 
});
Reserva.belongsTo(Estacion, { 
    foreignKey: 'idEstacion', 
    as: 'estacion' 
});

// Estacion - Conector
Estacion.hasMany(Conector, { 
    foreignKey: 'idEstacion', 
    as: 'conectores' 
});
Conector.belongsTo(Estacion, { 
    foreignKey: 'idEstacion', 
    as: 'estacion' 
});

module.exports = { Usuario, Estacion, Conector, Reserva };
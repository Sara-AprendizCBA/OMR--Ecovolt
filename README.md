## Retos Técnicos 

### 1. Soft Delete y Integridad Referencial

**¿Qué pasa cuando un usuario elimina su cuenta?**

Se implementó **Soft Delete** (`paranoid: true`) en el modelo Usuario.  
Cuando un usuario elimina su cuenta, **sus reservas no se eliminan**. Se configuró `onDelete: 'SET NULL'` para que el `idUsuario` se ponga en `NULL`, manteniendo el historial completo de reservas y consumos.

Esto permite conservar información valiosa para los dueños de las estaciones y auditorías del sistema.

### 2. Relación Muchos a Muchos (Usuario - Conector)

Un usuario puede reservar **muchos conectores**, y un conector puede ser reservado por **muchos usuarios**.  

La tabla **`Reserva`** funciona como entidad asociativa con atributos propios:
- `fechaReserva`
- `horaInicio`
- `estado`
- `totalPagar`
- `idConector`

Se establecieron correctamente las relaciones: `Usuario` ↔ `Reserva` ↔ `Conector`.

### 3. Validaciones de Negocio

Se implementaron validaciones rigurosas en el modelo `Estacion`:

- **Precio por kWh**: No puede ser negativo ni cero (rango: 0.01 - 500.00)
- **Coordenadas geográficas**:
  - Latitud entre **-4.0** y **13.0**
  - Longitud entre **-79.0** y **-66.0**

Estas validaciones garantizan que los datos sean realistas y consistentes con la geografía de Colombia.

---

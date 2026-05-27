## Retos Extras

Durante el desarrollo de este proyecto surgieron varios retos interesantes que tuvimos que resolver:

### 1. Soft Delete y Eliminación de Usuarios

 **Qué sucede con las reservas** cuando un usuario elimina su cuenta. Como estamos usando **Soft Delete** (`paranoid: true`), el usuario no se borra realmente de la base de datos, solo se marca como eliminado.

Cuando un usuario elimina su cuenta, **sus reservas no se borran**. 

En su lugar, el campo `idUsuario` de esas reservas se pone en `NULL`. De esta forma mantenemos el historial completo de reservas y consumos en el sistema. 

Esto  parece lo más correcto porque:
- Los dueños de las estaciones necesitan ver el historial de uso.
- Se evita perder información importante de auditoría.
- Respeta el concepto de Soft Delete (el usuario se "desactiva", pero no desaparece toda su actividad).


### 2. Relación entre Usuarios, Conectores y Reservas

Un usuario puede hacer muchas reservas, y un conector puede ser reservado por muchos usuarios.  
Sin embargo, la tabla **`Reserva`** no es una tabla intermedia simple, ya que tiene sus propios datos importantes como:
- `fecha_reserva`
- `hora_inicio`
- `estado`
- `total_pagar`

Esto hace que `Reserva` sea una **entidad con atributos propios**, por lo que fue modelada como una tabla independiente con dos llaves foráneas.

### 3. Validaciones de Negocio

- El **precio por kWh** no puede cambiar de forma absurda ni ser negativo.
- Los datos geográficos de las estaciones deben ser realistas para Colombia:
  - Latitud entre **-4° y 13° Norte**
  - Longitud entre **-79° y -66° Oeste**

Estas validaciones se implementaron directamente en los modelos para mantener la calidad 
const active = true

let mensaje = ''


if (active) {
    mensaje = 'activo'
} else {
    mensaje = 'Inactivo'
}
console.log(mensaje)


const message = (active) ? 'Active' : 'Inactive'
console.log(message)


const msg = (active) && 'Activo'
console.log(msg)
class Mensajes {

    constructor() {
        
        this.mensajes = [];
    }

    agregarMensaje(persona, mensaje) {

        let informacion = { persona, mensaje };
        this.mensajes.push(informacion);
        return this.mensajes;

    }


    getMensajes() {
        return this.mensajes;
    }

    setMensajes( mensajes ) {
        this.mensajes = mensajes;
    }

}

module.exports = {
    Mensajes
}
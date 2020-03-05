const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { Mensajes } = require('../classes/mensajes');
const { crearMensaje } = require('../utilidades/utilidades');
const axios = require('axios');

const usuarios = new Usuarios();
const mensajes = new Mensajes();

    let mensajesChat = ( sala ) => {

        
    }

    

io.on('connection', (client) => {


    // Eliminamos la persona el array de conexión y actualizamos el array de conexión
    client.on('disconnect', () => {

        let personaBorrada = usuarios.borrarPersona(client.id);
        client.broadcast.to(personaBorrada.sala).emit('updateLista', usuarios.getPersonasPorSala(personaBorrada.sala));

    });

    // Enviamos los datos al iniciar session en el chat
    client.on('datosInicio', (data, callback)=> {

        // en este punto deberiamos de pedir los datos del chat guardado!
        const instance = axios.create({baseURL: 'http://localhost:3000'});
        instance.get(`/chatsave/${ data.sala }`)
            .then( response => {

                mensajes. = response.chat;

            })
            .catch( err => console.log( err) );

        client.join(data.sala);
        usuarios.agregarPersona(client.id, data.nombre, data.sala);

        client.broadcast.to(data.sala).emit('updateLista', usuarios.getPersonasPorSala(data.sala));

        let respuesta = {

            usuariosConectados: usuarios.getPersonas(),
            listaMensajes: mensajes.getMensajes()
        }

        callback(respuesta);

    });


    client.on('nuevoMensaje', (data, callback)=> {

        let persona = usuarios.getPersona(client.id);
        let nuevo = {

            persona: usuarios.getPersona(client.id),
            mensaje: crearMensaje(persona.nombre, data)

        }

        mensajes.agregarMensaje(nuevo.persona, nuevo.mensaje);
        client.broadcast.to(persona.sala).emit('updateMensajes', nuevo);

        callback(nuevo);

    });

    // client.on('crearMensaje', (data, callback) => {

    //     let persona = usuarios.getPersona(client.id);
    //     let mensaje = crearMensaje(persona.nombre, data.mensaje);

    //     // Guardamos el mensaje en el array
    //     mensajes.agregarMensaje(persona, mensaje);
    //     client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);

    // });


    // client.on('disconnect', () => {

    //     console.log( 'Usuario desconectado' );

    //     // let personaBorrada = usuarios.borrarPersona(client.id);

    //     // client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${ personaBorrada.nombre } salió`));
    //     // client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonasPorSala(personaBorrada.sala));


    // });

    // // Mensajes privados
    // client.on('mensajePrivado', data => {

    //     // let persona = usuarios.getPersona(client.id);
    //     // console.log(persona);
    //     // client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));

    // });

});
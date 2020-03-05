const express = require('express');
const Chat = require('../models/chat.js');
const app = express();


app.get('/chatsave/:sala', function(req, res) {

    let parametros = req.params;
    Chat.find({ sala: parametros.sala }, (err, docs) => {

        if( err ) {

            return res.status(400).json({
                ok: false,
                err
            });

        }

        res.json({
            ok: true,
            chat: docs
        });

    });

});

app.post('/chatsave', function(req, res) {

    let body = req.body;
    let chat = new Chat({

        persona: body.persona,
        hora: body.hora,
        mensaje: body.mensaje,
        sala: body.sala

    });

    chat.save( (err, docs) => {

        if( err ) {

            return res.status(400).json({
                ok: false,
                err
            });

        }

        res.json({
            ok: true,
            chat: docs
        });

    });


});

module.exports = app;

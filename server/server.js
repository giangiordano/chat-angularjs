const express = require('express');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const axios = require('axios');

const http = require('http');
const path = require('path');

const app = express();

let server = http.createServer(app);

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('./routes/routes.js'));

module.exports.io = socketIO(server);
require('./sockets/socket');

mongoose.connect('mongodb://127.0.0.1:27017/angularchat', { useUnifiedTopology: true , useNewUrlParser: true }, (err, res )=>{

	if( err )
		throw err;

	console.log("Mongo OnLine");

});

server.listen(port, (err) => {

    if (err) throw new Error(err);
    console.log(`Servidor corriendo en puerto ${ port }`);

});

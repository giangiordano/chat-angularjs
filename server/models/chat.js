
const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let chatSchema = new Schema({

	persona: {

		type: String,
		require: [true, 'Persona es obligatorio']
	},

	hora: {

		type: String,
		require: [true, 'Hora es obligatorio']
	},

	mensaje: {

		type: String,
		require: [true, 'Mensaje es obligatorio']
	},

	sala: {

		type: String,
		require: [true, 'Sala es obligatorio']
	}

});

module.exports = mongoose.model( 'Chat', chatSchema );

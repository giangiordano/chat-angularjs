(function () {

	'use strict';

	app.controller('chatCtrl', ['$scope','$http', '$routeParams', 'socket', function( $scope, $http, $routeParams, socket) {

		$scope.nuevoMensaje = '';
		$scope.listaConectados = [];
		$scope.listaMensajes = [];
		$scope.parametros = {
			nombre: $routeParams.nombre,
			sala: $routeParams.sala
		}

		// Iniciamos session en el chat, pedimos la lista de conectados y los mensajes 
		if( $scope.parametros.nombre != '' || $scope.parametros.sala != '' ) {

			socket.emit('datosInicio', $scope.parametros, function( data ) {

				$scope.listaConectados = data.usuariosConectados;
				$scope.listaMensajes = data.listaMensajes;

				console.log($scope.listaConectados);

			});

		} else {  window.location = '#!/inicio'; }


		$scope.guardarChat = function( chat ) {

			$http.post('/chatsave', {

				persona: chat.mensaje.nombre,
				hora: chat.mensaje.fecha,
				mensaje: chat.mensaje.mensaje,
				sala: chat.persona.sala

			})
			.then( function( response ){

					console.log( response );

			})
			.catch( function( err ) {

				console.log( err );

			});
		}


		
		// Se ejecuta al enviar un mensaje
		$scope.enviarMensaje = function( respuesta ) {

			socket.emit('nuevoMensaje', $scope.nuevoMensaje, function( data ) {

				$scope.listaMensajes.push( data );
				$scope.guardarChat( data );
				console.log('Chat saved');

			});

			$scope.nuevoMensaje = null
		};

		socket.on('updateMensajes', function( mensaje ) {

			$scope.listaMensajes.push( mensaje );

		});

		socket.on('updateLista', function( nuevaLista ) {

			$scope.listaConectados = nuevaLista;

		});

	}]);

}());
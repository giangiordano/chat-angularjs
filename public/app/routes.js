
app.config( function ($routeProvider) {

	$routeProvider
		.when('/inicio', {

			templateUrl: 'views/inicio.html',
			controller: 'inicioCtrl'

		}).when('/chat/:nombre/:sala', {

			templateUrl: 'views/chat.html',
			controller: 'chatCtrl'

		}).otherwise({ redirectTo: '/inicio' });
	
});

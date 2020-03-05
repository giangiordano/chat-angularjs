(function () {

	'use strict';

	app.controller('inicioCtrl', ['$scope','$http', function($scope,$http, socket){

		$scope.formData = {};

		$scope.entrarChat = function() {

			window.location = '#!/chat/'+ $scope.formData.nombre +'/'+ $scope.formData.sala;

		}
		
		
	}]);

}());
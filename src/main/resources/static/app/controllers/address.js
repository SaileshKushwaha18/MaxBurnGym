angular.module('AddressBook')
// Creating the Angular Controller
.controller('AddressController', function($http, $scope,$timeout, AuthService) {
	$scope.buttonText = '';
	var init = function() {
		$http.get('api/gym-users').success(function(res) {
			$scope.addressList = res;
			$scope.addressForm.$setPristine();
			$scope.address = null;
			
		}).error(function(error) {
			$scope.message = error.message;
		});
		
		$timeout(function(){
			$scope.message = '';
         }, 2000);
	};
	$scope.initEdit = function(address) {
		$scope.address = address;
		$scope.message='';
		$scope.buttonText = 'Update';
	};

	var editAddress = function(){
		$http.put('api/gym-users', $scope.address).success(function(res) {
			$scope.address = null;
			$scope.addressForm.$setPristine();
			$scope.message = "Editting Success";
			init();
		}).error(function(error) {
			$scope.message =error.message;
		});
	};

	$scope.submit = function() {
			editAddress();
	};
	
	$scope.close = function() {
		$scope.buttonText = '';
	};
	
	init();
});

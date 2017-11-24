angular.module('AddressBook')
// Creating the Angular Controller
.controller('GymUsersController', function($http, $scope, $timeout, $filter , AuthService) {
	var editGym = false;
	$scope.buttonText = 'Create';
	$scope.message='';
	$scope.order = false;
	var feeStatusColor = 'white';
	var feeSubDt = null;
	var feeDueDt = null;
	var curDt = null;
	
	var initGym = function() {
		$http.get('api/gym-users').success(function(res) {
			for (var i in res) {
				curDt = new Date().getDate();
				//console.log(res[i]);
				feeSubDt = new Date(res[i].feeSubmitDate).getDate();
				feeDueDt = new Date(res[i].feeDueDate).getDate();
            	console.log(curDt  + ' - ' + feeSubDt + ' - ' + feeDueDt);
				
            	if(feeSubDt != null || feeDueDt != null){
					if((curDt > feeSubDt && res[i].feeStatus === 'UNPAID') || (curDt > feeDueDt && !res[i].feeStatus === 'PAID')){
						feeStatusColor = 'red';
					}else{
						feeStatusColor = 'white';
					}
					
					res[i].feeStatusColor = feeStatusColor;
            	}
			//console.log('User'+i +' - color:'+feeStatusColor);
			//console.log(res[i].feeStatusColor);
			}
            
			//console.log(res);
			$scope.gymusers = res;
			$scope.gymuserForm.$setPristine();
			$scope.gymUser = null;
			$scope.buttonText = '';
			
		}).error(function(error) {
			$scope.message = error.message;
		});
		
		$timeout(function(){
			$scope.message = '';
         }, 2000);
	};
	
	var defaultDate = function() {
		$scope.joiningDate = $filter("date")(new Date() , 'yyyy-MM-dd');
		var feeSubmitDate1 = new Date();
		feeSubmitDate1.setDate(feeSubmitDate1.getDate() + 4);
		$scope.feeSubmitDate = $filter("date")(feeSubmitDate1, 'yyyy-MM-dd');
		$scope.feeDueDate = $filter("date")(feeSubmitDate1, 'yyyy-MM-dd');
		$scope.dob = $filter("date")(new Date() , 'yyyy-MM-dd');

	};
	
	$scope.initEditGymUser = function(gymUser) {
		editGym = true;
		$scope.gymUser = gymUser;
		$scope.gymUser.joiningDate = new Date(gymUser.joiningDate);
		$scope.gymUser.dob = new Date(gymUser.dob);
		$scope.gymUser.feeSubmitDate = new Date(gymUser.feeSubmitDate);
		$scope.gymUser.feeDueDate = new Date(gymUser.feeDueDate);
		$scope.message='';
		$scope.buttonText = 'Update';
	};
	$scope.initAddGymUser = function() {
		editGym = false;
		$scope.gymUser =null;
		$scope.gymuserForm.$setPristine();
		$scope.message='';
		$scope.buttonText = 'Create';
		defaultDate();
	};
	$scope.deleteGymUser = function(gymUser) {
		$http.delete('api/gym-users/'+gymUser.id).success(function(res) {
			$scope.message ="Success!";
			initGym();
		}).error(function(error) {
			$scope.deleteMessage = error.message;
		});
	};
	var editGymUser = function(){
		if($scope.gymUser.feeStatus === 'PAID'){
			$scope.gymUser.feeSubmitDate = $filter("date")(new Date() , 'yyyy-MM-dd');
		}else{
			$scope.gymUser.feeSubmitDate = $scope.gymUser.feeSubmitDate;
		}
		$http.put('api/gym-users', $scope.gymUser).success(function(res) {
			$scope.gymUser = null;
			// $scope.confirmPassword = null;
			$scope.gymuserForm.$setPristine();
			$scope.message = "Editting Success";
			initGym();
		}).error(function(error) {
			$scope.message =error.message;
		});
	};
	var addGymUser = function(){
		$scope.gymUser.joiningDate = new Date($scope.joiningDate);
		$scope.gymUser.dob = new Date($scope.dob);
		$scope.gymUser.feeSubmitDate = new Date($scope.feeSubmitDate);
		$scope.gymUser.feeDueDate = new Date($scope.feeDueDate);
		$http.post('api/gym-users', $scope.gymUser).success(function(res) {
			$scope.gymUser = null;
			// $scope.confirmPassword = null;
			$scope.gymuserForm.$setPristine();
			$scope.message = "Gym User Created";	

			initGym();

		}).error(function(error) {
			$scope.message = error.message;
		});
	};
	$scope.submitGym = function() {
		if(editGym){
			editGymUser();
		}else{
			addGymUser();	
		}
	};
	
	$scope.close = function() {
		$scope.buttonText = '';
	};
	
	$scope.sort = {
	  active: 'feeStatus',
	  descending: true
	}     

	$scope.changeSorting = function(column) {

	  var sort = $scope.sort;

	  if (sort.active == column) {
	     sort.descending = !sort.descending;
	  } 
	  else {
	    sort.active = column;
	    sort.descending = false;
	  }
	};

	$scope.getIcon = function(column) {

	  var sort = $scope.sort;

	  if (sort.active == column) {
	    return sort.descending
	      ? 'glyphicon-chevron-up'
	      : 'glyphicon-chevron-down';
	    }

	  return 'glyphicon-chevron-down';
	}
	
	initGym();

});


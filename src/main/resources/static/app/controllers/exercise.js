angular.module('AddressBook')
// Creating the Angular Controller
.controller('ExerciseController', function($http, $scope, $timeout, $filter , AuthService) {
	var editExer = false;
	$scope.buttonText = 'Create';
	$scope.message='';
	
	var initExercise = function() {
		$http.get('api/exercises').success(function(res) {
			$scope.exercises = res;
			$scope.exerciseForm.$setPristine();
			$scope.exercise = null;
			$scope.buttonText = '';
			
		}).error(function(error) {
			$scope.message = error.message;
		});
		
		$timeout(function(){
			$scope.message = '';
         }, 2000);
	};
	
	$scope.initEditExercise = function(exercise) {
		editExer = true;
		$scope.exercise = exercise;
		$scope.message='';
		$scope.buttonText = 'Update';
	};
	
	$scope.initViewExercise = function(exercise) {
		$scope.exercise = exercise;
		$scope.viewButton = true;
	}
	
	$scope.initAddExercise = function() {
		editExer = false;
		$scope.exercise =null;
		$scope.exerciseForm.$setPristine();
		$scope.message='';
		$scope.buttonText = 'Create';
	};
	$scope.deleteExercise = function(exercise) {
		$http.delete('api/exercises/'+exercise.id).success(function(res) {
			$scope.message ="Success!";
			initExercise();
		}).error(function(error) {
			$scope.deleteMessage = error.message;
		});
	};
	var editExercise = function(){
		console.log('test');
		$http.put('api/exercises', $scope.exercise).success(function(res) {
			$scope.exercise = null;
			$scope.exerciseForm.$setPristine();
			$scope.message = "Editting Success";
			initExercise();
		}).error(function(error) {
			$scope.message =error.message;
		});
	};
	var addExercise = function(){
		$http.post('api/exercises', $scope.exercise).success(function(res) {
			$scope.exercise = null;
			$scope.exerciseForm.$setPristine();
			$scope.message = "Exercise Created";	

			initExercise();

		}).error(function(error) {
			$scope.message = error.message;
		});
	};
	$scope.submitExercise = function() {
		if(editExer){
			editExercise();
		}else{
			addExercise();	
		}
	};
	
	$scope.close = function() {
		$scope.buttonText = '';
		$scope.viewButton = false;
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
	
	initExercise();

});


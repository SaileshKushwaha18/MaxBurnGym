angular.module('AddressBook')
// Creating the Angular Controller
.controller('GymUsersController', function($http, $scope, $timeout, $filter , AuthService) {
	var editGym = false;
	$scope.buttonText = 'Create';
	$scope.message='';
	$scope.exercise = '';
	$scope.exercises = '';
	$scope.order = false;
	$scope.gymUserExercise = '';
	var feeStatusColor = 'white';
	var feeSubDate = null;
	var feeSubDt = null;
	var feeSubMt = null;
	var feeDueDate = null;
	var feeDueDt = null;
	var feeDueMt = null;
	var curDt = null;
	var pkgs = null;
	var currentdate = new Date();
	
	var initGym = function() {
		$http.get('api/gym-users').success(function(res) {
			for (var i in res) {
// curDt = new Date().getDate();
// // console.log(res[i]);
// feeSubDt = new Date(res[i].feeSubmitDate).getDate();
// feeSubMt = new Date(res[i].feeSubmitDate).getMonth();
				
				feeDueDate = new Date(res[i].feeDueDate);
// feeDueDt = new Date(res[i].feeDueDate).getDate();
// feeDueMt = new Date(res[i].feeDueDate).getMonth();
//				
				pkgs = parseInt(res[i].packages) + parseInt(res[i].extraPackages);
            	// console.log(res[i].userName +' : CurrentDate : ' + curDt);
            	// console.log(res[i].userName +' : FeeSubmissionDate' +
				// feeSubDt);
            	// console.log(res[i].userName +' : FeeSubmissionMonth' +
				// feeSubMt);
            	// console.log(res[i].userName +' : FeeDueDate' + feeDueDt);
            	// console.log(res[i].userName +' : FeeDueMonth' + feeDueMt);
            	// console.log(res[i].userName +' : Packages' +
				// res[i].packages);
            	
// if(pkgs > 1){
// if(currentdate > feeDueDate){
// feeStatusColor = 'red';
// }
// if(currentdate > feeSubDate && currentdate < feeDueDate){
// feeStatusColor = 'white';
// }
// }else{
// if(feeSubDt != null || feeDueDt != null){
// if( currentdate > feeDueDate || (curDt > feeSubDt && res[i].feeStatus ==
// 'UNPAID') || (curDt > feeDueDt && !res[i].feeStatus == 'PAID')){
// feeStatusColor = 'red';
// }else{
// feeStatusColor = 'white';
// }
// }
// }			
				//feeDueDate.setDate(feeDueDate.getDate()-4);
            	
            	if(pkgs > 0){
            		if(currentdate > feeDueDate){
            			feeStatusColor = 'red';
            		}else{
            			feeStatusColor = 'white';
            		}
            	}

            	res[i].feeStatusColor = feeStatusColor;
            	
            	if(feeStatusColor =='red' ){
            		res[i].feeStatus = 'UNPAID';
            	}else{
            		res[i].feeStatus = 'PAID';
            	}
            	
            	//editGymUser(res[i]);
			// console.log('User'+i +' - color:'+feeStatusColor);
			// console.log(res[i].feeStatusColor);
			}
            
			// console.log(res);
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
		
		initExercise();
	};

	// For ExerciseType dropdown
	var initExercise = function() {
		$http.get('api/exercises').success(function(res) {
			$scope.exercises = res;
		}).error(function(error) {
			$scope.message = error.message;
		});
	};
	
	$scope.onChangeSelect = function(exerciseOption) {
		console.log('Test2' +exerciseOption);
		initExercise();  
		// console.log(exerciseOption);
		for (var i in $scope.exercises) {
			if(editGym){
				if(exerciseOption == $scope.exercises[i].id){
					// console.log(exerciseOption);
					$scope.gymUser.exerciseFee = $scope.exercises[i].fee;
					$scope.gymUser.exerciseType = $scope.exercises[i].type;
					// console.log($scope.gymUser.exerciseFee);
					$scope.gymUser.exercise = $scope.exercises[i].id;
					
					$scope.gymFeeCalculation($scope.gymUser.exerciseFee);
					$scope.gymUser.packages = 1;
				}else if(exerciseOption == $scope.exercises[i].type){
					// console.log(exerciseOption);
					$scope.gymUser.exerciseFee = $scope.exercises[i].fee;
					$scope.gymUser.exerciseType = $scope.exercises[i].type;
					$scope.gymUser.exercise = $scope.exercises[i].id;
					
					$scope.gymFeeCalculation($scope.gymUser.exerciseFee);
					$scope.gymUser.packages = 1;
				}
			}else{
				if(exerciseOption == $scope.exercises[i].type){
					// console.log('hiiii'+ exerciseOption);
					$scope.gymUser.exerciseFee = $scope.exercises[i].fee;
					$scope.gymUser.exerciseType = $scope.exercises[i].type;
					$scope.gymUser.exercise = $scope.exercises[i].id;
					// console.log($scope.gymUser.exerciseFee);
					
					$scope.gymFeeCalculation($scope.gymUser.exerciseFee);
					
					$scope.gymUser.packages = 1;
				}
			}
		}
	};
	
	$scope.gymFeeCalculation = function(exerciseFee){
		if(exerciseFee != undefined && exerciseFee != null && exerciseFee != ''){
			var exerciseFee = parseInt(exerciseFee);
			var packages = 1;
			var extraPackages = 0;
			var submittedFee = 0;
			var feeDiscount = 0;
			
			if($scope.gymUser.packages != undefined && $scope.gymUser.packages !=null && $scope.gymUser.packages !=''){
				packages = parseInt($scope.gymUser.packages);
			}
			
			if($scope.gymUser.extraPackages != undefined && $scope.gymUser.extraPackages !=null  && $scope.gymUser.extraPackages !=''){
				extraPackages = parseInt($scope.gymUser.extraPackages);
			}
			
			var totalFee = exerciseFee * (packages + extraPackages);
			
			if($scope.gymUser.submittedFee != undefined && $scope.gymUser.submittedFee !=null  && $scope.gymUser.submittedFee !=''){
				submittedFee = parseInt($scope.gymUser.submittedFee);
			}
			
			if($scope.gymUser.feeDiscount != undefined && $scope.gymUser.feeDiscount !=null  && $scope.gymUser.feeDiscount !=''){
				feeDiscount = parseInt($scope.gymUser.feeDiscount);
			}
			
			var balanceFee = parseInt(totalFee) - parseInt(submittedFee) - parseInt(feeDiscount); 
			
			$scope.gymUser.extraPackages = extraPackages;
			$scope.gymUser.totalFee = totalFee;
			$scope.gymUser.submittedFee = submittedFee;
			$scope.gymUser.feeDiscount = feeDiscount;
			$scope.gymUser.balanceFee = balanceFee;
			packageStartEnd();
		}
	};
	
	var packageStartEnd = function(){
		var extraPackages = 0;
		var startDate = '';
		var endDate = '';
		if($scope.gymUser.extraPackages != undefined && $scope.gymUser.extraPackages !=null  && $scope.gymUser.extraPackages !=''){
			extraPackages = parseInt($scope.gymUser.extraPackages);
		}
		if(($scope.joiningDate !=null && $scope.gymUser.packages !=null) || $scope.gymUser.joiningDate !=null ){
			if($scope.gymUser.joiningDate != undefined && $scope.gymUser.joiningDate != null){ 
				
				if($scope.gymUser.feeStatus == 'PAID'){
					startDate = new Date();
				}
				
				if($scope.gymUser.feeStatus == 'UNPAID'){
					startDate = new Date($scope.gymUser.joiningDate);
				}
				
				endDate = new Date(startDate);
				endDate.setMonth(endDate.getMonth() + parseInt($scope.gymUser.packages) + extraPackages);
				
				$scope.gymUser.feeDueDate = endDate;
				if($scope.gymUser.feeStatus == 'PAID' && endDate < startDate){

					$scope.gymUser.feeDueDate = endDate;
					$scope.gymUser.feeSubmitDate = $filter("date")(currentdate, 'yyyy-MM-dd');
				}
			}else{
				startDate = new Date($scope.joiningDate);
				endDate = new Date(startDate);
				endDate.setMonth(endDate.getMonth() + parseInt($scope.gymUser.packages) + extraPackages);
				$scope.feeDueDate = $filter("date")(endDate, 'yyyy-MM-dd');
			}

			$scope.gymUser.packageStartDate = $filter("date")(startDate, 'yyyy-MM-dd');
			$scope.gymUser.packageEndDate = $filter("date")(endDate, 'yyyy-MM-dd');

			//initGym();
			
// console.log('packageStartDate : '+$scope.gymUser.packageStartDate);
// console.log('packageEndDate : '+$scope.gymUser.packageEndDate);
// console.log('packages : '+$scope.gymUser.packages);
// console.log('extraPackages : '+$scope.gymUser.extraPackages);
// console.log('feeDueDate : '+$scope.gymUser.feeDueDate);
		}
	};
	
	var defaultDate = function() {
//		console.log('editGym	defaultDate: '+editGym);

		var joiningDate = $filter("date")(new Date() , 'yyyy-MM-dd');
		$scope.joiningDate = joiningDate;
		var feeSubmitDate1 = new Date();
		feeSubmitDate1.setDate(feeSubmitDate1.getDate() + 2);
		$scope.feeSubmitDate = $filter("date")(feeSubmitDate1, 'yyyy-MM-dd');
		$scope.feeDueDate = $filter("date")(feeSubmitDate1, 'yyyy-MM-dd');
		$scope.dob = $filter("date")(new Date() , 'yyyy-MM-dd');

	}; 
	
	$scope.onChangeFeeStatus = function(feePaid){
		console.log('feePaid : ' +feePaid);
		if( feePaid == 'PAID'){
			$scope.gymUser.feeStatus = feePaid;
			$scope.gymUser.feeStatusColor = 'white';
		}
		if(feePaid == 'UNPAID'){
			$scope.gymUser.feeStatus = feePaid;
			$scope.gymUser.feeStatusColor = 'red';	
		}
		
//		if(editGym){
//			console.log('edit OnChangeFeeStatus :	'+editGym + '	:	feePaid	:	' + feePaid);
//			editGymUser();
//		}else{
//			addGymUser();
//		}
		// console.log('Test1' +$scope.gymUser.exercise);
		packageStartEnd();
		// console.log('Test3' +$scope.gymUser.exercise);
	};
	
	$scope.initEditGymUser = function(gymUser) {
		editGym = true;
		$scope.gymUser = gymUser;
		$scope.gymUser.joiningDate = new Date(gymUser.joiningDate);
		$scope.gymUser.dob = new Date(gymUser.dob);
		$scope.gymUser.feeSubmitDate = new Date(gymUser.feeSubmitDate);
		$scope.gymUser.feeDueDate = new Date(gymUser.feeDueDate);
		
		// $scope.gymUser.startDate = new Date(gymUser.startDate);
		// $scope.gymUser.endDate = new Date(gymUser.endDate);

		$scope.message='';
		$scope.buttonText = 'Update';
		
		// console.log($scope.gymUser);
// for (var i in $scope.exercises) {
// if(gymUser.exercise == $scope.exercises[i].id){
// $scope.gymUser.exerciseType = $scope.exercises[i].type;
// $scope.gymUser.exerciseFee = $scope.exercises[i].fee;
// //$scope.gymUser.exerciseFee = $scope.exercises[i].exercise.fee;
// console.log($scope.gymUser.exerciseType);
// console.log($scope.gymUser.exerciseFee);
// //$scope.gymUser.exerciseFee = $scope.exercises[i].exercise.fee;
// }
// }
		// console.log($scope.gymUser.exercise);
		$scope.onChangeSelect($scope.gymUser.exercise);
		// console.log($scope.gymUser.exercise.type);
		initExercise();
	};
	
	$scope.initViewGymUser = function(gymUser) {
		// initExercises(gymUser);
		$scope.gymUser = gymUser;
		$scope.gymUser.joiningDate = new Date(gymUser.joiningDate);
		$scope.gymUser.dob = new Date(gymUser.dob);
		$scope.gymUser.feeSubmitDate = new Date(gymUser.feeSubmitDate);
		$scope.gymUser.feeDueDate = new Date(gymUser.feeDueDate);
		$scope.gymUser.packageStartDate = new Date(gymUser.packageStartDate);
		$scope.gymUser.packageEndDate = new Date(gymUser.packageEndDate);
		$scope.viewButton = true;
		initExercise();
			
		for (var i in $scope.exercises) {
			// console.log($scope.exercises[i].id);
			if(gymUser.exercise == $scope.exercises[i].id){
				// console.log(gymUser.exercise);
				// console.log($scope.exercises[i].type);
				$scope.type = $scope.exercises[i].type;
				$scope.fee = $scope.exercises[i].fee;
				// console.log($scope.exercises[i] + ' ------------ '+
				// $scope.gymUser.exercise);
			}
		}
		// console.log(gymUser);
	};
	
	$scope.initAddGymUser = function() {

		editGym = false;
		$scope.gymUser =null;
		$scope.gymuserForm.$setPristine();
		$scope.message='';
		$scope.buttonText = 'Create';
		if($scope.joiningDate == undefined){
			defaultDate();
			console.log('initAddGymUser IF ---> scope.joiningDate	:	' + $scope.joiningDate);
		}else{
			var joiningDate = new Date();
			
			$scope.joiningDate = $filter("date")(joiningDate , 'yyyy-MM-dd');

			console.log('editGym	:	' + editGym);
			console.log('initAddGymUser ELSE ---> scope.joiningDate	:	' + $scope.joiningDate);
		}
		
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
// if($scope.gymUser.feeStatus === 'PAID'){
// $scope.gymUser.feeSubmitDate = $filter("date")(new Date() , 'yyyy-MM-dd');
// }else{
// $scope.gymUser.feeSubmitDate = $scope.gymUser.feeSubmitDate;
// }
		editGym = false;
		
		console.log($scope.gymUser);
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
			$scope.gymUser.exercise = $scope.gymUser.exercise;
			editGymUser();
		}else{
			editGym = false;
			$scope.gymUser.exercise = $scope.gymUser.exercise;
			//defaultDate();
			addGymUser();	
		}
	};
	
	$scope.close = function() {
		$scope.buttonText = '';
		$scope.viewButton = false;
		editGym = true;
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


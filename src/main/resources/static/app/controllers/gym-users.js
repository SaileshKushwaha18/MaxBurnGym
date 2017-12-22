angular.module('AddressBook')
// Creating the Angular Controller
.controller('GymUsersController', function($http, $scope, $timeout, AuthService, $filter , AuthService) {
	var editGym = false;
	$scope.buttonText = '';
	$scope.message='';
	
	$scope.user = AuthService.user;
	
	$scope.exercises = '';
	$scope.order = false;
	$scope.gymUserExercise = '';
	var feeStatusColor = 'white';
	var feeDueDate = null;
	var feeDueDt = null;
	var pkgs = null;
	var currentdate = new Date();
	$scope.viewButton = false;
	var gymUsersExcel = [];
	var initGym = function() {
		$http.get('api/gym-users').success(function(res) {
			for (var i in res) {

				feeDueDate = new Date(res[i].feeDueDate);	
				pkgs = parseInt(res[i].packages);
            	
            	if(pkgs > 0){
            		if(currentdate > feeDueDate){
            			feeStatusColor = 'red';
            		}else{
            			feeStatusColor = 'white';
            		}
            		
            		if(res[i].isNewUser){
            			feeStatusColor = 'red';
            		}
            	}

            	res[i].feeStatusColor = feeStatusColor;
            	
            	if(feeStatusColor =='red' ){
            		res[i].feeStatus = 'UNPAID';
            	}else{
            		res[i].feeStatus = 'PAID';
            	}
			}
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
	

	
	$scope.initEditGymUser = function(gymUser) {
		editGym = true;
		$scope.gymUser = gymUser;
		$scope.gymUser.joiningDate = new Date(gymUser.joiningDate);
		$scope.gymUser.dob = new Date(gymUser.dob);
		$scope.gymUser.feeSubmitDate = new Date(gymUser.feeSubmitDate);
		$scope.gymUser.feeDueDate = new Date(gymUser.feeDueDate);
		$scope.isNewUserCheck = false ;
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
		//initExercise();
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
	
	$scope.onChangeJoiningDueDate = function(joiningDueDate){
		if(!editGym){
			console.log('joiningDueDate' +joiningDueDate + 'editGym :	' +editGym);
			$scope.joiningDate = joiningDueDate;
			var joiningFeeDueDate = new Date(joiningDueDate);
			joiningFeeDueDate.setDate(joiningFeeDueDate.getDate() + 2);
			$scope.feeDueDate = $filter("date")(joiningFeeDueDate, 'yyyy-MM-dd');
			//$scope.dob = $scope.gymUser.dob;
			//console.log('joiningFeeDueDate :' +joiningFeeDueDate);
			//$scope.dob = $filter("date")(new Date() , 'yyyy-MM-dd');
		}else{
			var joinDt = new Date($scope.gymUser.joiningDate);
			joinDt.setMonth(joinDt.getMonth() + $scope.gymUser.packages, joinDt.getDate());
			$scope.gymUser.feeDueDate = new Date(joinDt);
			
			console.log('Fee Due Date======>' + $scope.gymUser.feeDueDate);
		}
	};
	
	$scope.onChangeSelect = function(exerciseOption) {
		console.log('Test2' +exerciseOption);
		initExercise();  
		 //console.log('exerciseOption' + exerciseOption);
		for (var i in $scope.exercises) {
			if(editGym){
				if(exerciseOption == $scope.exercises[i].id){
					console.log('exerciseOption 1' + exerciseOption);
					$scope.gymUser.exerciseFee = $scope.exercises[i].fee;
					$scope.gymUser.exerciseType = $scope.exercises[i].type;
					console.log($scope.gymUser.exerciseFee);
					$scope.gymUser.exercise = $scope.exercises[i].id;
					

					$scope.gymUser.packages = parseInt($scope.exercises[i].packages);
					$scope.gymFeeCalculation($scope.gymUser.exerciseFee);
				}else if(exerciseOption == $scope.exercises[i].type){
					console.log('exerciseOption 2' + exerciseOption);
					$scope.gymUser.exerciseFee = $scope.exercises[i].fee;
					$scope.gymUser.exerciseType = $scope.exercises[i].type;
					$scope.gymUser.exercise = $scope.exercises[i].id;

					$scope.gymUser.packages = parseInt($scope.exercises[i].packages);
					$scope.gymFeeCalculation($scope.gymUser.exerciseFee);
				}
			}else{
				if(exerciseOption == $scope.exercises[i].type){
					console.log('hiiii'+ exerciseOption);
					$scope.gymUser.exerciseFee = $scope.exercises[i].fee;
					$scope.gymUser.exerciseType = $scope.exercises[i].type;
					$scope.gymUser.exercise = $scope.exercises[i].id;
					console.log($scope.gymUser.exerciseFee);

					
					$scope.gymUser.packages = parseInt($scope.exercises[i].packages);
					$scope.gymFeeCalculation($scope.gymUser.exerciseFee);
				}
			}
		}
	};
	
	$scope.gymFeeCalculation = function(exerciseFee){
		if(exerciseFee != undefined && exerciseFee != null && exerciseFee != ''){
			var exerciseFee = parseInt(exerciseFee);
			var packages = 0;
			var extraPackages = 0;
			var submittedFee = 0;
			var feeDiscount = 0;
			
			if($scope.gymUser.packages != undefined && $scope.gymUser.packages !=null && $scope.gymUser.packages !=''){
				packages = parseInt($scope.gymUser.packages);
			}
			
//			if($scope.gymUser.extraPackages != undefined && $scope.gymUser.extraPackages !=null  && $scope.gymUser.extraPackages !=''){
//				extraPackages = parseInt($scope.gymUser.extraPackages);
//			}
			
			var totalFee = exerciseFee * (packages);
			if(packages > 1){
				totalFee = exerciseFee;
			}
			
			if($scope.gymUser.submittedFee != undefined && $scope.gymUser.submittedFee !=null  && $scope.gymUser.submittedFee !=''){
				submittedFee = parseInt($scope.gymUser.submittedFee);
			}
			
			if($scope.gymUser.feeDiscount != undefined && $scope.gymUser.feeDiscount !=null  && $scope.gymUser.feeDiscount !=''){
				feeDiscount = parseInt($scope.gymUser.feeDiscount);
			}
			
			var balanceFee = parseInt(totalFee) - parseInt(submittedFee) - parseInt(feeDiscount); 
			
			//$scope.gymUser.extraPackages = extraPackages;
			$scope.gymUser.totalFee = totalFee;
			$scope.gymUser.submittedFee = submittedFee;
			$scope.gymUser.feeDiscount = feeDiscount;
			$scope.gymUser.balanceFee = balanceFee;
			packageStartEnd();
		}
	};
	
	var packageStartEnd = function(){
		//var extraPackages = 0;
		var startDate = '';
		var endDate = '';
//		if($scope.gymUser.extraPackages != undefined && $scope.gymUser.extraPackages !=null  && $scope.gymUser.extraPackages !=''){
//			extraPackages = parseInt($scope.gymUser.extraPackages);
//		}
		if(($scope.joiningDate !=null && $scope.gymUser.packages !=null) || $scope.gymUser.joiningDate !=null ){
			if($scope.gymUser.joiningDate != undefined && $scope.gymUser.joiningDate != null){ 
				//console.log('line 250===========================>');
				if($scope.gymUser.feeStatus == 'PAID'){
					startDate = new Date($scope.gymUser.feeDueDate);
				}
				
				if($scope.gymUser.feeStatus == 'UNPAID'){
					startDate = new Date($scope.gymUser.joiningDate);
				}
				
				endDate = new Date(startDate);
				
//				if($scope.gymUser.isNewUser == 1){
//					endDate.setDate(endDate.getDate() + 2);
//				}else{
					//endDate.setMonth(endDate.getMonth() + parseInt($scope.gymUser.packages) + extraPackages);
				endDate.setMonth(endDate.getMonth() + parseInt($scope.gymUser.packages));
				//}

				$scope.gymUser.feeDueDate = endDate;
				

				if($scope.gymUser.feeStatus == 'PAID' && endDate < startDate){

					$scope.gymUser.feeDueDate = endDate;
					$scope.gymUser.feeSubmitDate = $filter("date")(currentdate, 'yyyy-MM-dd');
				}
				
				$scope.feeDueDate = $scope.gymUser.feeDueDate;
			}else{
				//console.log('line 277===========================>');
				startDate = new Date($scope.joiningDate);
				endDate = new Date(startDate);
				//endDate.setMonth(endDate.getMonth() + parseInt($scope.gymUser.packages) + extraPackages);
				endDate.setMonth(endDate.getMonth() + parseInt($scope.gymUser.packages));
				$scope.feeDueDate = $filter("date")(endDate, 'yyyy-MM-dd');
			}
			
			$scope.gymUser.packageStartDate = startDate;
			$scope.gymUser.packageEndDate = endDate;
			//$scope.feeDueDate = $filter("date")(endDate, 'yyyy-MM-dd');
			
			currDt = $filter("date")(currentdate, 'yyyy-MM-dd');
			
			if(currDt <= $scope.gymUser.packageEndDate){
				console.log("hiiiiiiiiiii22222222222222222222");
				$scope.gymUser.feeStatus = 'PAID';
				$scope.gymUser.feeStatusColor = 'white';
			}
			
			if(currDt >= $scope.feeDueDate){
				console.log("hiiii3333333333333333333333333333333");
				$scope.gymUser.feeStatus = 'UNPAID';
				$scope.gymUser.feeStatusColor = 'red';
			}
			
//		 console.log('packageStartDate : '+$scope.gymUser.packageStartDate);
//		 console.log('packageEndDate : '+$scope.gymUser.packageEndDate);
//		 console.log('packages : '+$scope.gymUser.packages);
//		 console.log('feeDueDate : '+$scope.feeDueDate);
		}
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
		
		if(editGym){
			$scope.gymUser.isNewUser = 0;
			//console.log('EDIT :' + editGym + 'isNewUser' + $scope.gymUser.isNewUser);
		}else{
			$scope.gymUser.isNewUser = 1;
			//console.log('EDIT :' + editGym + 'isNewUser' + $scope.gymUser.isNewUser)
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
	$scope.initAddGymUser = function() {

		editGym = false;
		$scope.isNewUserCheck = true ;
		
		$scope.gymUser = null;
		
		//if($scope.joiningDate == undefined){
			defaultDate();
			//console.log('initAddGymUser IF ---> scope.joiningDate	:	' + $scope.joiningDate);
			
			$scope.joiningDate = $scope.joiningDate;
			$scope.gymuserForm.$setPristine();
			$scope.message='';
			$scope.buttonText = 'Create';
	//	}else{
			
//			$scope.gymUser.firstName =null;
//			$scope.gymUser.middleName =null;
//			$scope.gymUser.lastName =null;
//			$scope.gymUser.gender =null;
//			$scope.gymUser.phone =null;
//			$scope.gymUser.emailId =null;
//			$scope.gymUser.feeStatus =null;
//			$scope.gymUser.feeStatusColor =null;
//			$scope.gymUser.exerciseType =null;
//			$scope.gymUser.exerciseFee =null;
//			$scope.gymUser.packages =null;
//			$scope.gymUser.extraPackages =null;
//			$scope.gymUser.totalFee =null;
//			$scope.gymUser.submittedFee =null;
//			$scope.gymUser.feeDiscount =null;
//			$scope.gymUser.balanceFee =null;
			
			//defaultDate();
//			$scope.joiningDate = $scope.joiningDate;
//			$scope.gymUser.dob =null;
//			$scope.gymUser.feeSubmitDate =null;
//			$scope.gymUser.feeDueDate =null;

		//	console.log('editGym	:	' + editGym);
		//	console.log('initAddGymUser ELSE ---> scope.joiningDate	:	' + $scope.joiningDate);
		//}


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
		$scope.gymUser.isNewUser = 1;
		 if($scope.gymUser.feeStatus == 'PAID'){
			 $scope.gymUser.isNewUser = 0;
			 $scope.gymUser.feeSubmitDate = new Date();
		 }else{
			 $scope.gymUser.feeSubmitDate = $scope.gymUser.feeSubmitDate;
		 }
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
		//console.log('addGymUser==============>' +$scope.gymUser.joiningDate);

		$scope.gymUser.isNewUser = 1;
		
		if($scope.joiningDate == undefined || $scope.joiningDate == null){
			defaultDate();
			$scope.gymUser.joiningDate = new Date($scope.joiningDate);
			$scope.gymUser.feeSubmitDate = '';
			$scope.gymUser.feeDueDate = new Date($scope.feeDueDate);
		}
		
		if($scope.gymUser.packageEndDate != undefined && $scope.gymUser.packageEndDate != null){
			//if($scope.gymUser.packages > 1){
				$scope.gymUser.feeDueDate = new Date($scope.gymUser.packageEndDate);
			//}
		}
		
		if($scope.gymUser.dob != null){
			$scope.gymUser.dob = $scope.gymUser.dob;
			//console.log('addGymUser dob 1==============>' +$scope.gymUser.dob);
		}else{

			$scope.gymUser.dob = new Date($scope.dob);
			//console.log('addGymUser dob 2==============>' +$scope.gymUser.dob);
		}
	
		console.log($scope.gymUser);
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
			$scope.gymUser.exercise = $scope.gymUser.exercise;
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
	
//	var JSONToCSVConvertor = function(JSONData, ReportTitle, ShowLabel) {
//	    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
//	    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
//	    
//	    var CSV = '';    
//	    //Set Report title in first row or line
//	    
//	    CSV += ReportTitle + '\r\n\n';
//
//	    //This condition will generate the Label/Header
//	    if (ShowLabel) {
//	        var row = "";
//	        
//	        //This loop will extract the label from 1st index of on array
//	        for (var index in arrData[0]) {
//	            
//	            //Now convert each value to string and comma-seprated
//	            row += index + ',';
//	        }
//
//	        row = row.slice(0, -1);
//	        
//	        //append Label row with line break
//	        CSV += row + '\r\n';
//	    }
//	    
//	    //1st loop is to extract each row
//	    for (var i = 0; i < arrData.length; i++) {
//	        var row = "";
//	        
//	        //2nd loop will extract each column and convert it in string comma-seprated
//	        for (var index in arrData[i]) {
//	            row += '"' + arrData[i][index] + '",';
//	        }
//
//	        row.slice(0, row.length - 1);
//	        
//	        //add a line break after each row
//	        CSV += row + '\r\n';
//	    }
//
//	    if (CSV == '') {        
//	        alert("Invalid data");
//	        return;
//	    }   
//	    
//	    //Generate a file name
//	    var fileName = "MyReport_";
//	    //this will remove the blank-spaces from the title and replace it with an underscore
//	    fileName += ReportTitle.replace(/ /g,"_");   
//	    
//	    //Initialize file format you want csv or xls
//	    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
//	    
//	    // Now the little tricky part.
//	    // you can use either>> window.open(uri);
//	    // but this will not work in some browsers
//	    // or you will not get the correct file extension    
//	    
//	    //this trick will generate a temp <a /> tag
//	    var link = document.createElement("a");    
//	    link.href = uri;
//	    
//	    //set the visibility hidden so it will not effect on your web-layout
//	    link.style = "visibility:hidden";
//	    link.download = fileName + ".csv";
//	    
//	    //this part will append the anchor tag and remove it after automatic click
//	    document.body.appendChild(link);
//	    link.click();
//	    document.body.removeChild(link);
//	};
	var initExcelExport = function() {
		initExercise();
		$http.get('api/gym-users').success(function(res) {
			//console.log(res);
			for (var i in res) {

				res[i].joiningDate = $filter("date")( new Date(res[i].joiningDate),"yyyy-MM-dd");	
				res[i].dob = $filter("date")( new Date(res[i].dob),"yyyy-MM-dd");
				res[i].feeDueDate = $filter("date")( new Date(res[i].feeDueDate),"yyyy-MM-dd");
				res[i].feeSubmitDate = $filter("date")( new Date(res[i].feeSubmitDate),"yyyy-MM-dd");
				res[i].packageStartDate = $filter("date")( new Date(res[i].packageStartDate),"yyyy-MM-dd");
				res[i].packageEndDate = $filter("date")( new Date(res[i].packageEndDate),"yyyy-MM-dd");
				
				if(res[i].isNewUser == 1){
					res[i].isNewUser = 'New';
				}else{
					res[i].isNewUser = 'Old';
				}
	
				for (var j in $scope.exercises) {
					// console.log($scope.exercises[i].id);
					if(res[i].exercise == $scope.exercises[j].id){
						res[i].exercise = $scope.exercises[j].type;
					}
				}
			}
			//JSONToCSVConvertor(res, "Vehicle Report", true);
			$scope.gymusersexcel = res;
		}).error(function(error) {
			$scope.message = error.message;
		});
	};
	initGym();
	initExcelExport();
});


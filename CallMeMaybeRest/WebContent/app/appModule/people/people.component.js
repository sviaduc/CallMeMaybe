angular.module('appModule')
  .component('people', {
    templateUrl : 'app/appModule/people/people.component.html',
    controller : function(callMeMaybeService, $filter, $location, $routeParams) {

     //Variables
    	var vm = this;
    	vm.selected = null;
    	vm.editPeople = null;
    vm.people = [];
    
 	//reloads index
    vm.reload = function(){
      	callMeMaybeService.index()
         .then(function(res){
       	  vm.people = res.data;
      
          })
      	} 
    	
    vm.reload();
    
    if (!vm.selected && parseInt($routeParams.id)) {
	 	var tid = parseInt($routeParams.id)
	 	
	 	callMeMaybeService.show(id)
	 	.then(function(res){
    	  vm.selected = res.data;
    	  if(!res.data){
    		  $location.path('_404');
    	  }
       })
 }
    vm.selectPerson = function(person){
		 console.log(person);
		 vm.selected= person;
	 };
	 
 	//create
	 vm.addPerson = function(newPerson){
		 
		 var res = callMeMaybeService.create(newPerson);
		 
		 res.then(function(res){
     	    vm.reload();
    })
	 }
	 
	//Update
	 vm.updatePerson = function(person){
		 console.log(person);
		 var res = callMeMaybeService.update(person);
		 
		 	
		 	res.then(function(res){
		 		vm.selected = false;
		 		
		 		vm.editPeople = false;
		 	})
	
	 }
	 vm.setEditPerson = function(person){
		 vm.editPerson = angular.copy(vm.selected);
		
		};
		
	//UpdateDate
	vm.updateDate = function(person){
		var res = callMeMaybeService.updateDate(person);
		var preCall = new Date(person.callDate);
		var date = new Date();
		var newObject = {
				callDate: date
		}
		
		res.then(function(res){
			
			 var timeDiff = Math.abs(date.getTime() - preCall.getTime());
			 var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
			 alert("Days since last called: " + diffDays);
			 
		})
		
	}
	vm.setEditPerson = function(person){
		vm.editPerson = angular.copy(vm.selected);
		
		
	};
	 
	//Delete
	 vm.deletePerson = function(id){
		 var res = callMeMaybeService.destroy(id);
		 
		 res.then(function(res){
			 vm.reload();
		 })
}
    
 },
    
    controllerAs: 'vm'
    	
  })
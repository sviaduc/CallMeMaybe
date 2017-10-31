angular.module('appModule')
.factory('callMeMaybeService', function($http){
	var service = {};
	
	service.index = function() {
	    return $http({
	      method : 'GET',
	      url : `rest/people`
	    })
	 
  };

	service.show = function(id) {
	  	return $http({
		  method : 'GET',
		  url : `rest/people/` + id
	  })
	  
	};
	  
	service.update = function(person){
	  return $http({
	      method : 'PUT',
	      url : `rest/people/` + person.id, 
	      headers : {
	        'Content-Type' : 'application/json'
	      },
	      data : person
	    })
	  };
	  
	  service.updateDate = function(person){
		  return $http({
			  method : 'PUT',
			  url : `rest/people/` + person.id + `/update`, 
			  headers : {
				  'Content-Type' : 'application/json'
			  },
			  data : person
		  })
	  };
			 
	service.destroy = function(id){
	  return $http({
	      method : 'DELETE',
	      url : `rest/people/` + id,
	    })
		
	};
	
	
	service.create = function(newPerson) { 
	  return $http({
	      method : 'POST',
	      url : `rest/people`,
	      headers : {
	        'Content-Type' : 'application/json'
	      },
	      data : newPerson
	    })
	};

	return service;
})
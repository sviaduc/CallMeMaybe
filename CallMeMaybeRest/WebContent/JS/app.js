$(document).ready(function() {
      console.log('page loaded');
      getAllPeople();
     

    function getAllPeople() {
      $.ajax({
          type: "GET",
          url: "rest/people",
          dataType: "json"
        })

        .done(function(data, status) {
          buildDOM(data);
        })

        .fail(function(xhr, status, error) {
          console.log('ERROR! Something went wrong!');
        });
    }


      function buildDOM(data) {
    	  //console.log(data);
        //thead
        var $table = $('<table>');
        var $thead = $('<thead>');
        $table.append($thead);
        var $tr = $('<tr>');

        $thead.append($tr);
        var $th = $('<th>');
        $thead.text('People');
        $tr.append($th);
        //tbody
        var $tbody = $('<tbody>');
        $table.append($tbody);


        $('#content').append($table);

        for (var i = 0; i < data.length; i++) {
          var $tr2 = $('<tr>');
          $tbody.append($tr2);

          var $td = $('<td>');
          var $td2 = $('<td>');
          var $td3 = $('<td>');
          var $td4 = $('<td>');

          var deleteButton = $('<button>');
          deleteButton.attr("id", data[i].id)
          $td2.attr("id", data[i].id);
          
          var calledButton = $('<button>');
          calledButton.attr("id", data[i].id);
          $td4.attr("id", data[i].id);
          
          $tr2.append($td);
          $tr2.append($td2);
          $tr2.append($td3);
          $tr2.append($td4);
          
          $td3.append(deleteButton);
          deleteButton.text('Delete');
         
          $td4.append(calledButton);
          calledButton.text('Called');
          /////////////////////////////
          
          
          
          calledButton.click(function(e) {
			e.preventDefault(); 
			//console.log(this.id.callDate);
			var date = new Date();
			var newObject = {
					callDate: date
			}
			
			$.ajax({
                type: "GET",
                url: "rest/people/" + this.id,
                dataType: "json",
               
              })
			 .done(function(data, status) {
				 console.log(data);
				 var preCall = new Date(data.callDate);
				
				 var timeDiff = Math.abs(date.getTime() - preCall.getTime());
				 var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
				 alert("Days since last called: " + diffDays);
				
				 $.ajax({
		                type: "PUT",
		                url: "rest/people/" + data.id + "/update",
		                dataType: "json",
		                contentType : 'application/json',
		                data : JSON.stringify(newObject)
		              })
		              .done(function(data, status) {
		                $('#content').empty();
		                getAllPeople();
		                
		                
		                //hit button = add 10 points
						//each diffDays = - 1 point
		                
		              })

		              .fail(function(xhr, status, error) {
		                console.log('ERROR! Something went wrong!');
		              });
            
			 })
			
			
		})

          deleteButton.click(function(e) {
              e.preventDefault();
              //console.log("id: " + this.id);
              var peop = this.id;
              
              $.ajax({
                type: "DELETE",
                url: "rest/people/" + peop,
                dataType: "json"
              })
              .done(function(data, status) {
                $('#content').empty();
                getAllPeople();
                
              })

              .fail(function(xhr, status, error) {
                console.log('ERROR! Something went wrong!');
              });
          });

          $td.text(data[i].id);
          $td2.text(data[i].name);
          //console.log(data[i].name);


        

        
          $td2.click(function() {
            $('#content').empty();
            var peop = this.id;
            console.log(peop);
            $.ajax({
              type: "GET",
              url: "rest/people/" + peop,
              dataType: "json"
            })

            .done(function(data, status) {
            	
            	$(createPeople.name).val(data.name);
            	$(createPeople.callDate).val(data.callDate);
            	$(createPeople.relationship).val(data.relationship);
            	$(createPeople.birthday).val(data.birthday);
            	///////////////
            		$("#create").attr("type", "hidden");
            		var editButton = $("<input>");
            		editButton.attr("type", "Submit");
            		editButton.attr("id", "edit");
            		editButton.attr("personId", data.id);
            		
            		
            		
            		editButton.click(function(e){
            		
            		  var editedVersion = {
                            name: $(createPeople.name).val(),
                            callDate: $(createPeople.callDate).val(),
                            relationship: $(createPeople.relationship).val(),
                            birthday: $(createPeople.birthday).val()
                          }

                          $.ajax({
                              type: "PUT",
                              url: "rest/people/" + peop,
                              dataType: "json",
                              contentType: 'application/json',
                              data: JSON.stringify(editedVersion)

                            })

                            .done(function(data, status) {
                              $('#content').empty();
                      		 $("#create").attr("type", "submit");
                      		 $("#updateButton").empty();
                        	$(createPeople.name).val("");
                        	$(createPeople.callDate).val("");
                        	$(createPeople.relationship).val("");
                        	$(createPeople.birthday).val("");

                              getAllPeople();
                            })

                            .fail(function(xhr, status, error) {
                              console.log('ERROR! Something went wrong!');
                            });
            		  
            		  
            		});
		            	editButton.attr("value", "Update");
		              showPeople(data);
		              $("#updateButton").append(editButton);
		            })

            .fail(function(xhr, status, error) {
              console.log('ERROR! Something went wrong!');
            });

          
          
            	
            //Build profile
            function showPeople(people) {
              var $ul = $('<ul>');
              $("#content").append($ul);


              var name = $('<li>');
              name.text("Name:  " + people.name);
              $ul.append(name);

              var callDate = $('<li>');
              callDate.text("Date last called: " + people.callDate);
              $ul.append(callDate);

              var relationship = $('<li>');
              relationship.text("Relationship: " + people.relationship);
              $ul.append(relationship);

              var birthday = $('<li>');
              birthday.text("Birthday: " + people.birthday);
              $ul.append(birthday);
              
             

//              var img = $('<img>');
//              img.attr('src', people.img)
//              $ul.append(img);

              var button1 = $('<button>');
              button1.text('Return');
              button1.click(function() {
                 $('#content').empty();
         		 $("#create").attr("type", "submit");
         		 $("#updateButton").empty();
           	$(createPeople.name).val("");
           	$(createPeople.callDate).val("");
           	$(createPeople.relationship).val("");
           	$(createPeople.birthday).val("");

                buildDOM(data);
              })
              $ul.append(button1);


            };
          
          });


        };

      };
      $('#create').click(function(e) {
        e.preventDefault();
        var newPerson = {
          name: $('input[name="name"]').val(),
          callDate: $('input[name="callDate"]').val(),
          relationship: $('input[name="relationship"]').val(),
          //img: $('input[name="img"]').val(),
          birthday: $('input[name="birthday"]').val()
        };
          console.log(JSON.stringify(newPerson));
         $.ajax({
          type: "POST",
          url: "rest/people",
          dataType: "json",
          contentType: 'application/json',
          data: JSON.stringify(newPerson)

        })

         .done(function(data, status) {
          $('#content').empty();
          getAllPeople();
        })

         .fail(function(xhr, status, error) {
          console.log('ERROR! Something went wrong!');
        });

      });
});
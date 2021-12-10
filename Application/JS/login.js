//The URIs of the REST endpoint
UploadUser = "https://prod-82.eastus.logic.azure.com:443/workflows/5762eb3c73a2428a8d6c360699b1d47f/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=IQiuJ4y4RTlOCOycZrHw0StH3Vy2U8aReSosxo38B_c";

//Handlers for button clicks
$(document).ready(function() {

    //Handler for the new user submission button
  $("#submitNewUser").click(function(){

    //Execute the submit new user function
    submitNewUser();
  });

});

//A function to submit a new user to the REST endpoint 
function submitNewUser(){
    
alert('Account Created')
    var submitData = {
        //Get form variables and append them to the form data object
        username: $('#username').val(),
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        email: $('#email').val(),
        password: $('#password').val()
    }

    // converting JSON string
    subObj = JSON.stringify(submitData);
    console.log(submitData)
    console.log(subObj)

    //Post form to the endpoint
    $.post({
        url: UploadUser,
        data: subObj,
        contentType: 'application/json; charset=utf-8'
    }); 
}

  
$(document).ready(function() {
    $("#signupButton").click(function() {
        $("#signupForm").toggle();
    });
});
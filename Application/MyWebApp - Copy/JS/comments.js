RetrieveAllComments = "https://prod-52.eastus.logic.azure.com:443/workflows/8d1bbb8b9efa42159fa184092d436cf3/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=v3dNIwYh-tpnrPhd95coBYIrNj-Fx3Z1-ptjqMtkb7M";
UploadComment = "https://prod-12.eastus.logic.azure.com:443/workflows/5acf6c579a334fb09eac9335e5286f2e/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=2CP9ZktHHhVdlHf7j6e8Sofk95Pjv4_eJf0gxTZ2jLM";


BLOB_ACCOUNT = "https://smclean.blob.core.windows.net";

//Handlers for button clicks
$(document).ready(function() {

  getComments();

  $("#retrieveComments").click(function(){
    
    //Run the get image list function
    getComments();

  }); 

  //Handler for the new comment submission button
  $("#submitNewComment").click(function(){

    //Execute the submit comment function
    uploadComment();
  }); 

});

//A function to get a list of all the images and write them to the Div with the CommentList Div
function getComments(){
  
  //Replace the current HTML in that div with a loading message
  $('#CommentList').html('<div class="spinner-border" role="status"><span class="sr-only">&nbsp;</span>');
  
  $.getJSON(RetrieveAllComments, function( data ) {
    
    //Create an array to hold all the retrieved images
    var items = [];
    
    //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
    $.each( data, function( key, val ) {
      // items.push( "<hr />");
      items.push( "Comment : " + val["comment"] + "<br />");
      items.push( "Uploaded by: " + val["userName"] + " (user ID: "+val['userID']+")<br/>");
      items.push( "<hr />");
    });
    
    //Clear the CommentList div
    $('#CommentList').empty();
    
    //Append the contents of the items array to the CommentList Div
    $( "<ul/>", {
      "class": "my-new-list",
      html: items.join( "" )}).appendTo( "#CommentList" );
  });
}




//A function to get a post ID and delete it
function uploadComment(){

    //Create a form data object
    submitComment = new FormData();
    
    //Get form variables and append them to the form data object
    submitComment.append('comment', $('#comment').val());
    submitComment.append('userID', $('#userID').val());
    submitComment.append('userName', $('#userName').val());
  
   //Post the form data to the endpoint, note the need to set the content type header
   $.ajax({
     url: UploadComment,
     data: submitComment,
     cache: false,
     enctype: 'multipart/form-data',
     contentType: false,
     processData: false,
     type: 'POST',
     success: function(data){
     }
    }).done(function(msg){
      // Update image list after deletion
      getComments();
    });
  
}

$(document).ready(function() {
    $("#commentFormButton").click(function() {
      $("#newCommentForm").toggle();
    });
  
});
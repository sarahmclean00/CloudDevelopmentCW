//The URIs of the REST endpoint
UploadImage = "https://prod-39.eastus.logic.azure.com:443/workflows/57050e51ed8a4e449ba8a43c96faba0c/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=MbUCxSDU7BTkzvk62EFUq_VV_KKmZxx6CL5csgZKJzs";
RetrieveAllImages = "https://prod-38.eastus.logic.azure.com:443/workflows/6378d41c00ca42db95ae4856b1685b57/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Hw013f3VCfscvLX1SMW6mclecR57qU23NgW-7_JQG48";
DeleteImage0 = "https://prod-53.eastus.logic.azure.com/workflows/6f9bc06f477143c68d38e1852d68920c/triggers/manual/paths/invoke/";
DeleteImage1 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=1toeljB4JKx6_FxQR1f-U-rRFOh_T-O8VMqBIPfpWe0";


BLOB_ACCOUNT = "https://smclean.blob.core.windows.net";

//Handlers for button clicks
$(document).ready(function() {

    getImages();

  $("#retrieveImages").click(function(){
    
    //Run the get image list function
    getImages();

  }); 

   //Handler for the new image submission button
  $("#submitNewForm").click(function(){

    //Execute the submit new image function
    submitNewImage();
    
  }); 
});

//A function to submit a new image to the REST endpoint 
function submitNewImage(){

  //Replace the current HTML in that div with a loading message
  $('#ImageList').html('<div class="spinner-border" role="status"><span class="sr-only">&nbsp;</span>');
  
  //Create a form data object
  submitData = new FormData();
  
  //Get form variables and append them to the form data object
  submitData.append('caption', $('#caption').val());
  submitData.append('userID', $('#userID').val());
  submitData.append('userName', $('#userName').val());
  submitData.append('mediaType', $('#mediaType').val());
  submitData.append('File', $("#UpFile")[0].files[0]);
  console.log('File', $("#UpFile")[0].files[0]);

 //Post the form data to the endpoint, note the need to set the content type header
 $.ajax({
   url: UploadImage,
   data: submitData,
   cache: false,
   enctype: 'multipart/form-data',
   contentType: false,
   processData: false,
   type: 'POST',
   success: function(data){
   }
  }).done(function(msg){
    // Update image list after deletion
    getImages();
  });

}

//A function to get a list of all the images and write them to the Div with the ImageList Div
function getImages(){
  
  //Replace the current HTML in that div with a loading message
  $('#ImageList').html('<div class="spinner-border" role="status"><span class="sr-only">&nbsp;</span>');
  
  $.getJSON(RetrieveAllImages, function( data ) {
    
    //Create an array to hold all the retrieved images
    var items = [];
    
    //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
    $.each( data, function( key, val ) {
      items.push( "<hr /><br/>");
      items.push("<br />"+'<button type="button" id="submitNewForm" class="btn btn-danger" onclick="deleteImage(\''+val["id"]+'\')">Delete</button> <br/><br/>');
      items.push("<br />"+'<button type="button" id="showComments" class="btn btn-primary" onclick="location.href=\'./addComment.html?id='+ val["id"] + '&&username=' + val["userName"]+'\'">Comment</button> <br/>');
      items.push( "Caption : " + val["caption"] + "<br />");
      items.push( "Uploaded by: " + val["userName"] + " (user ID: "+val['userID']+")<br/>");
      if (val["mediaType"] === "imageFile"){
        items.push("<img src='"+BLOB_ACCOUNT + val["filePath"] +"' height= '300'/> <br />")
      }
      else if (val["mediaType"] === "videoFile"){
        items.push("<video controls width='400'> <source src='"+BLOB_ACCOUNT + val["filePath"] +"'></video><br />")
      }
      else if (val["mediaType"] === "audioFile"){
        items.push("<audio controls width='400'> <source src='"+BLOB_ACCOUNT + val["filePath"] +"'></audio><br />")
      }
      else {
        console.log("invalid media type")
      }
    });
    
    //Clear the imagelist div
    $('#ImageList').empty();
    
    //Append the contents of the items array to the ImageList Div
    $( "<ul/>", {
      "class": "my-new-list",
      html: items.reverse().join( "" )}).appendTo( "#ImageList" );
  });
}


//A function to get a post ID and delete it
function deleteImage(id){

// ID parameter is provided to function
alert('Image Deleted')
  $.ajax({

    url: DeleteImage0 + id + DeleteImage1,
    type: "DELETE",

  }).done(function(msg){
    // Update image list after deletion
    getImages();
  });
}


$(document).ready(function() {
  $("#formButton").click(function() {
    $("#newImagePost").toggle();
  });

});

// function routeComments(){
//   window.location.href = "'./addComment.html?id=' + id";
// }
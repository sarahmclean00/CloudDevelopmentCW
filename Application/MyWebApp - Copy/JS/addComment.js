RetrieveOneImage0 = "https://prod-93.eastus.logic.azure.com/workflows/db87cef7232140d29af749b6559e1010/triggers/manual/paths/invoke/";
RetrieveOneImage1 =  "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=xTUFGYS_QNI-PnHnBgpgR1J6oB1ChPH-bEICjOJah2M";

RetrieveAllComments0 = "https://prod-52.eastus.logic.azure.com/workflows/8d1bbb8b9efa42159fa184092d436cf3/triggers/manual/paths/invoke/";
RetrieveAllComments1 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=v3dNIwYh-tpnrPhd95coBYIrNj-Fx3Z1-ptjqMtkb7M";

UploadComment0 = "https://prod-74.eastus.logic.azure.com/workflows/929d430048b24a3d8814ad8cd8b2ce46/triggers/manual/paths/invoke/";
UploadComment1 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=qWN1OgGMF7aK449iUH0zqaZ0DuujcM3DEATs86rfiIM";

BLOB_ACCOUNT = "https://smclean.blob.core.windows.net";

let searchParams = new URLSearchParams(window.location.search)
let id = searchParams.get('id')
let username = searchParams.get('username')
// let currentUser = searchParams.get('username')

//Handlers for button clicks
$(document).ready(function() {
    //Run the get post list function
    getPost(id);
    
    //Run the get post list function
    getComments(id);
  });

//A function to get a list of all the posts and write them to the Div with the postList Div
function getPost(id){
    //Replace the current HTML in that div with a loading message
    $('#CommentForm').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');

    $.getJSON(RetrieveOneImage0+id+RetrieveOneImage1, function( data ) {
      //Create an array to hold all the retrieved posts
      var items = [];
        //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
        // items.push( "<hr />");
        items.push( '<form style="font-size: 10pt;" id="newCommentForm">\
        <div class="mb-3">\
        <label for="comment" class="form-label">Comment: </label> \
        <input type="text" class="form-control" id="comment">\
        </div>\
        <button type="button" id="subNewCommentForm" class="btn btn-primary" onclick="addComment(\''+data.id+'\')">Upload</button><br/> \
        </form>');
        items.push( "Uploaded by: " + data.userName + " (user id: "+data.userID+")<br />"); 
        items.push( "Caption: " + data.caption + "<br />"); 
        // items.push( "Add a comment:" + "<br />");
        
        if (data["mediaType"] === "imageFile"){
        items.push("<img src='"+ BLOB_ACCOUNT + data.filePath +"' width='400'/> <br />");
        }
        else if (data["mediaType"] == "videoFile"){
        items.push("<video controls width='400'><source src='"+ BLOB_ACCOUNT + data.filePath +"'></video><br />");
        }
        else if (data["mediaType"] == "audioFile"){
        items.push("<audio controls width='400'><source src='"+ BLOB_ACCOUNT + data.filePath +"'></audio><br />");
        }
        else{
        console.log("cannot identify media type")
        }
  
        //Clear the postlist div
        $('#CommentForm').empty();
  
        //Append the contents of the items array to the CommentForm Div
        $( "<ul/>", {
          "class": "my-new-list", 
          html: items.reverse().join( "" )
        }).appendTo( "#CommentForm" ); 
      });
  }

  //A function to get a list of all the posts and write them to the Div with the postList Div
function getComments(id){

    //Replace the current HTML in that div with a loading message
    $('#CommentList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');
    
    $.getJSON(RetrieveAllComments0+id+RetrieveAllComments1, function( data ) {
    
      //Create an array to hold all the retrieved posts
      var items = [];
    
        //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
        $.each( data, function( key, val ) {
          items.push( "<hr />");
          items.push( "Uploaded by: " + val["username"] + "<br />"); 
          items.push( "Comment : " + val["comment"] + "<br />");
        });
  
        //Clear the postlist div
        $('#CommentList').empty();
  
        //Append the contents of the items array to the CommentList Div
        $( "<ul/>", {
          "class": "my-new-list", 
          html: items.reverse().join( "" )
        }).appendTo( "#CommentList" ); 
      });
  }


function addComment(id){
    // construct JSON object for new item
    var subObj = {
        comment:  $('#comment').val()
    }
        
    subObj = JSON.stringify(subObj)
    alert(subObj)

    //Post the form data to the endpoint, note the need to set the content type header
    $.post({
        url: UploadComment0 + id + '/' + username + UploadComment1,
        data: subObj,
        contentType: 'application/json; charset=utf-8'
    }).done(function (response) {
        alert("comment added successfully")
        getPost(id);
        getComments(id);
    });
}
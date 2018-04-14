$(document).ready(function(){
  console.log("calling GET /history.html");
  $.ajax({
    method: 'get',
    url: '/getHistory',
    data: '',
    success: printHistory
  });
});

function printHistory(data){

	//$('#userTable').append("<h1>Total Users This Session: " + data.length + "</h1>");
	var table = '<table id="tableOfUsers" style="width:60%"> <tr><th>StudentID</th><th>Name</th><th>Date</th></tr>';

	for(var i = 0;i<data.length;i++){
		table += '<tr> <td>'+data[i].userID+'</td> <td>'+data[i].name+'</td><td>'+data[i].date+'</td> </tr>';
	}
	table += '</table>';
	$('#userTable').html(table);
}
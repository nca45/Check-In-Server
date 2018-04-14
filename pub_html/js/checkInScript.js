$(document).ready(function(){
  console.log("calling GET /checkin.html");
  $.ajax({
    method: 'get',
    url: '/checkin',
    data: '',
    success: createPage
  });
});

function createPage(data){

	$('#checkString').text(data);
	$('#button').append("<button onClick='stopCheckIn()'>STOP "+data+" CHECK-IN");
	$('#button').append("<br /><br /> <button onClick='getLatestCheckIn()'>Get Latest Check-in</button>")
}

function stopCheckIn(){
	console.log("stopping check-in");
	$.ajax({
		method: 'get',
		url: '/checkInSummary/'+$('#checkString').val(),
		data:'',
		success: printResults
	});
}

function getLatestCheckIn(){

	console.log("grabbing latest check-in");
	$.ajax({
		method: 'get',
		url: '/latestCheckIn',
		data:'',
		success: printLatest
	});
}

function printLatest(data){

	var body;
	if(typeof(data) == "object"){

		body = `<p>Name: ${data.name}, User ID: ${data.userID}</p>`;
	}
	else{

		body = '<p>No one has checked in yet!</p>';
	}
	$('#latestCheckIn').html(body);
}

function printResults(data){

	$('#latestCheckIn').remove();
	$('#button').remove();

	$('#results').append("<h1>Total Users This Session: " + data.length + "</h1>");
	var table = '<table id="tableOfUsers" style="width:75%"> <tr><th>Name</th><th>Student ID</th></tr>';

	for(var i = 0;i<data.length;i++){
		table += '<tr> <td>'+data[i].name+'</td> <td>'+data[i].userID+'</td> </tr>';
	}
	table += '</table>';
	$('#results').append(table);
}
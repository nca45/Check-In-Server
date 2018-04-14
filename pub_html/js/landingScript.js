function checkId(){

	if(!$("[name='checkId']").val()){
		$('#error').html("<p>Please enter a check-in string in the box!</p>");
		return false;
	}
	else{
		
		return true;
	}
}

function startCheckIn() {

	if(checkId()){

		$.ajax({
			method:'get',
			url:'/getId/'+$("[name='checkId']").val(),
			data: '',
			success: redirectCheckIn
		});	
	}
}

function redirectCheckIn(){

	console.log("redirecting...");
	location.href = "checkin.html";
}

function startHistory(){

	if(checkId()){
		$.ajax({
			method:'post',
			url:'/getIdHistory/'+$("[name='checkId']").val(),
			data: '',
			success: redirectHistory
		});
	}
}

function redirectHistory(){

	console.log("redirecting to history...");
	location.href = "history.html";
}

function deleteFrom(){

	if(checkId()){
		$.ajax({
			method:'delete',
			url:'/deleteFrom'+$("[name='checkId']").val(),
			data:'',
			success: printSuccess
		});
	}
}

function printSuccess(data){

	$('#error').html(`<p>${data}</p>`);
}
// Exercise 6
function validate() {
// Creamos reglas para validar
	const validateEmail = (email) => {
		return String(email)
		  .toLowerCase()
		  .match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		  );
	  };
	const addClassError = (element, error) => {
		if(error){
			element.classList.add('is-invalid');
			
		}
		else{
			element.classList.remove('is-invalid');
			element.classList.add('is-valid');
		}
	}
// Fin reglas

	var error = 0;
	// Get the input fields
	var fName = document.getElementById("fName");
	var fEmail = document.getElementById("fEmail");

	var fAddress = document.getElementById("fAddress");
	var fLastN = document.getElementById("fLastN");
	var fPassword = document.getElementById("fPassword");
	var fPhone = document.getElementById("fPhone");

	// Get the error elements
/* 	var errorName = document.getElementById("errorName");
	var errorEmail = document.getElementById("errorEmail");  */
	
	// Validate fields entered by the user: name, phone, password, and email
	if(fName.value == "" || !fName.value.match(/^[A-Za-z\s]*$/) || fName.value.length < 3){
		addClassError(fName, true);
		error++;
	}
	else{
		addClassError(fName, false);
	}

	if(fEmail.value == "" || !validateEmail(fEmail.value) || fName.value.length < 3){
		addClassError(fEmail, true);
		error++;
	}
	else{
		addClassError(fEmail, false);
	}

	if(fAddress.value == "" || fAddress.value.length < 3){
		addClassError(fAddress, true);
		error++;
	}
	else{
		addClassError(fAddress, false);
	}

	if(fLastN.value == "" || !fLastN.value.match(/^[A-Za-z\s]*$/) || fLastN.value.length < 3){
		addClassError(fLastN, true);
		error++;
	}
	else{
		addClassError(fLastN, false);
	}

	if(fPassword.value == "" ||  !fPassword.value.match(/^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{3,8}$/) || fPassword.value.length < 3){
		addClassError(fPassword, true);
		error++;
	}
	else{
		addClassError(fPassword, false);
	}

	if(fPhone.value == "" || isNaN(fPhone.value) || fPhone.value.length != 9){
		addClassError(fPhone, true);
		error++;
	}
	else{
		addClassError(fPhone, false);
	}


	if(error>0){
		checkoutForm.addEventListener('submit', e => {
			e.preventDefault()
		}, true)
	}else{
		alert("OK");
	}
	var invalidFields = document.getElementsByClassName('is-invalid');
	
}
checkoutForm.addEventListener('focus', e => {
	if(e.target.classList.contains('is-invalid')){
		e.target.classList.remove('is-invalid')
	} 
}, true)
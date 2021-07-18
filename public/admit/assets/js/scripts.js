
function scroll_to_class(chosen_class) {
	var nav_height = $('nav').outerHeight();
	var scroll_to = $(chosen_class).offset().top - nav_height;

	if ($(window).scrollTop() != scroll_to) {
		$('html, body').stop().animate({ scrollTop: scroll_to }, 1000);
	}
}


jQuery(document).ready(function () {

	/*
		Fullscreen background
	*/
	$.backstretch("assets/img/backgrounds/1.jpg");

	/*
		Multi Step Form
	*/
	$('.msf-form form fieldset:first-child').fadeIn('slow');

	// next step
	$('.msf-form form .btn-next').on('click', function () {
		$(this).parents('fieldset').fadeOut(400, function () {
			$(this).next().fadeIn();
			scroll_to_class('.msf-form');
		});
	});

	// previous step
	$('.msf-form form .btn-previous').on('click', function () {
		$(this).parents('fieldset').fadeOut(400, function () {
			$(this).prev().fadeIn();
			scroll_to_class('.msf-form');
		});
	});


});

document.getElementById('admission').addEventListener('submit', admit);
function getVal(id) {
	return document.getElementById(id).value;
}
//firebase

function admit(e) {
	e.preventDefault();
	var name = getVal('name');
	var father = getVal('father');
	var email = getVal('email');
	var dob = getVal('dob');

	var addr = getVal('address');
	var city = getVal('city');
	var pin = getVal('postal-code');
	var tel = getVal('telephone');
	var state = getVal('state');
	var country = getVal('country');

	var dept = getVal('departmentn');
	var prog = getVal('program');
	var stream = getVal('stream');
	var trans = getVal('transp');
	var route = getVal('route');

	const userNow = firebase.auth().currentUser;

	db.collection("admitForm").doc(userNow.uid).set({
		sentOn: new Date(),
		medium: "web",
		name: name,
		father: father,
		email: email,
		dob: dob,

		addr: addr,
		city: city,
		pin: pin,
		tel: tel,
		state: state,
		country: country,

		dept: dept,
		prog: prog,
		stream: stream,
		trans: trans,
		route: route
	})
		.then(() => {
			window.alert("Admission form sent successfully");
			document.getElementById('admission').reset();
		})
		.catch((error) => {
			var errorCode = error.code;
			var errorMessage = error.message;
			window.alert(errorMessage);
		});
}

firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		var uid = user.uid;
		var ph = document.getElementById("phone-logged");
		ph.innerText = user.phoneNumber;
		checkFilled(uid);
	} else {
		window.location.replace('../admit/')
	}
});

function signOut() {
	firebase.auth().signOut();
}

function checkFilled(uid) {
	var form = document.getElementById('frmRow');
	var details = document.getElementById('dataRow');
	var dataTable = document.getElementById('filled-form');

	db.collection("admitForm").doc(uid).get().then((doc) => {
		if (doc.exists) {
			var data = doc.data();

			form.style.display = "none";
			details.style.display = "block";

			dataTable.innerText=data['name']+' - S/o '+data['father'];
			
		} else {
			console.log("No such document!");
			form.style.display = "block";
			details.style.display = "none";
		}
	}).catch((error) => {
		console.log("Error getting document:", error);
	});

}
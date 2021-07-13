//auth initialized
var auth = firebase.auth();

// Listen for form submit
document.getElementById('signin-form').addEventListener('submit', login);

// Submit form to login admin
function login(e) {
    //prevent default action on form submit
    e.preventDefault();
    // Get login credentials values
    var email = getInputVal('aEmail');
    var password = getInputVal('aPassword');
    //login function
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log(user.uid);
        })
        .catch((error) => {
            //handling errors
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            window.alert(errorMessage);
        });
    // Clear form
    document.getElementById('signin-form').reset();
}


//auth state observer
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        if (uid != "Ai7IuWitGpUKJ0csJSk4N1z8OWv2") {
            logout();
        }
        else {
            //window.location.replace('dashboard.html');
        }
    } else {
        // User is signed out
        console.log("Not Logged In")
    }
});

//logout wrong users
function logout() {
    auth.signOut().then(function () {
        // Sign-out successful.
        console.log("User has been logged out");
    }).catch((error) => {
        // An error happened.
        console.log("Error while logging out : " + error.code);
    });
}
//firebase app configs
var firebaseConfig = {
    apiKey: "AIzaSyBVAy3D7a2Zh2d5jA6Hdc4ZTPW4bdsOOmk",
    authDomain: "adm-sys9.firebaseapp.com",
    projectId: "adm-sys9",
    appId: "1:932887972109:web:f237eee9b600dd5dc80844",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
//firebase db init
var db = firebase.firestore();


// Function to get get form values
function getInputVal(id) {
    return document.getElementById(id).value;
}
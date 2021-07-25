var db = firebase.firestore();

//reference a collection - Step 1
var messagesRef = firebase.database().ref('admissions');

// Listen for form submit - Step 2
document.getElementById('admForm').addEventListener('submit', submitForm);

// Function to get get form values -FrontEnd to Backend Step 1
function getInputVal(id) {
    return document.getElementById(id).value;
}

// Submit form Event  to collect and save user data - Step 3
function submitForm(e) {
    e.preventDefault();
    //personal details
    var name = getInputVal('name');
    var dob = getInputVal('birthday');
    var father = getInputVal('father');
    var mother = getInputVal('mother');
    var email = getInputVal('email');
    var phone = getInputVal('phone');
    var gender = getInputVal('gender');
    var category = getInputVal('category');
    //payment
    var mode = getInputVal('mode');
    var amount = getInputVal('amount');
    var date = getInputVal('date');
    var tid = getInputVal('tid');
    //class10
    var board10 = getInputVal('board10');
    var branch10 = getInputVal('branch10');
    var percentage10 = getInputVal('percentage10');
    var year10 = getInputVal('year10');
    //iti
    var boarditi = getInputVal('boarditi');
    var branchiti = getInputVal('branchiti');
    var percentageiti = getInputVal('percentageiti');
    var yeariti = getInputVal('yeariti');
    //class12
    var board12 = getInputVal('board12');
    var branch12 = getInputVal('branch12');
    var percentage12 = getInputVal('percentage12');
    var year12 = getInputVal('year12');
    //diploma
    var boardDiploma = getInputVal('boardDiploma');
    var branchDiploma = getInputVal('courseDiploma');
    var percentageDiploma = getInputVal('percentageDiploma');
    var yearDiploma = getInputVal('yearDiploma');
    //graduation
    var boardGrad = getInputVal('boardGrad');
    var branchGrad = getInputVal('courseGrad');
    var percentageGrad = getInputVal('percentageGrad');
    var yearGrad = getInputVal('yearGrad');
    //more details
    var compExam = getInputVal('compExam');
    var rank = getInputVal('rank');
    var cocurr = getInputVal('cocurr');
    var games = getInputVal('games');
    //college prefs
    var counsellor = getInputVal('counsellor');
    var departmentn = getInputVal('departmentn');
    var program = getInputVal('program');
    var stream = getInputVal('stream');
    var hostel = getInputVal('hostel');
    var transp = getInputVal('transp');
    var route = getInputVal('route');
    //addresss
    var state = getInputVal('state');
    var pincode = getInputVal('pincode');
    var address = getInputVal('address');

    // Save message with all values of fields - Step 4
    saveMessage(name, dob, father, mother, email, phone, gender,
        category, mode, amount, date, tid,
        board10, branch10, percentage10, year10,
        boarditi, branchiti, percentageiti, yeariti,
        board12, branch12, percentage12, year12, boardDiploma, branchDiploma,
        percentageDiploma, yearDiploma, boardGrad, branchGrad,
        percentageGrad, yearGrad, compExam, rank, cocurr, games, departmentn, program, stream, counsellor,
        hostel, transp, route, state, pincode, address);


    // Show alert - Step 5
    document.querySelector('.alert').style.display = 'block';


    // Hide alert after 10 seconds - Step 6
    setTimeout(function() {
        document.querySelector('.alert').style.display = 'none';
    }, 30000);


    // Clear form - - Step 7
    document.getElementById('admForm').reset();
}


//function to save to firebase - BackEnd to server Step 1
function saveMessage(name, dob, father, mother, email, phone, gender,
    category, mode, amount, date, tid,
    board10, branch10, percentage10, year10,
    boarditi, branchiti, percentageiti, yeariti,
    board12, branch12, percentage12, year12, boardDiploma, branchDiploma,
    percentageDiploma, yearDiploma, boardGrad, branchGrad,
    percentageGrad, yearGrad, compExam, rank, cocurr, games, departmentn, program, stream, counsellor,
    hostel, transp, route, state, pincode, address) {
    // //saving in firestore rtdb

    // //reference a firestore collection
    var db = firebase.firestore().collection('users');
    db.doc(firebase.auth().currentUser.uid).update({
            Name: name,
            DOB: dob,
            Phone: phone,
            Department: departmentn,
            Branch: program,
            Stream: stream,
            counsellor: counsellor,
            remarks1: '',
            submitted: 'yes',
            done: 'no',
            remarks2: '',
            act: departmentn + program + stream
        })
        .then(function() {
            console.log("Firestore update successful");
        })
        .catch(function(error) {
            console.error("Error writing doc", error);
        });

    //saving in firebase rtdb
    var id = firebase.auth().currentUser.uid;
    var newMessageRef = messagesRef.child(id);
    if (id != null) {
        newMessageRef.set({
            //identifiers
            exp: false,
            submitted: 'yes',
            role: "student",
            platform: 'web',
            user: firebase.auth().currentUser.uid,
            department: departmentn,
            act: departmentn + program + stream,
            counsellor: counsellor,
            mode: mode,
            amount: amount,
            date: date,
            tid: tid,
            remarks1: '',
            remarks2: '',
            trigger: 'yes',
            done: 'no',
            //personal details
            name: name,
            dob: dob,
            father: father,
            mother: mother,
            email: email,
            phone: phone,
            gender: gender,
            category: category,
            //class10
            board10: board10,
            branch10: branch10,
            percentage10: percentage10,
            year10: year10,
            //iti
            boarditi: boarditi,
            branchiti: branchiti,
            percentageiti: percentageiti,
            yeariti: yeariti,
            //class12
            board12: board12,
            branch12: branch12,
            percentage12: percentage12,
            year12: year12,
            //diploma
            boardDiploma: boardDiploma,
            branchDiploma: branchDiploma,
            percentageDiploma: percentageDiploma,
            yearDiploma: yearDiploma,
            //graduation
            boardGrad: boardGrad,
            branchGrad: branchGrad,
            percentageGrad: percentageGrad,
            yearGrad: yearGrad,
            //more details
            compExam: compExam,
            rank: rank,
            cocurr: cocurr,
            games: games,
            //college prefs
            program: program,
            stream: stream,
            hostel: hostel,
            transp: transp,
            route: route,
            //address
            address: address + ',' + pincode + ',' + state,

        }).then(function() {
            document.getElementById("notice").innerHTML = "Your Admission Form Has Been Submitted";
            document.getElementById('admit').style.display = 'none';
            document.getElementById('btnSbmt').disabled = true;
            document.getElementById('btnRst').disabled = true;
            console.log("RTDB Success");
        })
    } else {
        console.log('Why Are You Submitting This Form If You Can\'t Afford To Just Register',
            'Yourself Instead Of Trying To Gain UnAuthorized Access To My Creation ?',
            'Do You Really Hate VINAY This Much !');
    }

}


const authSwitchLinks = document.querySelectorAll('.switch');
const authModals = document.querySelectorAll('.auth .modal');
const authWrapper = document.querySelector('.auth');
const registerForm = document.querySelector('.register');
const loginForm = document.querySelector('.login');
const signOut = document.querySelector('.sign-out');

// toggle auth modals
authSwitchLinks.forEach(link => {
    link.addEventListener('click', () => {
        authModals.forEach(modal => modal.classList.toggle('active'));
    });
});


// register form handler
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = registerForm.email.value;
    const name = registerForm.name.value;
    const phone = registerForm.phone.value;
    const password = registerForm.password.value;
    const department = registerForm.department.value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(user => {
            var id = firebase.auth().currentUser.uid;
            // var newMessageRef = messagesRef.child(id);
            console.log(id);
            if (id != null) {
                firebase.firestore().collection('users').doc(id).set({
                    Name: name,
                    DOB: "not set",
                    role: "student",
                    Email: email,
                    password: password,
                    submitted: 'no',
                    Phone: phone,
                    Department: department,
                    Branch: "program",
                    Stream: "stream",
                    counsellor: "not set",
                    remarks1: '',
                    remarks2: '',
                    act: department + "" + "",
                    datetime: new Date().toString()
                }).then(function() {
                    console.log('User Has Been Registered Successfully');
                    registerForm.reset();
                })
            }
        })
        .catch(error => {
            registerForm.querySelector('.error').textContent = 'Try Again';
        });
});

function getInputVal(id) {
    return document.getElementById(id).value;
}


// login form handler
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm.email.value;
    const password = loginForm.password.value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => {
            var id = firebase.auth().currentUser.uid;
            messagesRef.child(id);
            console.log(id);
            console.log('User Logged In Successfully');
            loginForm.reset();
        })
        .catch(error => {
            loginForm.querySelector('.error').textContent = 'Invalid User/ Credentials';
        });

});

// sign out handler
signOut.addEventListener('click', () => {
    firebase.auth().signOut()
        .then(() => console.log('User Signed Out'));
});

// auth listener
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        var id = firebase.auth().currentUser.uid;
        console.log(id);
        var docRef = db.collection('users').doc(id);
        docRef.get().then(function(doc) {
            var check = doc.data().submitted;
            if (check == 'yes') {
                document.getElementById("notice").innerHTML = "Your Admission Form Has Been Submitted";
                document.getElementById('admit').style.display = 'none';
                document.getElementById('btnSbmt').disabled = true;
                document.getElementById('btnRst').disabled = true;
            } else {
                document.getElementById("notice").innerHTML = "Please Fill Your Details Carefully";
                document.getElementById('btnSbmt').disabled = false;
                document.getElementById('btnSbmt').innerHTML = 'Submit Form';
                document.getElementById('btnRst').disabled = false;
                document.getElementById('btnRst').innerHTML = 'Reset Form';
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });


        const body = document.body;
        const scrollY = body.style.top;
        body.style.position = '';
        body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
        authWrapper.classList.remove('open');
        sendVerificationEmail();
        authModals.forEach(modal => modal.classList.remove('active'));
    } else {
        authWrapper.classList.add('open');
        authModals[0].classList.add('active');
        const body = document.body;
        const scrollY = body.style.top;
        body.style.position = 'fixed';
    }

});

//sending verification email to users
function sendVerificationEmail() {
    var user = firebase.auth().currentUser;
    if (user.emailVerified == true) {
        console.log('User Email Verified');
    } else {
        console.log('Sending Email Confirmation');
        user.sendEmailVerification();
        console.log('Sent Email Confirmation');
    }
}
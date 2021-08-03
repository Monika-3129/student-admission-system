
var storageRef = firebase.storage().ref();
var db = firebase.firestore();
var auth = firebase.auth();

//Handling File management and uploads
function uploadFiles(file, t) {
    const user = auth.currentUser;
    var photoRef = storageRef.child('formData/' + user.uid + '/' + file.name);
    var uploadTask = photoRef.put(file);
    //status listeners
    uploadTask.on('state_changed',
        (snapshot) => {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            if (t == 1) document.getElementById("photoS").innerText = progress + ' %';
            if (t == 2) document.getElementById("signS").innerText = progress + ' %';
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        },
        (error) => {
            // Handle unsuccessful uploads
            window.alert("File Upload Failed\n" + error.message);
        },
        () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                if (t == 1) document.getElementById("photoUrl").innerText = downloadURL;
                if (t == 2) document.getElementById("signUrl").innerText = downloadURL;

                console.log(
                    t == 1 ? document.getElementById("photoUrl").innerText :
                        document.getElementById("signUrl").innerText

                );

            });
        }
    );
}

function saveInDb() {
    const user = auth.currentUser;
    console.log("submitting");
    var formData = $('#admForm').serializeArray();
    //e.preventDefault();
    //college prefs
    var departmentn = getInputVal('departmentn') == '--Select--' ? "" : getInputVal('departmentn');
    var program = getInputVal('program');
    var stream = getInputVal('stream');
    var hostel = getInputVal('hostel') == '--Select--' ? "" : getInputVal('hostel');
    var transp = getInputVal('transp');
    var route = getInputVal('route');
    var poPt = document.getElementById("mediums");
    var medium = poPt.innerText;
    var uip = document.getElementById("uip").innerText;

    var handler = [
        { 'name': "departmentn", 'value': departmentn },
        { 'name': "program", 'value': program },
        { 'name': "stream", 'value': stream },
        { 'name': "hostel", 'value': hostel },
        { 'name': "transp", 'value': transp },
        { 'name': "route", 'value': route },
    ];
    formData.push(
        { 'name': "medium", 'value': medium },
        { 'name': "uip", 'value': uip },
        { 'name': "submittedOn", 'value': new Date() },
        { 'name': "photo", 'value': document.getElementById("photoUrl").innerText },
        { 'name': "signStd", 'value': document.getElementById("signUrl").innerText },
        { 'name': "signPrt", 'value': "" },
        { 'name': "admitted", 'value': false },
        { 'name': "submitted", 'value': true },
        { 'name': "locked", 'value': false },
        { 'name': "institute", 'value': "GTC" },
        { 'name': "formPdf", 'value': null },
    );

    if (formData.length < 87) {
        handler.forEach(element => {
            if (!formData.includes(element)) {
                formData.push(element);
            }
        });

    }

    const fd = formData.map(o => o['name']);
    const filtered = formData.filter(({ name }, index) => !fd.includes(name, index + 1));
    console.log(filtered.length);

    dataToSave = {}

    $.each(filtered, function (i, obj) { dataToSave[obj.name] = obj.value });

    db.collection("admitForm").doc(user.uid).set(dataToSave)
        .then(() => {
            console.log("Document successfully written!");
            document.getElementById("anLoader").style.display = "none";
            document.getElementById('admForm').reset();
            document.getElementById("processing").style.display = "block";
            
            document.getElementById("n1").innerText = "We have received your application";
            document.getElementById("n2").innerText = "Please wait for further communication";
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
}


//This section handles multiple selectable checkboxes inside a dropdown menu
var options = [];
$('.dropdown-menu a').on('click', function (event) {
    var $target = $(event.currentTarget),
        val = $target.attr('data-value'),
        $inp = $target.find('input'),
        idx;
    if ((idx = options.indexOf(val)) > -1) {
        options.splice(idx, 1);
        setTimeout(function () { $inp.prop('checked', false) }, 0);
    } else {
        options.push(val);
        setTimeout(function () { $inp.prop('checked', true) }, 0);
    }
    $(event.target).blur();
    //console.log(options);
    var pOpt = document.getElementById("mediums");
    pOpt.innerText = options;

    // var pOptD = document.getElementById("medSel");
    // pOptD.innerText = options;
    return false;
});


//multistep form management
var currentTab = 0;
document.addEventListener("DOMContentLoaded", function (event) {
    showTab(currentTab);
});

function showTab(n) {
    var x = document.getElementsByClassName("tab");
    var element = document.getElementById("ftr");
    if (n < x.length) {
        x[n].style.display = "block";
        if (n == 0) {
            document.getElementById("prevBtn").style.display = "none";
            element.classList.remove("fixed-bottom");
        } else {
            document.getElementById("prevBtn").style.display = "inline";
            element.classList.add("fixed-bottom");
        }
        if (n == (x.length - 1)) {
            document.getElementById("nextBtn").innerHTML = "Submit";


        } else {
            document.getElementById("nextBtn").innerHTML = "Next";


        }
        fixStepIndicator(n);
    }
}

function nextPrev(n) {
    var x = document.getElementsByClassName("tab");
    if (n == 1 && !validateForm()) return false;
    x[currentTab].style.display = "none";
    currentTab = currentTab + n;
    if (currentTab >= x.length) {
        document.getElementById("nextprevious").style.display = "none";
        document.getElementById("all-steps").style.display = "none";
        document.getElementById("anLoader").style.display = "block";
        saveInDb();
    }
    showTab(currentTab);
}

function validateForm() {
    var x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    //for (i = 0; i < y.length; i++) { if (y[i].value == "") { y[i].className += " invalid"; valid = false; } }
    if (valid) { document.getElementsByClassName("step")[currentTab].className += " finish"; } return valid;
}
function fixStepIndicator(n) { var i, x = document.getElementsByClassName("step"); for (i = 0; i < x.length; i++) { x[i].className = x[i].className.replace(" active", ""); } x[n].className += " active"; }


//Function to logout
function onSignOutClick() {
    auth.signOut();
}

//auth state listener
auth.onAuthStateChanged(function (user) {
    if (user != null) {
        if (user.uid == "Ai7IuWitGpUKJ0csJSk4N1z8OWv2") { onSignOutClick(); }
        else {
            var studentForm = db.collection("admitForm").doc(user.uid);
            studentForm.get().then((doc) => {
                if (doc.exists) {
                    var pdf = doc.data().formPdf;
                    if(pdf != null){
                    document.getElementById("n3").style.display = "block";
                    document.getElementById("n3").innerHTML = "<a href="+pdf+" target='_blank'>**Click to download**</a>";
                    document.getElementById("n1").innerText = "We have Processed Your application";
                    document.getElementById("n2").innerText = "You can now download your application Form";
                    }
                    else{
                        document.getElementById("n1").innerText = "We have received your application";
                    document.getElementById("n2").innerText = "Please wait for further communication";
                    }
                } else {
                    document.getElementById("admit").style.display = "block";
                    document.getElementById("processing").style.display = "none";
                    document.getElementById('phone').value = user.phoneNumber.substring(3);
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }
    }
    else if (user == null) {
        window.location.replace("index.html");
    }
});


// Listen for form submit - Step 2
document.getElementById('admForm').addEventListener('submit', submitForm);


// Submit form Event  to collect and save user data - Step 3
function submitForm(e) {

    //Row1
    var name = getInputVal('name');
    var dob = getInputVal('birthday');
    //Row 2
    var gender = getInputVal('gender');
    var category = getInputVal('category');
    var bldGrp = getInputVal('bldGrp');
    var marSt = getInputVal('marSt');
    //Row 3
    var email = getInputVal('email');
    var aadhar = getInputVal('aadhar');
    var nation = getInputVal('nation');
    //Row 4
    var father = getInputVal('father');
    var mother = getInputVal('mother');
    var fPhone = getInputVal('fPhone');
    var mPhone = getInputVal('mPhone');
    //Row 5
    var prFather = getInputVal('prFather');
    var prMom = getInputVal('prMom');
    var income = getInputVal('income');
    var familyId = getInputVal('fID');
    //Row 6
    var lgName = getInputVal('lgName');
    var lgPhone = getInputVal('lgPhone');
    var lgAddress = getInputVal('lgAddress');
    //Row 7
    var state = getInputVal('state');
    var pincode = getInputVal('pincode');
    var pAddress = getInputVal('pAddress');
    //Accordion 1 ends 

    //class10
    var sch10 = getInputVal('sch10');
    var board10 = getInputVal('board10');
    var roll10 = getInputVal('roll10');
    var year10 = getInputVal('year10');
    var sub10 = getInputVal('sub10');
    var marks10 = getInputVal('marks10');
    var per10 = getInputVal('per10');

    //class12
    var sch12 = getInputVal('sch12');
    var board12 = getInputVal('board12');
    var roll12 = getInputVal('roll12');
    var year12 = getInputVal('year12');
    var sub12 = getInputVal('sub12');
    var marks12 = getInputVal('marks12');
    var per12 = getInputVal('per12');

    //classIti
    var schIti = getInputVal('schIti');
    var boardIti = getInputVal('boardIti');
    var rollIti = getInputVal('rollIti');
    var yearIti = getInputVal('yearIti');
    var subIti = getInputVal('subIti');
    var marksIti = getInputVal('marksIti');
    var perIti = getInputVal('perIti');

    //classDip
    var schDip = getInputVal('schDip');
    var boardDip = getInputVal('boardDip');
    var rollDip = getInputVal('rollDip');
    var yearDip = getInputVal('yearDip');
    var subDip = getInputVal('subDip');
    var marksDip = getInputVal('marksDip');
    var perDip = getInputVal('perDip');

    //classGrad
    var schGrad = getInputVal('schGrad');
    var boardGrad = getInputVal('boardGrad');
    var rollGrad = getInputVal('rollGrad');
    var yearGrad = getInputVal('yearGrad');
    var subGrad = getInputVal('subGrad');
    var marksGrad = getInputVal('marksGrad');
    var perGrad = getInputVal('perGrad');

    //classPG
    var schPG = getInputVal('schPG');
    var boardPG = getInputVal('boardPG');
    var rollPG = getInputVal('rollPG');
    var yearPG = getInputVal('yearPG');
    var subPG = getInputVal('subPG');
    var marksPG = getInputVal('marksPG');
    var perPG = getInputVal('perPG');


    //more details
    var compExam = getInputVal('compExam');
    var rank = getInputVal('rank');
    var cocurr = getInputVal('cocurr');
    var games = getInputVal('games');
    //college prefs
    var departmentn = getInputVal('departmentn');
    var program = getInputVal('program');
    var stream = getInputVal('stream');
    var hostel = getInputVal('hostel');
    var transp = getInputVal('transp');
    var route = getInputVal('route');
    var pOpt = document.getElementById("mediums");
    var medium = pOpt.innerText;
    var uip = document.getElementById("uip").innerText;
    // var formData = ({

    // });
}

document.getElementById('feedForm').addEventListener('submit', sendFeed);

function sendFeed(e){
    e.preventDefault();
    const user = auth.currentUser;
    var msg = getInputVal('feedbackMsg');
    var uip = document.getElementById("uip").innerText;
    db.collection("feedBackWeb").doc(user.uid).set({
        sentOn:new Date(),
        medium:"web",
        msg:msg,
        ip:uip,
        phone:user.phoneNumber
    })
        .then(() => {
            console.log("Feedback successfully saved!");
            document.getElementById('feedForm').reset();
            $('#feedbackModal').modal('hide');

        })
        .catch((error) => {
            console.error("Error saving Feedback: ", error);
        });

}
// Listen for form submit - Step 2
document.getElementById('admForm').addEventListener('submit', submitForm);

// Function to get get form values -FrontEnd to Backend Step 1
function getInputVal(id) {
    return document.getElementById(id).value;
}


// Submit form Event  to collect and save user data - Step 3
function submitForm(e) {
    e.preventDefault();

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

}

function saveInDb(){
    
}
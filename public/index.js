

// Listen for form submit
document.getElementById('contact').addEventListener('submit', submitForm);

//toggling submit form button
document.getElementById('form-submit').disabled = false;

// Submit form
function submitForm(e) {
    //toggling submit form button
    document.getElementById('form-submit').disabled = true;
    //prevent default action on form submit
    e.preventDefault();
    // Get values
    var name = getInputVal('cName');
    var email = getInputVal('cEmail');
    var message = getInputVal('cMessage');
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    // Save message
    saveMessage(name, email, message, dateTime);
    // Clear form
    document.getElementById('contact').reset();
}

//function to save to firebase
function saveMessage(name, email, message, dateTime) {
    // Add a new document in db
    db.collection("contactFromWeb").add({
        name: name,
        email: email,
        message: message,
        dateTime: dateTime
    })
        .then(() => {
            console.log("Document successfully written!");
            //Show success alert
            window.alert("Message sent successfully");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
            //Show error alert
            window.alert("Message was not sent");
        });
    //toggling submit form button
    document.getElementById('form-submit').disabled = false;
}
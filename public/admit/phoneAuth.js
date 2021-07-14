window.onload = function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user != null) {
            if (user.uid == "Ai7IuWitGpUKJ0csJSk4N1z8OWv2")
                onSignOutClick();
            else{
                //onSignOutClick();
                window.location.replace("admForm.html");
            }
        }
        else {
            updateSignInButtonUI();
            updateSignInFormUI();
            updateSignOutButtonUI();
            updateVerificationCodeFormUI();
        }
    });
    document.getElementById('sign-out-button').addEventListener('click', onSignOutClick);
    document.getElementById('phone-number').addEventListener('keyup', updateSignInButtonUI);
    document.getElementById('phone-number').addEventListener('change', updateSignInButtonUI);
    document.getElementById('verification-code').addEventListener('keyup', updateVerifyCodeButtonUI);
    document.getElementById('verification-code').addEventListener('change', updateVerifyCodeButtonUI);
    document.getElementById('verification-code-form').addEventListener('submit', onVerifyCodeSubmit);
    document.getElementById('cancel-verify-code-button').addEventListener('click', cancelVerification);
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
        'size': 'invisible',
        'callback': function (response) {
            onSignInSubmit();
        }
    });
    recaptchaVerifier.render().then(function (widgetId) {
        window.recaptchaWidgetId = widgetId;
        updateSignInButtonUI();
    });
};

function onSignInSubmit() {
    if (isPhoneNumberValid()) {
        window.signingIn = true;
        updateSignInButtonUI();
        var phoneNumber = getPhoneNumberFromUserInput();
        noDocs();
    }
}

function noDocs() {

    window.signingIn = true;
    updateSignInButtonUI();
    var phoneNumber = getPhoneNumberFromUserInput();
    var appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(function (confirmationResult) {
            window.confirmationResult = confirmationResult;
            window.signingIn = false;
            updateSignInButtonUI();
            updateVerificationCodeFormUI();
            updateVerifyCodeButtonUI();
            updateSignInFormUI();
        }).catch(function (error) {
            console.error('Error during Verification', error);
            window.alert('Error during verification:\n\n' + error.code + '\n\n' + error.message);
            window.signingIn = false;
            updateSignInFormUI();
            updateSignInButtonUI();
        });
}

function onVerifyCodeSubmit(e) {
    e.preventDefault();
    if (!!getCodeFromUserInput()) {
        window.verifyingCode = true;
        updateVerifyCodeButtonUI();
        var code = getCodeFromUserInput();
        confirmationResult.confirm(code).then(function (result) {
            window.verifyingCode = false;
            window.confirmationResult = null;
            updateVerificationCodeFormUI();

        }).catch(function (error) {
            console.error('Error while checking the verification code', error);
            window.alert('Error Occured:\n\n' +
                error.code + '\n' + error.message);
            window.verifyingCode = false;
            updateSignInButtonUI();
            updateVerifyCodeButtonUI();
        });
    }
}

function cancelVerification(e) {
    e.preventDefault();
    window.confirmationResult = null;
    updateVerificationCodeFormUI();
    updateSignInFormUI();
}

function onSignOutClick() {
    firebase.auth().signOut();
}

function getCodeFromUserInput() {
    return document.getElementById('verification-code').value;
}

function getPhoneNumberFromUserInput() {
    var tpn = document.getElementById('phone-number').value;
    var rpn = '+91' + tpn;
    return rpn;
}

function isPhoneNumberValid() {
    var pattern = /^\+[0-9\s\-\(\)]+$/;
    var phoneNumber = getPhoneNumberFromUserInput();
    return phoneNumber.search(pattern) !== -1;
}

function resetReCaptcha() {
    if (typeof grecaptcha !== 'undefined' &&
        typeof window.recaptchaWidgetId !== 'undefined') {
        grecaptcha.reset(window.recaptchaWidgetId);
    }
}

function updateSignInButtonUI() {
    document.getElementById('sign-in-button').disabled = !isPhoneNumberValid() ||
        !!window.signingIn;
}

function updateVerifyCodeButtonUI() {
    document.getElementById('verify-code-button').disabled = !!window.verifyingCode ||
        !getCodeFromUserInput();
}

function updateSignInFormUI() {
    if (firebase.auth().currentUser || window.confirmationResult) {
        document.getElementById('sign-in-form').style.display = 'none';
    } else {
        resetReCaptcha();
        document.getElementById('sign-in-form').style.display = 'block';
    }
}

function updateVerificationCodeFormUI() {
    if (!firebase.auth().currentUser && window.confirmationResult) {
        document.getElementById('verification-code-form').style.display = 'block';
    } else {
        document.getElementById('verification-code-form').style.display = 'none';
    }
}

function updateSignOutButtonUI() {
    if (firebase.auth().currentUser) {
        document.getElementById('sign-out-button').style.display = 'block';
    } else {
        document.getElementById('sign-out-button').style.display = 'none';
    }
}
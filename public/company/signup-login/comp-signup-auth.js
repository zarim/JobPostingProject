const firebaseConfig = {
  apiKey: "AIzaSyBxsWriEmR_mauf_P9cycsofF2a1rU0i7g",
  authDomain: "glassceilingswe.firebaseapp.com",
  databaseURL: "https://glassceilingswe.firebaseio.com",
  projectId: "glassceilingswe",
  storageBucket: "glassceilingswe.appspot.com",
  messagingSenderId: "318857051230",
  appId: "1:318857051230:web:e8079bd12eb4d37a4dc8cf",
  measurementId: "G-LEHC8NNE1X"
};
firebase.initializeApp(firebaseConfig);
var db  = firebase.firestore();

 
/**
 * Handles the sign up button press.
 */
function handleSignUp() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  if (email.length < 4) {
    alert('Please enter an email address.');
    return;
  }
  if (password.length < 4) {
    alert('Please enter a password.');
    return;
  }
  // Sign in with email and pass.
  // [START createwithemail]
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode == 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
    // [END_EXCLUDE]
  });
  // [END createwithemail]
  sendEmailVerification();
} 
/**
 * Sends an email verification to the user.
 */
function sendEmailVerification() {
  // [START sendemailverification]
  firebase.auth().currentUser.sendEmailVerification().then(function() {
    // Email Verification sent!
    // [START_EXCLUDE]
    alert('Email Verification Sent!');

    companyCheck();
    

    // [END_EXCLUDE]
  });
  // [END sendemailverification]
}

// this is where we check to see if the company is already in the system
function companyCheck(){

  var compName = document.getElementById('company').value;

  var compRef = db.collection("CompanyProfiles").doc(compName);

  compRef.get().then(function(doc) {
    if (doc.exists) {
        
        console.log("Document data:", doc.CompID, " => ", doc.data());
        alert("Your Company already exsist within our system. Your Company ID is, " + doc.CompID)
        //redirect to landing page where their logged in
        top.location.href = "../hiring-landing/landingLoggedIn.html"; 

    } else{

      var CompID = Math.round(Math.random() * 3000)
      console.log(CompID);
  
      alert('WRITE THIS DOWN, Your Company ID is ' + CompID );
      top.location.href = "../company-profile/company.html"; 

      }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });

    
  }



function sendPasswordReset() {
  var email = document.getElementById('email').value;
  // [START sendpasswordemail]
  firebase. auth().sendPasswordResetEmail(email).then(function() {
    // Password Reset Email Sent!
    // [START_EXCLUDE]
    alert('Password Reset Email Sent!');
    // [END_EXCLUDE]
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode == 'auth/invalid-email') {
      alert(errorMessage);
    } else if (errorCode == 'auth/user-not-found') {
      alert(errorMessage);
    }
    console.log(error);
    // [END_EXCLUDE]
  });
  // [END sendpasswordemail];
}

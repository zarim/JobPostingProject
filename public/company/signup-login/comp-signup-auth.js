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
  //var user = firebase.auth().currentUser;

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
  sendEmail();
} 
/**
 * Sends an email verification to the user.
 */
function sendEmail() {
  // [START sendemailverification]
  var user = firebase.auth().currentUser;

  user.sendEmailVerification().then(function() {

   // Email Verification sent!
    // [START_EXCLUDE]
    alert('Email Verification Sent!');

    companyCheck(); 
  // Email sent.
    }).catch(function(error) {
  // An error happened.
    });
}


// this is where we check to see if the company is already in the system
function companyCheck(){

  var compName = document.getElementById('company').value;

  //var compRef = db.collection("CompanyProfiles").doc(compName);

  // This points to the collection called 'cities'
  var documentSnapshot = db.collection('CompanyProfiles').doc(compName);

  documentSnapshot.get().then(function(documentSnapshot){
    if (documentSnapshot.exists) {
      // do something with the data
      var data = documentSnapshot.data();
      console.log(data);

      var id = documentSnapshot.get("CompID");

      alert("Your Company already exsist within our system! Your Company ID is, " + id)
      alert("Please sign in")
      top.location.href = "signup-login.html"; 
      /*create a collection and document reference for profiles
      const docRef = db.collection("CompStatus").doc(email);
      console.log("the references was created");

      docRef.set({
          CompStatus: true

      })*/

      //redirect to landing page where their logged in
      //top.location.href = "../hiring-landing/landingLoggedIn.html"; 

    } else {

      var CompID = Math.round(Math.random() * 3000)
      console.log(CompID);
  
      alert('WRITE THIS DOWN, Your Company ID is ' + CompID );
      top.location.href = "../company-profile/company.html"; 

      }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
  }
    




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
  
  /*
       * initApp handles setting up UI event listeners and registering Firebase auth listeners:
       *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
       *    out, and that is where we update the UI.
       */
      function initApp() {
        // Listening for auth state changes.
        // [START authstatelistener]
        firebase.auth().onAuthStateChanged(function(user) {
          // [START_EXCLUDE silent]
          document.getElementById('quickstart-verify-email').disabled = true;
          // [END_EXCLUDE]
          if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            // [START_EXCLUDE]
            document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
            document.getElementById('quickstart-sign-in').textContent = 'Sign out';
            document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
            if (!emailVerified) {
              document.getElementById('quickstart-verify-email').disabled = false;
            }
            // [END_EXCLUDE]
          } else {
            // User is signed out.
            // [START_EXCLUDE]
            document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
            document.getElementById('quickstart-sign-in').textContent = 'Sign in';
            document.getElementById('quickstart-account-details').textContent = 'null';
            // [END_EXCLUDE]
          }
          // [START_EXCLUDE silent]
          document.getElementById('quickstart-sign-in').disabled = false;
          // [END_EXCLUDE]
        });
        // [END authstatelistener]
        document.getElementById('quickstart-sign-in').addEventListener("DOMContentLoaded", 'click', toggleSignIn, false);
        document.getElementById('sign-up-button').addEventListener("DOMContentLoaded", 'click', handleSignUp, false);
        document.getElementById('email').addEventListener("DOMContentLoaded", 'click', sendEmailVerification, false);
        document.getElementById('quickstart-password-reset').addEventListener("DOMContentLoaded", 'click', sendPasswordReset, false);
      }

      window.onload = function() {
        initApp();
      };

 

      
import { initializeApp } from "firebase";


var firebaseConfig = {
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



/*<script src="https://www.gstatic.com/firebasejs/7.2.3/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.2.3/firebase-firestore.js"></script>*/

/*const firebase = require("firebase");
        // Required for side-effects
        require("firebase/firestore");*/






// Initialize Cloud Firestore through Firebase
/*firebase.initializeApp({
    apiKey: 'AIzaSyBxsWriEmR_mauf_P9cycsofF2a1rU0i7g',
    authDomain: 'glassceilingswe.firebaseapp.com',
    projectId: 'glassceilingswe'
  });
  
  var db = firebase.firestore();

// database functions


db.collection("CompanyProfile").doc("4001").set({
    Benefits: " ",
    Bias_Training: false,

    Company_Name: " Google",
    Fun_Facts: " We like to laugh"
})
.then(function() {
    console.log("Document successfully written!");
})
.catch(function(error) {
    console.error("Error writing document: ", error);
});


// Add a new document in collection "cities"
db.collection("cities").doc("LA").set({
    name: "Los Angeles",
    state: "CA",
    country: "USA"
})
.then(function() {
    console.log("Document successfully written!");
})
.catch(function(error) {
    console.error("Error writing document: ", error);
});


db.collection("Test Collection").add({
    first: "Test 1",
    last: "Test 2",
    born: 1881
})
.then(function(docRef){
    console.log("Document writeen with ID: ", docRef.id);
})
.catch(function(error){
    console.error("Error adding document: ", error);
});

/* Add a second document with a generated ID.
db.collection("users").add({
    first: "Alan",
    middle: "Mathison",
    last: "Turing",
    born: 1912
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});*/



/*db.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });
});*/
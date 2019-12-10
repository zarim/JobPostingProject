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

/* Functio to populate the candidates from data in the database */
function populateCandidates() {
     //initialize the variables for the context and compile data, 
    var context;
    var compileData;
    //set theScriptHTML to the inneerHTML of the candidate-card div
    var theScriptHTML = document.getElementById("candidate-card").innerHTML;
    //create a template by compiling the script with handlebars
    var theTemplate = Handlebars.compile(theScriptHTML);

    //get a snapshot of the candidate-card database collection
    const candidateSnapshot = db.collection("candidate-card").get();
    //loop through each element in the collection
    candidateSnapshot.then(function(snap) {
        snap.forEach(function(doc) {
            //create a context by assigning the id names from the html to the value at each field in the database
            context = {"name" : doc.data().name, "location" : doc.data().location, "skills" : doc.data().skills};
            //compile the context using the template
            compileData = theTemplate(context);
            //create a new div element
            var template = document.createElement("div");
            //set the id of the element to be candidate-card
            template.setAttribute("id", "candidate-card");
            //set the class of the element to be card
            template.setAttribute("class", "card");
            //set the innerHTML of the created template to be the compileData
            template.innerHTML = compileData;
            //append the template to the results-side div
            document.body.appendChild(template);
        });
    });
}

/* Function to navigate to the expanded results once the user clicks a card */
function navigate() {
    top.location.href="../expanded-candidate-results/expanded-candidates.html";
}
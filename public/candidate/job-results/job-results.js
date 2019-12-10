//given firebase config file
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
//initialize the firebase app
firebase.initializeApp(firebaseConfig);

//set the db variable to the firestore database
var db  = firebase.firestore();

/* Function to populate jobs */
function populateJobs() {
    //initialize context and compile data variable
    var context;
    var compileData;
    //set the script html to the job-card elements
    var theScriptHTML = document.getElementById("job-card").innerHTML;
    //set the template to the handlebars compile of theScriptHTML
    var theTemplate = Handlebars.compile(theScriptHTML);

    //get a snapshot of the add-job-role colletion in the database
    const candidateSnapshot = db.collection("add-job-role").get();
    //loop through each element in the snapshot
    candidateSnapshot.then(function(snap) {
        snap.forEach(function(doc) {
            //create a context by assigning the id names from the html to the value at each field in the database
            context = {"role" : doc.data().role, "company" : doc.data().company, "location" : doc.data().location};
            //compile the context using the template
            compileData = theTemplate(context);
            //create a new div element
            var template = document.createElement("div")
            //set the id of the element to be job-card
            template.setAttribute("id", "job-card");
            //set the class of the element to be card
            template.setAttribute("class", "card");
            //set the innerHTML of the created template to be the compileData
            template.innerHTML = compileData;
            //append the template to the results-side div
            document.body.appendChild(template);
        });
    });
}

/* Function to navigate to expanded jobs */
function navigate() {
    //set the top to be the expanded jobs html
    top.location.href="../expanded-job-results/expanded-jobs.html";
}
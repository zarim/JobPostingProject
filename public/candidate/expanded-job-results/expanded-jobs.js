//firebase config file provided by firebase
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
//initialize the firebase app using the config
firebase.initializeApp(firebaseConfig);

//set db variable to be the firestore database
var db  = firebase.firestore();

/* Function to get the first key from the database before the page completely loads */
function getData() {
    //take a snapshot of the database
    db.collection("add-job-role").onSnapshot(function(doc) {
        //set a global key variable to the id of the first element in the doc
        window.key = doc.docs[0].id;
    });
}

/* Function to change the display and style of the block when each tab is clicked */
function openTab(tabName) {
    //initialize variables
    var i, x;
    //set x to a collection of the containerTabs
    x = document.getElementsByClassName("containerTab");
    //iterate through the collection and hide the elements
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    //display the selected tab (passed in)
    document.getElementById(tabName).style.display = "block";
    //reset the global ref variable
    window.ref = db.collection("add-job-role").doc(window.key);
}

/* Function to assign the key (unique id of each doc in the collection) */
function assignKey(i, id) {
    //set variable x to a collection of the side-result classes
    x = document.getElementsByClassName("side-result");
    //create a new attribute for the selected card called index and set it to the passed in id
    x[i].setAttribute('index', id);
    //reassign the window key to the set index attribute
    window.key = x[i].getAttribute('index');
    //reset the global ref variable
    window.ref = db.collection("add-job-role").doc(window.key);
}

/* Function to return the assigned key */
function getKey(i) {
    //set a var x to a collection of the side-result classes
    x = document.getElementsByClassName("side-result");
    //return the value of the index attribute for the selected card
    return x[i].getAttribute('index');
}

/* Function to figure out which card is clicked */
function getId(event) {
    //set var x to the side-result classes
    var x = document.getElementsByClassName("side-result");
    //initialize an empty array to hold the ids
    var ids = new Array();
    
    //create a snapshot of the data in the database
    const candidateSnapshot = db.collection("add-job-role").get();
    //loop through each document in the collection
    candidateSnapshot.then(function(snap) {
        snap.forEach(function(doc) {
            //push the doc id to the ids array
            ids.push(doc.id);
        });
    });

    //function figures out which card has been clicked
    for (var j = 0; j < x.length; j++) {
        (function(index){
            //when a card is clicked
            x[j].onclick = function(){
                //call the assignKey function and pass in the index and the respective id from the ids array
                assignKey(index, ids[index-1], event);
                //set global key to the value that getKey returns when the index is passed in
                window.key = getKey(index);
                //set the ref variable
                window.ref = db.collection("add-job-role").doc(window.key);
            }
        })(j);
    }
}

/* Function to populate the results of the database and append it to the html */
function populateResults() {
    //initialize the variables for the context, compile data, and ids array
    var context;
    var compileData;
    var ids = new Array();
    //set theScriptHTML to the inneerHTML of the side-result div
    var theScriptHTML = document.getElementById("side-result").innerHTML;
    //create a template by compiling the script with handlebars
    var theTemplate = Handlebars.compile(theScriptHTML);

    //get a snapshot of the database collection
    const candidateSnapshot = db.collection("add-job-role").get();
    //loop through each element in the collection
    candidateSnapshot.then(function(snap) {
        snap.forEach(function(doc) {
            //push the id
            ids.push(doc.id);
            //create a context by assigning the id names from the html to the value at each field in the database
            context = {"role" : doc.data().role, "company" : doc.data().company, "location" : doc.data().location};
            //compile the context using the template
            compileData = theTemplate(context);
            //create a new div element
            var template = document.createElement("div");
            //set the id of the element to be side-result
            template.setAttribute("id", "side-result");
            //set the class of the element to be side-result
            template.setAttribute("class", "side-result");
            //set the innerHTML of the created template to be the compileData
            template.innerHTML = compileData;
            //append the template to the results-side div
            document.getElementById("results-side").appendChild(template);
        });
    });
}

/* Function to change the underline of the selected tab */
function underLine(element) {
    //initialize variables
    var i, x;
    //set x to be a collection of the c class items
    x = document.getElementsByClassName("c");

    //iterate through the collection removing all the text decoration
    for (i = 0; i < x.length; i++) {
      x[i].style.textDecoration = "none";
    }

    //if an element is underlined
    if (element.style.textDecoration == "underline") {
        //then remove the underline
        element.style.textDecoration = "none";
    } else {
        //if not, then add the underline
        element.style.textDecoration = "underline";
    }
}

/* Function to fill the description of the selected card with the expanded content */
function fillDescription() {
    //set the global ref to the UserProfiles collection and get the document using the global window.key 
    window.ref = db.collection("add-job-role").doc(window.key).get();
    //then set the textContent at each id to the data from the database
    window.ref.then(function(doc) {
        document.getElementById("job").textContent = doc.data().description;
        document.getElementById("comp").textContent = doc.data().company;
        document.getElementById("salary").textContent = doc.data().salaryRange;
        document.getElementById("diversity").textContent = doc.data().diversity;
        //document.getElementById("reviews").textContent = doc.data().reviews;
        document.getElementById("benefits").textContent = doc.data().benefits;
    });
}

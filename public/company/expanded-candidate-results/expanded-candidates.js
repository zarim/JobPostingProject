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

function getData() {
    db.collection("UserProfiles").onSnapshot(function(doc) {
        window.key = doc.docs[0].id;
    });
}

function openTab(tabName) {
    var i, x;
    x = document.getElementsByClassName("containerTab");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    document.getElementById(tabName).style.display = "block";
    window.ref = db.collection("UserProfiles").doc(window.key);
}

function assignKey(i, id) {
    x = document.getElementsByClassName("side-result");
    x[i].setAttribute('index', id);
    window.key = x[i].getAttribute('index');
    window.ref = db.collection("UserProfiles").doc(window.key);
}

function getKey(i) {
    x = document.getElementsByClassName("side-result");
    return x[i].getAttribute('index');
}

function getId(event) {
    var x = document.getElementsByClassName("side-result");
    var ids = new Array();
    
    const candidateSnapshot = db.collection("UserProfiles").get();
    candidateSnapshot.then(function(snap) {
        snap.forEach(function(doc) {
            ids.push(doc.id);
        });
    });

    for (var j = 0; j < x.length; j++) {
        (function(index){
            x[j].onclick = function(){
                assignKey(index, ids[index-1], event);
                window.key = getKey(index);
                window.ref = db.collection("UserProfiles").doc(window.key);
            }
        })(j);
    }
}

function populateResults() {
    var context;
    var compileData;
    var ids = new Array();
    var theScriptHTML = document.getElementById("side-result").innerHTML;
    var theTemplate = Handlebars.compile(theScriptHTML);

    const candidateSnapshot = db.collection("UserProfiles").get();
    candidateSnapshot.then(function(snap) {
        snap.forEach(function(doc) {
            ids.push(doc.id);
            context = {"name" : doc.data().userName, "education" : doc.data().Education, "location" : doc.data().Location};
            compileData = theTemplate(context);
            var template = document.createElement("div");
            template.setAttribute("id", "side-result");
            template.setAttribute("class", "side-result");
            template.innerHTML = compileData;
            document.getElementById("results-side").appendChild(template);
        });
    });
}

function underLine(element) {
    var i, x;
    x = document.getElementsByClassName("c");

    for (i = 0; i < x.length; i++) {
      x[i].style.textDecoration = "none";
    }

    if (element.style.textDecoration == "underline") {
        element.style.textDecoration = "none";
    } else {
        element.style.textDecoration = "underline";
    }
}

function fillDescription() {
    window.ref = db.collection("UserProfiles").doc(window.key).get();
    window.ref.then(function(doc) {
        document.getElementById("name1").textContent = doc.data().userName;
        document.getElementById("location1").textContent = doc.data().Location;
        document.getElementById("education1").textContent = doc.data().Education;
        document.getElementById("website").textContent = doc.data().Website_URL;
        document.getElementById("email").textContent = doc.data().Email;
        document.getElementById("organizations").textContent = doc.data().Affiliations;
        document.getElementById("linkedin").textContent = doc.data().LinkedIn_URL;
    });
}

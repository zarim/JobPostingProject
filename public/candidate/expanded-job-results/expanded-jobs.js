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
    db.collection("add-job-role").onSnapshot(function(doc) {
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
    window.ref = db.collection("add-job-role").doc(window.key);
}

function assignKey(i, id) {
    x = document.getElementsByClassName("side-result");
    x[i].setAttribute('index', id);
    window.key = x[i].getAttribute('index');
    window.ref = db.collection("add-job-role").doc(window.key);
}

function getKey(i) {
    x = document.getElementsByClassName("side-result");
    return x[i].getAttribute('index');
}

function getId(event) {
    var x = document.getElementsByClassName("side-result");
    var ids = new Array();
    
    const candidateSnapshot = db.collection("add-job-role").get();
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
                window.ref = db.collection("add-job-role").doc(window.key);
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

    const candidateSnapshot = db.collection("add-job-role").get();
    candidateSnapshot.then(function(snap) {
        snap.forEach(function(doc) {
            ids.push(doc.id);
            context = {"role" : doc.data().role, "company" : doc.data().company, "location" : doc.data().location};
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
    window.ref = db.collection("add-job-role").doc(window.key).get();
    window.ref.then(function(doc) {
        document.getElementById("job").textContent = doc.data().description;
        document.getElementById("comp").textContent = doc.data().comp;
        document.getElementById("salary").textContent = doc.data().salaryRange;
        document.getElementById("diversity").textContent = doc.data().diversity;
        document.getElementById("reviews").textContent = doc.data().reviews;
        document.getElementById("benefits").textContent = doc.data().benefits;
    });
}

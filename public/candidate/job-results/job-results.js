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

function populateJobs() {
    var context;
    var compileData;
    var theScriptHTML = document.getElementById("job-card").innerHTML;
    var theTemplate = Handlebars.compile(theScriptHTML);

    const candidateSnapshot = db.collection("job-card").get();
    candidateSnapshot.then(function(snap) {
        snap.forEach(function(doc) {
            context = {"role" : doc.data().role, "company" : doc.data().company, "location" : doc.data().location};
            compileData = theTemplate(context);
            var template = document.createElement("div")
            template.setAttribute("id", "job-card");
            template.setAttribute("class", "card");
            template.innerHTML = compileData;
            document.body.appendChild(template);
            console.log(context);
            console.log(compileData);
        });
    });
    // var context;
    // var compileData;
    // var theScriptHTML = document.getElementById("candidate-card").innerHTML;
    // var theTemplate = Handlebars.compile(theScriptHTML);

    // const candidateSnapshot = db.collection("candidate-card").get();
    // candidateSnapshot.then(function(snap) {
    //     snap.forEach(function(doc) {
    //         context = {"name" : doc.data().name, "location" : doc.data().location, "skills" : doc.data().skills};
    //         compileData = theTemplate(context);
    //         var template = document.createElement("div")
    //         template.setAttribute("id", "candidate-card");
    //         template.setAttribute("class", "card");
    //         template.innerHTML = compileData;
    //         document.body.appendChild(template);
    //         console.log(context);
    //         console.log(compileData);
    //     });
    // });
}
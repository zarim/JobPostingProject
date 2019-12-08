const algoliasearch = require('algoliasearch');
const dotenv = require('dotenv');
const firebase = require('firebase');

// load values from the .env file in this directory into process.env
dotenv.config();

// configure firebase
firebase.initializeApp({
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});
const database = firebase.database();

// configure algolia
const algolia = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
);
const index = algolia.initIndex(process.env.ALGOLIA_INDEX_NAME);


// Synchronize automatically
// Get all jobs from Firebase
const jobsRef = database.ref('/Job-Posts');
jobsRef.on('child_added', addOrUpdateIndexRecord);
jobsRef.on('child_changed', addOrUpdateIndexRecord);
jobsRef.on('child_removed', deleteIndexRecord);

function addOrUpdateIndexRecord(job) {
  // Get Firebase object
  const record = job.val();
  // Specify Algolia's objectID using the Firebase object key
  record.objectID = job.key;
  // Add or update object
  index
    .saveObject(record)
    .then(() => {
      console.log('Firebase object indexed in Algolia', record.objectID);
    })
    .catch(error => {
      console.error('Error when indexing job into Algolia', error);
      process.exit(1);
    });
}

function deleteIndexRecord({key}) {
  // Get Algolia's objectID from the Firebase object key
  const objectID = key;
  // Remove the object from Algolia
  index
    .deleteObject(objectID)
    .then(() => {
      console.log('Firebase object deleted from Algolia', objectID);
    })
    .catch(error => {
      console.error('Error when deleting job from Algolia', error);
      process.exit(1);
    });
}

/*
// Import all needed modules.
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as algoliasearch from 'algoliasearch';

// Set up Firestore.
admin.initializeApp();
const db = admin.firestore();

// Set up Algolia.
// The app id and API key are coming from the cloud functions environment, as we set up in Part 1, Step 3.
const algoliaClient = algoliasearch(functions.config().algolia.appid, functions.config().algolia.apikey);
// Since I'm using develop and production environments, I'm automatically defining 
// the index name according to which environment is running. functions.config().projectId is a default 
// property set by Cloud Functions.
const collectionIndexName = functions.config().projectId === 'GlassCeilingSWE' ? 'jobs';
const collectionIndex = algoliaClient.initIndex(collectionIndexName);

// Create a HTTP request cloud function.
export const sendCollectionToAlgolia = functions.https.onRequest(async (req, res) => {

	// This array will contain all records to be indexed in Algolia.
	// A record does not need to necessarily contain all properties of the Firestore document,
	// only the relevant ones. 
	const algoliaRecords : any[] = [];

	// Retrieve all documents from the COLLECTION collection.
	const querySnapshot = await db.collection('Job-Posts').get();

	querySnapshot.docs.forEach(doc => {
		const document = doc.data();
        // Essentially, you want your records to contain any information that facilitates search, 
        // display, filtering, or relevance. Otherwise, you can leave it out.
        const record = {
            objectID: doc.id,
            CompanyName: document.CompanyName,
			Experience_Level: document.Experience_Level,
			Job_Type: document.Job_Type,
			Location: document.Location,
			Salary: document.Salary
        };

        algoliaRecords.push(record);
    });
	
	// After all records are created, we save them to 
	collectionIndex.saveObjects(algoliaRecords, (_error: any, content: any) => {
        res.status(200).send("COLLECTION was indexed to Algolia successfully.");
    });
	
})

export const collectionOnCreate = functions.firestore.document('Job-Posts/{uid}').onCreate(async (snapshot, context) => {
    await saveDocumentInAlgolia(snapshot);
});

export const collectionOnUpdate = functions.firestore.document('Job-Posts/{uid}').onUpdate(async (change, context) => {
    await updateDocumentInAlgolia(change);
});

export const collectionOnDelete = functions.firestore.document('Job-Posts/{uid}').onDelete(async (snapshot, context) => {
    await deleteDocumentFromAlgolia(snapshot);
});


async function saveDocumentInAlgolia(snapshot: any) {
    if (snapshot.exists) {
        const record = snapshot.data();
        if (record) { // Removes the possibility of snapshot.data() being undefined.
            if (record.isIncomplete === false) { // We only index products that are complete.
                record.objectID = snapshot.id;
                
                // In this example, we are including all properties of the Firestore document 
                // in the Algolia record, but do remember to evaluate if they are all necessary.
                // More on that in Part 2, Step 2 above.
                
                await collectionIndex.saveObject(record); // Adds or replaces a specific object.
            }
        }
    }
}

async function updateDocumentInAlgolia(change: functions.Change<FirebaseFirestore.DocumentSnapshot>) {
    const docBeforeChange = change.before.data()
    const docAfterChange = change.after.data()
    if (docBeforeChange && docAfterChange) {
        if (docAfterChange.isIncomplete && !docBeforeChange.isIncomplete) {
            // If the doc was COMPLETE and is now INCOMPLETE, it was 
            // previously indexed in algolia and must now be removed.
            await deleteDocumentFromAlgolia(change.after);
        } else if (docAfterChange.isIncomplete === false) {
            await saveDocumentInAlgolia(change.after);
        }
    }
}

async function deleteDocumentFromAlgolia(snapshot: FirebaseFirestore.DocumentSnapshot) {
    if (snapshot.exists) {
        const objectID = snapshot.id;
        await collectionIndex.deleteObject(objectID);
    }
}
*/
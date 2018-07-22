var admin = require("firebase-admin");
const { config, fbConfig } = require('./config')
// fbcondigにfirebaseのキーが入っています。
// fbConfig.apiKey みたいな感じで使ってください


// Fetch the service account key JSON file contents
var serviceAccount = require("./serviceAccountKey.json");

// Initialize the app with a custom auth variable, limiting the server's access
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: fbConfig.databaseURL, //databaseURL: "https://databaseName.firebaseio.com",
  databaseAuthVariableOverride: {
    uid: "my-service-worker"
  }
});

// The app only has access as defined in the Security Rules
var db = admin.database();
var ref = db.ref("/some_resource");
ref.once("value", function(snapshot) {
  console.log(snapshot.val());
});

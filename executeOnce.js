// Import Admin SDK
var admin = require("firebase-admin");
const { config, fbConfig } = require('./config')

// Fetch the service account key JSON file contents
var serviceAccount = require("./serviceAccountKey.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: fbConfig.databaseURL
});

// Get a database reference to our blog
var db = admin.database();
var ref = db.ref()
var postsRef = ref.child("building");

var newPostRef = postsRef.push();
newPostRef.set({
  postalCode: "020-0621",
  name: "サニービレッジ大崎1号棟"
});

var usersRef = newPostRef.child("users");

var id_arr = ["Ue9be7d34adeb405b6b72bb9eaae54ed5","U63c058162d05804244b4f03020f44685","U5d22290c5e200c362492a902579b44d7","Ud4344be2592a58b2b692625f69003436"]
for(let id of id_arr) {
  var newUserRef = usersRef.push();
  newUserRef.set({
    id: id
  })
}
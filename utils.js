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

async function promise () {
  return new Promise(function(resolve, reject) {
      ref.once("value", function(data) {
          resolve(data)
      });
  })
}

async function isExistDatabase(postCode, buildingName) {
  const data = await promise();
  var buildings = data.val().building
  return await Object.keys(buildings).some(function (key) {
      return (buildings[key]["postalCode"] == postCode && buildings[key]["name"] == buildingName)
  });
}

async function isExistDatabaseAsyc () {
  const a = await isExistDatabase(postCode, buildingName);
  return a
}


module.exports.isExistDatabaseAsyc = isExistDatabaseAsyc()

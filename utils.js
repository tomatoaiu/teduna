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
  let res = { exist: false, key: "" };
  await Object.keys(buildings).forEach(function (key) {
      if (buildings[key]["postalCode"] === postCode && buildings[key]["name"] === buildingName) {
        res =  { exist: true, key: key }
      }
  });
  return res
}

async function isExistDatabaseAsyc (postCode, buildingName) {
  const a = await isExistDatabase(postCode, buildingName);
  return a
}

function appendUser(user_id, building_id){
    var usersRef = ref.child(`buiding/${building_id}/users`)
    usersRef.push({
        id: user_id
    })
}

function createBuilding(user_id, postal_code, name) {
    var postsRef = ref.child("building");

    var newPostRef = postsRef.push();
    newPostRef.set({
        postalCode: postal_code,
        name: name
    });

    var usersRef = newPostRef.child("users");

    usersRef.push({id: user_id});
}

module.exports.isExistDatabaseAsyc = isExistDatabaseAsyc
module.exports.appendUser = appendUser
module.exports.createBuilding = createBuilding
var HueApi = require("node-hue-api").HueApi;

var displayUserResult = function(result) {
  console.log("Created user: " + JSON.stringify(result));
};

var displayError = function(err) {
  console.log(err);
};

var hue = new HueApi();

// --------------------------
// Using a promise
hue.registerUser(process.env.HUE_HOST, 'New User', '...')
  .then(displayUserResult)
  .fail(displayError)
  .done();

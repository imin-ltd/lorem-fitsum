var request = require('sync-request');

var schemes = {
  "activity-list": getScheme("https://www.openactive.io/activity-list/activity-list.jsonld"),
  "accessibility-support": getScheme("https://www.openactive.io/accessibility-support/accessibility-support.jsonld"),
  "special-requirements": getScheme("http://data.emduk.org/special-requirements/special-requirements.jsonld")
}

function getScheme(schemeUrl) {
  console.log("Downloading: " + schemeUrl);
  var response = request('GET', schemeUrl, { headers: { accept: 'application/ld+json' } });
  if (response && response.statusCode == 200) {
    var body = JSON.parse(response.getBody('utf8'));
    return body["concept"] && body["id"] && body["type"] === "ConceptScheme" ? body : undefined;
  } else {
    throw "Invalid scheme specified: " + schemeUrl;
  }
}

module.exports = schemes;
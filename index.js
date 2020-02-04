//  Import express package
const express = require('express');

// Express version 4 and above require extra middle-ware to handle a POST request.
const bodyParser = require('body-parser'); 

// Create an instance 
const app = express();
const port = 8080;

const dns = [
    {
        first: 'Monique',
        last: 'Leyrac',
        sin: '960406361',
    },
    {
        first: 'Nicole',
        last: 'Martin',
        sin: '799288378',
    },
    {
        first: 'Leon',
        last: 'Redbone',
        sin: '360954739',
    },
];
  
  const dni = [
    {
        first: 'TotoFirstName',
        last: 'TotoFamilyName',
        sin: '111222333',
    }
];
  
// POST Parameters
// To get POST parameters, we'll need two the ExpressJS body-parser package
app.use(bodyParser.raw());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', (req, res) => res.send('Death Notification...'))

//
// GET is used to request data from a specified resource.
//

// A GET response to the /dn page 
// https://dn-api.azurewebsites.net/dn
// curl -X GET http://localhost:3000/dn
// curl -X GET https://dn-demo-api.azurewebsites.net/dn
app.get('/dn', function (req, res) {
    //console.log(dns.length);
    res.json(dns);
})

// A GET response to the /dn/i page 
// https://dn-api.azurewebsites.net/dn/2
// curl -X GET http://localhost:3000/dn/2
// curl -X GET https://dn-demo-api.azurewebsites.net/dn/2

app.get('/dn/:dnNumber', function(req, res, next) {
    var dnNumber = req.params.dnNumber;
      var dn = dns[dnNumber];
      res.json(dn);
});

//
// POST is used to send data to a server to create/update a resource.
//

// A POST response to the /dn page 
// https://dn-api.azurewebsites.net/dn
// curl -X POST http://localhost:3000/dn
// curl -X POST https://dn-demo-api.azurewebsites.net/dn
app.post('/dn', function (req, res) {
    res.json(dns);
});
  
// A POST response to the /dn/i page 
// https://dn-api.azurewebsites.net/dn/10
// curl -d "first=prenom&last=nom&sin=111222333" -X POST http://localhost:3000/dn/2
// curl -d "first=prenom&last=nom&sin=111222333" -X POST https://dn-demo-api.azurewebsites.net/dn/2
app.post('/dn/:dnNumber', function (req, res) {
    //console.log('Got body:', req.body);
    const dnNumber = req.params.dnNumber;
    const first = req.body.first;
    const last = req.body.last;
    const sin = req.body.sin;
    //console.log("Hello " + dns.length);
    var dn = {
      "first": first,
      "last": last,
      "sin": sin
    }
    dns.push(dn);
    //res.send('DN' + dnNumber + ': ' + first + ', ' + last + ', ' + sin + ' has been added into dns.');
    res.json(dns);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

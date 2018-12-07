var CKAN = require('ckan');
var csv = require("fast-csv");
var fs = require('fs');
//add api key
var client = new CKAN.Client('http://demo.ckan.org', '1386e167-3949-46e1-bb13-77cded395a6d');//ad api key


try {

  var _data = [];
  csv
    .fromPath("./Refugis_Muntanya.csv", {
      headers: true,
      delimiter: ','
    })
    .on("data", function(data) {;
      _data.push(data);
	  
	  
	  
	  
	  
    })
    .on("end", function() {
      console.log("done");


/*
      client.action('dataset_create', {
        name: 'refugis-muntanya-vq'
      }, function(err, result) {
        console.log(err);
        console.log(result);
      });

*/
console.info(_data);
 client.action('datastore_create', {
                title: "Refugis_tite",
                name: "Refugis",
                resource: {
                  package_id: 'refugis-muntanya-vq',
                  name: 'Refugis'
                },
                records: _data
              },
              function(err) {
                if (err) console.log(err);
                console.log(err);
              })
 

           


    });



} catch (err) {
console.info("Error");
  console.info(err);
}

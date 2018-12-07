var express = require('express');
var router = express.Router();
var CKAN = require('ckan');
var csv = require("fast-csv");
var fs = require('fs');




/* GET users listing. */
router.get('/', function (req, res, next) {
  var msg = {};
  var client = new CKAN.Client('https://demo.ckan.org/', req.query.key_ckan); //ad api key
  var datasetInfo = {
    name: req.query.name,
    title: req.query.title,
    description: "my dataset",
    resource_id: req.query.resource.package_id,
    resource_name: req.query.resource.name,
    dataset: req.query.records
  }

  console.info(req.query.key_ckan);

  var _data = JSON.parse(datasetInfo.dataset);
  console.info(req.query.name);



  client.action('dataset_show', {
    id: datasetInfo.name
  }, function (err, out) {

    console.info(err);
    if (!err) {

      client.action('dataset_create', datasetInfo, function (err, result) {
        console.log(err);
        //  console.log(result);
        console.log("Update Resource");
        if (result) {
          console.info("Entro");
          console.info(result);
          client.action('datastore_create', {
              title: datasetInfo.title,
              name: datasetInfo.name,
              resource: {
                package_id: datasetInfo.name,
                name: datasetInfo.resource_name
              },
              records: _data
            },
            function (err, result) {
              if (err) {
                console.log(err)
                msg.STATUS = "ERROR";
                msg.MSG = err;
                res.send(msg);
              } else {
                console.log('All done1');
                // console.log(result);
                msg.STATUS = "OK"

                res.send(msg);
              }
            });

        }


      });
    } else {
      client.action('dataset_create', datasetInfo, function (err, result) {
        console.log(err);
        console.log("Nou Resource");
        //  console.log(result);
        if (result) {
          client.action('datastore_create', {
              title: datasetInfo.title,
              name: datasetInfo.name,
              resource: {
                package_id: datasetInfo.name,
                name: datasetInfo.resource_name
              },
              records: _data
            },
            function (err, result) {
              if (err) {
                console.log(err)
                msg.STATUS = "ERROR";
                msg.MSG = err;
                res.send(msg);
              } else {
                console.log('All done2');
                msg.STATUS = "OK"

                res.send(msg);
              }
            });

        }
      });
    }
  });


  //res.send(JSON.stringify(msg));
});


module.exports = router;
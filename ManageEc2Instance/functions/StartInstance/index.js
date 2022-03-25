
var AWS = require('aws-sdk');

async function StartInstance(_ec2,_instanceParams){
  return new Promise(resolve => {
    // Call EC2 to start the selected instances
    _ec2.startInstances(_instanceParams, function(err, data) {
      if (err && err.code === 'DryRunOperation') {
        _instanceParams.DryRun = false;
        _ec2.startInstances(params, function(err, data) {
            if (err) {
              resolve(err);
            } else if (data) {
              resolve(data.StartingInstances);
            }
        });
      } else {
        resolve("You don't have permission to start instances.");
      }
    }); 
  });
}
exports.handler = async (event) => {
    // TODO implement
//AWS.config.update({region: 'ap-southeast-2'});
AWS.config.loadFromPath('./config.json');
// Create EC2 service object
var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});
//console.log(ec2);
var instanceParams = {
  InstanceIds: ['your instance id here'],
  DryRun: true
};
  var ec2Result = await StartInstance(ec2,instanceParams);
    const response = {
        statusCode: 200,
        body: JSON.stringify(ec2Result),
    };
    return response;
};

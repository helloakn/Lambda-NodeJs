
var AWS = require('aws-sdk');

async function SetUpInstance(_ec2,_instanceParams){
  return new Promise(resolve => {
// Create a promise on an EC2 service object
var instancePromise = _ec2.runInstances(_instanceParams).promise();
// Handle promise's fulfilled/rejected states
instancePromise.then(
  function(data) {
    resolve(data);
    var instanceId = data.Instances[0].InstanceId;
   
  }).catch(
    function(err) {
      resolve(err);
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
   ImageId: 'ami-052f61616c3e7659c', 
   InstanceType: 't2.micro',
   KeyName: 'ada-new-svr',
   MinCount: 1,
   MaxCount: 1,
  SubnetId: 'subnet-014b1336b13cd177e',
   TagSpecifications: [
    {
      ResourceType: "instance",
      Tags: [
        {
          Key: "Name",
          Value: "Node SDK EC2 Creation"
        }
      ]
    }
  ]
};
  var ec2Result = await SetUpInstance(ec2,instanceParams);
    const response = {
        statusCode: 200,
        body: JSON.stringify(ec2Result),
    };
    return response;
};

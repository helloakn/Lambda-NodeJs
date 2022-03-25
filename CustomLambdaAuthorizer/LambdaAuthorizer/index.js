
exports.handler = async (event,callback) => {
   
    const allow = {
   "isAuthorized": true,
   "context": {
     "exampleKey": "exampleValue",
     "user":{"id":"1","name":"aung kyaw nyunt","role":"authorizeed person"},
     "event":event
   }
 }
     return allow;
 };
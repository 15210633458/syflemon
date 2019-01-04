var mongodb = require('mongodb');
var url = 'mongodb://localhost:27017';
var mongoClient = mongodb.MongoClient;

function getmongodb(collec, fn) {
    // console.log(collec)
    mongoClient.connect(url, { useNewUrlParser: true }, function(err, con) {
        if (err) {
            return typeof fn == 'function' && ck(err)
        }
        var db = con.db('lemon');
        var collection = db.collection(collec);
        typeof fn == 'function' && fn(null, con, collection)
    })
}
module.exports = {
    getmongodb: getmongodb
};
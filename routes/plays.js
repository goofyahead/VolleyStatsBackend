module.exports = function initialize (params) {

    var db = params.database;
    var ObjectId = require('mongodb').ObjectID;

    module.createPlay = function(req, res) {
        var play = req.body;
        
        db.collection('plays').insert(play, function(err, item) {
            if(! item) {
                res.send(401, { error: 'unauthorized' });
                console.log('unauthorized access');
            } else {
                console.log('saved user');
                res.send("OK");
            }
        });
    }

    module.getPlays = function (req, res) {

        db.collection('plays').find().toArray(function(err, items) {
                console.log(items);
                res.send(items);
        });

    }

    return module;
}
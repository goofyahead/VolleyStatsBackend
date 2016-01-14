module.exports = function initialize (params) {

    var db = params.database;
    var ObjectId = require('mongodb').ObjectID;

    module.createPositions = function(req, res) {
        var positions = req.body;
        delete positions._id;
        
        db.collection('positions').update({teamId: positions.teamId, type: positions.type}, positions, {upsert: true}, function(err, item) {
            if(! item) {
                res.send(401, { error: 'unauthorized' });
                console.log('unauthorized access');
            } else {
                console.log(item);
                console.log('saved positions');
                res.send("OK");
            }
        });
        
    }

    module.getPositions = function (req, res) {

        db.collection('positions').find().toArray(function(err, items) {
                console.log(items);
                res.send(items);
        });

    }

    module.getDefPositions = function (req, res) {
        var teamId = req.params.teamId;

        db.collection('positions').findOne({"teamId" : teamId, type: "DEF"}, function (err, doc) {
            if (err) console.log(err);
            else {
                console.log(doc);
                res.send(doc);
            }
        });
    }

    module.getAtqPositions = function (req, res) {
        var teamId = req.params.teamId;
        
        db.collection('positions').findOne({"teamId" : teamId, type: "ATQ"}, function (err, doc) {
            if (err) console.log(err);
            else {
                console.log(doc);
                res.send(doc);
            }
        });
    }

    return module;
}
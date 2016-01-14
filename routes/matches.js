module.exports = function initialize (params) {

    var db = params.database;
    var ObjectId = require('mongodb').ObjectID;
    var fs = require('fs');

    module.createMatch = function(req, res) {
        var match = req.body;

        db.collection('matches').insert(match, function(err, item) {
            if (err) console.log(err);
            if(! item) {
                res.status(401).body({ error: 'unauthorized' });
                console.log('error creating player ', error);
            } else {
                console.log('saved match', item);
                res.send("OK");
            }
        });
        
    }

    module.getMatchesFromTeam = function (req, res) {
        var teamId = req.params.teamId;

        db.collection('matches').find({teamId: teamId}).toArray(function (err, items) {
            res.send(items);
        });
    }

    module.getCurrentMatch = function (req, res) {
        var teamId = req.params.teamId;

        db.collection('matches').findOne({teamId: teamId, status: "ONGOING"}, function (err, items) {
            res.send(items);
        });
    }

    return module;
}
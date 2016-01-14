module.exports = function initialize (params) {

    var db = params.database;
    var ObjectId = require('mongodb').ObjectID;
    var fs = require('fs');

    module.createTeam = function(req, res) {
        var team = req.body;

        db.collection('teams').insert(team, function(err, item) {
            if(! item) {
                res.send(401, { error: 'unauthorized' });
                console.log('unauthorized access');
            } else {
                console.log('saved user');
                res.send("OK");
            }
        });
        
    }

    module.getTeams = function (req, res) {
        console.log('requested teams');

        db.collection('teams').find().toArray(function(err, items) {
                console.log(items);
                res.send(items);
        });

    }

    module.getTeam = function (req, res) {
        console.log('team info required');
        var id = req.params.id;

        db.collection('teams').findOne({"_id" : new ObjectId(id)}, function (err, doc) {
            if (err) console.log(err);
            else {
                console.log(doc);
                res.send(doc);
            }
        });
    }

    return module;
}
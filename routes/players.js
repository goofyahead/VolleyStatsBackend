module.exports = function initialize (params) {

    var db = params.database;
    var ObjectId = require('mongodb').ObjectID;
    var fs = require('fs');

    module.createPlayer = function(req, res) {
        var fileUploadPath = req && req.files && req.files.picture && req.files.picture.path;
        var player = JSON.parse(req.body.player);
        var playerPic = player.teamId + '_' + player.number + '_' + player.name + '.jpg';
        
        fs.rename(fileUploadPath, './public/images/players/' + playerPic, 
            function (err) { 
                console.log(err);
            }
        );

        player.picture = playerPic;

        db.collection('players').insert(player, function(err, item) {
            if (err) console.log(err);
            if(! item) {
                res.status(401).body({ error: 'unauthorized' });
                console.log('error creating player ', error);
            } else {
                console.log('saved user');
                res.send("OK");
            }
        });
        
    }

    module.getPlayersFromTeam = function (req, res) {
        var teamId = req.params.teamId;

        db.collection('players').find({teamId: teamId}).toArray(function (err, items) {
            res.send(items);
        });
    }

    return module;
}
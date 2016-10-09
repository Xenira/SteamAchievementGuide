var s = require("../steam-session");

module.exports.GetPlayerAchievements = function(req, res) {
    if (!req.params || !req.params.steamid) return res.status(500).json({ success: false, message: 'Arguments missing'});
    var steamid = req.params.steamid;
    s.getPlayerSummaries({
        steamids: [ steamid ],
        callback: function(err, udata) {
            if (err) return res.status(500).json(err);
            if (!udata.response.players[0].gameid) return res.json({success: false, message: 'No game played at the moment', data: udata});

            var gameid = udata.response.players[0].gameid;
            s.getPlayerAchievements({
                gameid: gameid,
                steamid: steamid,
                l: 'en',
                callback: function(err, acdata) {
                    
                    var playerstats = acdata.playerstats;
                    s.getSchemaForGame({
                        appid: gameid,
                        callback: function(err, gsdata) {
                            for (var i = 0; i < playerstats.achievements.length; i++) {
                                var element = playerstats.achievements[i];
                                var gameAcData = gsdata.game.availableGameStats.achievements.find((data) => {
                                    return data.name == element.apiname;
                                });
                                if (gameAcData) {
                                    playerstats.achievements[i].icon = gameAcData.icon;
                                    playerstats.achievements[i].icongray = gameAcData.icongray;
                                    playerstats.achievements[i].hidden = gameAcData.hidden;
                                }
                            }
                            return res.json(playerstats);
                        }
                    });
                }
            });
        }
    });
}
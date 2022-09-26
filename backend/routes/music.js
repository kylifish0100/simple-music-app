var express = require('express');
var musicRouter = express.Router();
var sql = require("mssql");
var dbConfig = require('../database/sqlConfig');
const music = require('../controllers/music');



/* Get all Playlists */
musicRouter.get('/', music.getPlaylist);

/* Get Songs from a Playlist */
musicRouter.get('/:name', music.getSongsFromPL);
//musicRouter.get('/:id/:songid'.music.getOneSong);

/* Add a new Playlist  */
musicRouter.post('/', music.addPlaylist);
musicRouter.post('/:id',music.addSongintoPL);


/* Delete */
musicRouter.delete('/:listname',music.deleteSong);
musicRouter.delete('/', music.deletePlaylist);


/* Edit */
musicRouter.get('/editSong/:ID', function (req, res) {
    sql.connect(dbConfig).then(() => {
        return sql.query("SELECT * FROM MusicBasics WHERE SongID = " + req.params.ID);
    }).then(result => {
        res.send(result.recordset);
    }).catch(err => {
        res.status(500).send("Something Went Wrong");
    })
});

/* Update */
musicRouter.post('/updateSong', function (req, res) {
    sql.connect(dbConfig).then(() => {
        return sql.query("UPDATE MusicBasics SET SongName = '" + req.body.SongName + "', SongType = '" + req.body.SongType + "' WHERE SongID = " + req.body.SongID );
    }).then(result => {
        res.status(200).send("Updated Successfully.");
    }).catch(err => {
        res.status(500).send("Something Went Wrong");
    })
});




module.exports = musicRouter;


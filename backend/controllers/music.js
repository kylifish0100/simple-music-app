const sql = require('mssql');
const config = require('../database/sqlConfig');
require('dotenv').config()
const jwt = require('jsonwebtoken')
//const middleware = require('.utils/middleware')


const  musicCtrl = {};

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
  }

async function getPlaylist(request){
    try {
        const token = getTokenFrom(request)
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
        }
        let pool = await sql.connect(config);
        let allPlist =  await pool.request()
        .input('input_parameter', sql.Int, decodedToken.id)
        .query('SELECT * FROM PlayList WHERE UserID = @input_parameter');
        return allPlist.recordsets;
    } catch (error) {
        console.log(error);
        // SELECT * FROM PlayList WHERE UserID = @userid;
    }
}


async function getPlaylist2(name){
    try {
        let pool = await sql.connect(config);
        let Songs =  await pool.request()
        .input('input_parameter', sql.VarChar(25), name)
        .query('SELECT SongName FROM PlayList WHERE ListName = @input_parameter');
        return Songs.recordsets;
    } catch (error) {
        console.log(error);
    }
}


async function addPlaylist(request) {
    try {
        const token = getTokenFrom(request)
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
        }
        //console.log(decodedToken.id)
        let PlayList = request.body
        let pool  = await sql.connect(config);
        let newPlist = await pool.request()
            //.input('_id',sql.BigInt,PlayList.ListID)
            .input('_list_name', sql.VarChar(25), PlayList.ListName)
            .input('_song_name',sql.VarChar(50), PlayList.SongName)
            .input('_user_id', sql.VarChar(50), decodedToken.id)
            .query('INSERT INTO PlayList(ListName,SongName,UserID) VALUES (@_list_name, @_song_name, @_user_id)');
        return newPlist.recordsets;
    } catch (error) {
        console.log(error);
    }
}


async function addSongintoPL(request) {
    try {
        const token = getTokenFrom(request)
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
        }
        //console.log(decodedToken.id)
        let PlayList = request.body
        let pool  = await sql.connect(config);
        let playlistItem = await pool.request()
            //.input('_id',sql.BigInt,request.params.name)
            .input('_list_name', sql.VarChar(25), PlayList.ListName)
            .input('_song_name',sql.VarChar(50), PlayList.SongName)
            .input('_user_id', sql.VarChar(50), decodedToken.id)
            .query('INSERT INTO PlayList(ListName,SongName,UserID) VALUES (@_list_name, @_song_name, @_user_id)');
        return playlistItem.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function deletePlaylistID(request){
    try {
        const token = getTokenFrom(request)
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
        }
        let pool = await sql.connect(config);
        let playlist =  await pool.request()
            .input('userid', sql.Int, decodedToken.id)
            .input('listname',sql.VarChar,request.body.ListName)
            .query('DELETE FROM PlayList WHERE UserID = @userid AND ListName = @listname');
        return playlist.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function deleteSong(request){
    try {
        const token = getTokenFrom(request)
        const decodedToken = jwt.verify(token, process.env.SECRET)
        //console.log(token,decodedToken.id,request.body.SongName, request.params.listname)
        if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
        }
        let pool = await sql.connect(config);
        let playlist =  await pool.request()
            .input('songname',sql.VarChar, request.body.SongName)
            .input('userid', sql.Int, decodedToken.id)
            .input('listname',sql.VarChar, request.params.listname)
            .query('DELETE FROM PlayList WHERE UserID = @userid AND ListName = @listname AND SongName =@songname');
        return playlist.recordsets;
    } catch (error) {
        console.log(error);
    }
}

musicCtrl.getPlaylist = (req, res) => {
    getPlaylist(req).then( result =>{
        res.json(result[0]);
    });
}

musicCtrl.getSongsFromPL = (req, res) => {
    getPlaylist2(req.params.name).then( result => {
        res.json(result[0]);
    });
}

musicCtrl.addPlaylist = (req, res) => {
    addPlaylist(req).then( result =>{
        res.json({status: 'New playlist Added!', result});
        console.log("Added playlist:", result);
    });
   // console.log();

}

musicCtrl.addSongintoPL = (req, res) => {
    addSongintoPL(req).then(result => {
        res.json({status: 'New song Added!', result});
        console.log("Added Song:", result);
    });
}

musicCtrl.deletePlaylist = (req, res ) => {
    deletePlaylistID(req).then( () => {
        res.json({status: 'Playlist Deleted!'});
    });
}

musicCtrl.deleteSong = (req, res ) => {
    deleteSong(req).then( () => {
        res.json({status: 'Song Deleted!'});
    });
}


module.exports = musicCtrl;
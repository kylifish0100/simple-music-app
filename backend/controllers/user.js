const sql = require('mssql');
const config = require('../database/sqlConfig');
const bcrypt = require('bcrypt');

const  userCtrl = {};

//get function
async function getUsers(){
    try {
        let pool = await sql.connect(config);
        let allusers =  await pool.request().query("SELECT * FROM USERS;");
        return allusers.recordsets;
    } catch (error) {
        console.log(error);
    }
}

//id user function
async function getUserID(id){
    try {
        let pool = await sql.connect(config);
        let user =  await pool.request()
        .input('input_parameter', sql.Int, id)
        .query('SELECT * FROM USERS WHERE UserID = @input_parameter');
        return user.recordsets;
    } catch (error) {
        console.log(error);
    }
}

//add edit user function

async function addUser(user) {
    try {
        const saltRounds = 10
        let passwordHash = await bcrypt.hash(user.password, saltRounds)
        let pool  = await sql.connect(config);
        let insertUser = await pool.request()
            .input('_user_Name', sql.VarChar(25), user.username)
            .input('_passwordHash',sql.Char(100), passwordHash)
            .input('_email', sql.VarChar(50), user.email)
            .input('_profileID', sql.Int, user.Profile_ID)
            .execute('AddUser');
        return insertUser.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function updateUser(user) {
    try {
        const saltRounds = 10
        let passwordHash = await bcrypt.hash(user.body.password, saltRounds)
        let pool  = await sql.connect(config);
        let insertUser = await pool.request()
            .input('_id', sql.Int, user.params.id)
            .input('_user_Name', sql.VarChar(25), user.body.username)
            .input('_passwordHash',sql.Char(100), passwordHash)
            .input('_email', sql.VarChar(50), user.body.email)
            .input('_profileID', sql.Int, user.body.Profile_ID)
            .execute('UpdateUser');
        return insertUser.recordsets;
    } catch (error) {
        console.log(error);
    }
}


//delete function
async function deleteUserID(id){
    try {
        let pool = await sql.connect(config);
        let user =  await pool.request()
        .input('input_parameter', sql.Int, id)
        .query('DELETE FROM USERS WHERE UserID = @input_parameter');
        return user.recordsets;
    } catch (error) {
        console.log(error);
    }
}

//user controllers

userCtrl.getUsers = (req, res) => {
    getUsers().then( result =>{
        res.json(result[0]);
    });
}


userCtrl.getUserID = (req, res ) => {
    getUserID(req.params.id).then( result => {
        res.json(result[0]);
    });
}


userCtrl.addUser = (req, res) => {
    let user = req.body
    addUser(user).then(result =>{
    //addEditUser(req.body.User_ID,req.body.Username,req.body.password,req.body.email,req.body.Profile_ID).then(result =>{
        res.json({status: 'User Added!', result});
        console.log("Added user: ", result);
    });
    console.log(req.body);
}

userCtrl.editUser = (req, res) => {
    let user ={... req.body};
    //getUserID(req.params.id); //把这个函数的返回结果插到forms?
    updateUser(req).then(result =>{
        res.json({status: 'User Updated!', result});
        console.log("Edited user: ", result);
    });
    console.log(user);
}

userCtrl.deleteUser = (req, res ) => {
    deleteUserID(req.params.id).then( () => {
        res.json({status: 'User Deleted!'});
    });
}


module.exports = userCtrl;
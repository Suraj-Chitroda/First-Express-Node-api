var { doesUserIdExist, getUserById, getAllUsers } = require('./userData');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/allUsers', function (req, res) {
    getAllUsers()
        .then((fileData) => {
            res.json(fileData)
        }, err => res.end(err))
        .catch(err => {
            console.log(err);
            res.end('Error');
        })
});

app.get('/id', (req, res) => (res.end('Provide ID in for eg. "/id/1" formate.')))

app.get('/id/:Id', function (req, res) {

    getUserById(req.params.Id)
        .then(data => (res.json(data)), err => res.end(err))
        .catch(err => res.end(err));
});

// Add new user
app.post('/add', (req, res) => {

    var id = parseInt(req.body.id);
    var name = req.body.name;
    var pass = req.body.password;
    var prof = req.body.profession;

    if (!id || !name || !pass || !prof) {
        res.end("Please provide all correct data");
        return false;
    }

    getAllUsers().then((fileData) => {

        fileData = JSON.parse(fileData);
        user = "user" + id;

        fileData[user] = {
            id: id,
            name: name,
            password: pass,
            profession: prof
        };
        fileData = JSON.stringify(fileData);
        fs.writeFile(__dirname + '/users.json', fileData, err => {
            if (err) console.log(err)
        });
    }, err => console.log("GET_ALL_USER ERROR :" + err))
        .catch(err => console.log("GET_ALL_USER ERROR :" + err));

    res.end('DONE')
})

// Delete existing user
app.get('/delete/id/:Id', (req, res) => {
    var id = parseInt(req.params.Id);


    getAllUsers().then((fileData) => {

        fileData = JSON.parse(fileData);

        user = "user" + id;
        delete fileData[user];

        fileData = JSON.stringify(fileData);
        fs.writeFile(__dirname + '/users.json', fileData, err => {
            if (err)
                console.log(err);
        });
    }, err => console.log("GET_ALL_USER ERROR :" + err))
        .catch(err => console.log("GET_ALL_USER ERROR :" + err));

    res.end('DONE')
})


// Modify user data
app.post('/modify', (req, res) => {

    var id = parseInt(req.body.id);
    var name = req.body.name;
    var pass = req.body.password;
    var prof = req.body.profession;

    console.log(id);
    console.log(name);
    console.log(pass);
    console.log(prof);

    if (!id || !name || !pass || !prof) {
        console.log("DATA ERROR ===")
        res.end("Please provide all correct data");
        return false;
    }


    doesUserIdExist(id)
        .then((result) => {
            console.log(result);
            if (!result) { res.end("User id not found"); }
        }, err => console.log("catch1:" + err))
        .catch(err => console.log(err));

    getAllUsers().then((fileData) => {

        newFileData = JSON.parse(fileData);

        user = "user" + id;

        delete newFileData[user];
        newFileData[user] = {
            id: id,
            name: name,
            password: pass,
            profession: prof
        };

        console.log("USER =>" + JSON.stringify(newFileData[user]));

        newFileData = JSON.stringify(newFileData);
        fs.writeFile(__dirname + '/users.json', newFileData, err => {
            if (err) console.log(err)
        });
        res.end('Done');

    }, err => {
        console.log("catch2:" + err);
        res.end('Error');
    })
        .catch(err => {
            console.log("catch3:" + err);
            res.end('Error');
        });
});

app.listen(3000, () => {
    console.log("Node api running on port 3000");
});

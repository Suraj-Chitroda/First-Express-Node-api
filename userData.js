var fs = require('fs');

function doesUserIdExist(id) {


    return new Promise((resolve, reject) => {
        var flag = false;
        fs.readFile(__dirname + '/' + "users.json", 'utf8', function (err, user) {
            // console.log(id)

            if (err) {
                console.log(err)
                reject("Error in promise" + err);
            }

            var user = JSON.parse(user);
            for (let usr in user) {
                if (user[usr].id == id) {
                    console.log(user[usr]);
                    flag = true;
                    resolve(true);
                }
            }
            if (flag) resolve(false);

        });
        // reject("Error in promise");
    });
}

function getUserById(id) {
    var userId = parseInt(id);

    return new Promise((resolve, reject) => {
        fs.readFile(__dirname + '/' + "users.json", 'utf8', function (err, data) {

            var user = JSON.parse(data);

            for (let usr in user) {
                if (user[usr].id == userId) {
                    console.log(user[usr]);
                    resolve(user[usr]);
                }
            }
            reject("No data found with the provided ID");
        })
    })
};

function getAllUsers() {
    return new Promise((resolve, reject) => {
        fs.readFile(__dirname + '/' + "users.json", 'utf8', (err, data) => {

            if (err) { reject('ERROR' + err); }
            if (!data) { reject('Found empty file'); }

            // data = JSON.parse(data);
            console.log(data);
            resolve(data);

        })
    })
}

module.exports = { doesUserIdExist, getUserById, getAllUsers };

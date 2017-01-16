var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
app.use(bodyParser.json());

var data = {};
var users = {
    'john.doe:12345': {
        id: 1,
        role: 'employee'
    },
    'jon.snow:12345': {
        id: 2,
        role: 'employee'
    },
    'manager:12345': {
        id: 3,
        role: 'manager'
    }
};

app.post('/login', function (req, res) {
    var user = users[req.body.login + ":" + req.body.password];
    if (user) {
        res.json(user);
        return
    }
    res.status(404).send("User not found");
});

var detailRegexp = /\/employee\/(\d+)$/;
app.get(detailRegexp, returnUserData(detailRegexp, 'userDetails'));

var skillsRegexp = /\/employee\/(\d+)\/skills/;
app.get(skillsRegexp, returnUserData(skillsRegexp, 'skills'));

app.get('/skills', function (req, res) {
    res.json(data.allSkills);
});
app.get('/projects', function (req, res) {
    var page = req.query.page;
    if (!page) {
        page = 1;
    }
    res.sendFile(__dirname + '/projects_page_' + page + '.json');
});


function returnStatic(path, contentType) {
    return function (req, res) {
        fs.readFile(__dirname + '/../' + path, function (err, data) {
            if (err) {
                res.send(err);
                return;
            }
            res.type(contentType || "text/javascript");
            res.send(data);
        })
    }
}

function returnUserData(pathPattern, dataName) {
    return function(req, res) {
        var employeeId = pathPattern.exec(req.path)[1];
        var userData = data[dataName][employeeId];
        if (userData) {
            res.json(userData);
            return;
        }
        res.status(404).send('User not found')
    }
}

function initData(data) {
    data.forEach(function (item) {
        initDataFromJson(item.variable, item.json);
    });

}

function initDataFromJson(varName, jsonPath) {
    fs.readFile(__dirname + jsonPath, function (err, content) {
        if (err) {
            console.log("Can't read file with user details!");
            console.log(err);
            process.exit(1);
        }
        data[varName] = JSON.parse(content);
    });
}

initData([
    {variable: "userDetails", json: '/user_details.json'},
    {variable: "skills", json: '/skills.json'},
    {variable: "allSkills", json: '/allSkills.json'}
]);
app.use(express.static(__dirname + '/../'));
app.get('/', returnStatic('html/index.html', "html"));
app.get('/lib/mustache.min.js', returnStatic('node_modules/mustache/mustache.min.js'));
app.get('/lib/slick.js', returnStatic('node_modules/slick-carousel/slick/slick.js'));
app.get('/fonts/fontawesome-webfont.woff2', returnStatic('node_modules/font-awesome/fonts/fontawesome-webfont.woff2', 'font/woff2'));
var port = 9999;
app.listen(port, function () {
    console.log("Server has been started on port " + port);
});
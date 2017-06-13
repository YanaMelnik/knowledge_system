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

app.post('/login', function (request, response) {                           // request handling for login
    var user = users[request.body.login + ":" + request.body.password];
    if (user) {
        response.json(user);
        return
    }
    response.status(404).send("User not found");
});

var detailRegexp = /\/employee\/(\d+)$/;                        //request handling for employee information
app.get(detailRegexp, function (request, response) {
    var employeeId = detailRegexp.exec(request.path)[1];
    var userData = data.userDetails[employeeId];
    if (userData) {
        response.json(userData);
        return;
    }
    response.status(404).send('User not found')
});


var skillsRegexp = /\/employee\/(\d+)\/skills/;                 //request handling for employee skills (skills.json)
app.get(skillsRegexp, function (request, response) {
    var employeeId = skillsRegexp.exec(request.path)[1];
    var userData = data['skills'][employeeId];
    if (userData) {
        response.json(userData);
        return;
    }
    response.status(404).send('User not found')
});

app.get('/skills', function (request, response) {           //request handling for all skills (allSkills.json)
    response.json(data.allSkills);
});

app.get('/projects', function (request, response) {
    var page = request.query.page;
    var countPerPage = request.query.countperpage;
    var pages = Math.ceil(data.projects.length / countPerPage);

    if (!page) {
        page = 1;
    } else if (page > pages){
        page = pages;
    }

    var projects = data.projects.slice(countPerPage * (page - 1), countPerPage * page);

    var answer = {
        projects: projects,
        page: page,
        pages: pages
    };
    response.json(answer);
});

var updateSkillRegexp = /\/skills\/update\/(\d+)/;
app.post(updateSkillRegexp, function (request, response) {
    var userId = updateSkillRegexp.exec(request.path)[1];
    var updateSkills = [];

    request.body.forEach(function (elem) {
        var sphere = updateSkills.find(function (obj) {
            return obj.sphere === elem.sphere;
        });

        var skill = {name: elem.name, level: elem.level};
        if (!sphere) {
            updateSkills.push({sphere: elem.sphere, skills: [skill]});
        } else {
            sphere.skills.push(skill);
        }
    });

    data.skills[userId] = updateSkills;
    response.json(updateSkills);
});

app.post('/manager/filter', function (request, response) {

    var condition = request.body;
    var objUserSkills = data.skills;
    var result = [];

    for (var userId in objUserSkills) {
        if (matchesFilter(objUserSkills[userId], condition)) {
            result.push(userId);
        }
    }

    function matchesFilter(skills, filter) {
        var result = true;

        filter.forEach(function (expectedSkill) {
            result &= hasSkill(expectedSkill, skills);
        });

        return result;
    }

    function hasSkill(condition, skills) {
        var sphere = condition.sphere;
        var result = false;

        skills.forEach(function (elem) {
            if (elem.sphere === sphere) {
                elem.skills.forEach(function (elem) {
                    if (elem.name === condition.name && elem.level >= condition.level) {
                        result = true;
                    }
                })
            }
        });
        return result;
    }

    response.json(result);
});

function returnStatic(path, contentType) {
    return function (request, response) {
        fs.readFile(__dirname + '/../' + path, function (err, data) {
            if (err) {
                response.send(err);
                return;
            }
            response.type(contentType || "text/javascript");
            response.send(data);
        })
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
    {variable: "allSkills", json: '/allSkills.json'},
    {variable: "projects", json: '/projects.json'}
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



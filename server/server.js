var http = require('http')
    , fs = require('fs')
    , url = require('url')
    , port = 8080;


// NOTE: your dataset can be as simple as the following, you need only implement functions for addition, deletion, and modification that are triggered by outside (i.e. client) actions, and made available to the front-end
var data = [
    {'id': 1, 'name': 'Georgios Abaris', 'country': 'Greece', 'year': 2004, 'sport': 'Football', 'season': 'Summer'},
    {'id': 2, 'name': 'Aziz Abbas', 'country': 'Iraq', 'year': 1964, 'sport': 'Weightlifting', 'season': 'Summer'},
    {'id': 3, 'name': 'Lois Abbingh', 'country': 'Netherlands',  'year': 2016, 'sport': 'Handball','season': 'Summer'},
    {'id': 4, 'name': 'Clare Abbot', 'country': 'Ireland',  'year': 2016, 'sport': 'Equestrianism', 'season': 'Summer'},
    {'id': 5, 'name': 'Matt Abbot', 'country': 'Canada', 'year': 2000, 'sport': 'Sailing', 'season': 'Summer'}
]
var newData = [
    {'id': 0, 'name': '', 'country': '', 'season': '', 'year': 0, 'sport': ''}
];


var server = http.createServer(function (req, res) {

    //add code to call function on req

    var uri = url.parse(req.url)
    switch (uri.pathname) {
        case '/':
            sendFile(res, 'public/index.html')
            break
        case '/index.html':
            sendFile(res, 'public/index.html')
            break
        case '/public/favicon.ico':
            sendFile(res, 'public/favicon.ico', 'text/html');
            break;
        case '/css/style.css':
            sendFile(res, 'public/css/style.css', 'text/css')
            break
        case '/css/bootstrap.css':
            sendFile(res, 'public/css/bootstrap.css', 'text/css')
            break
        case '/js/scripts.js':
            sendFile(res, 'public/js/scripts.js', 'text/javascript')
            break
        case '/js/tablescripts.js':
            sendFile(res, 'public/js/tablescripts.js', 'text/javascript')
            break
        case '/athlete_events.csv':
            sendFile(res, '/athlete_events.csv', 'text')
            break
        case '/initData':
            sendData(res, data, 'application/json');
            break;
        case '/iWantNewData':
            sendData(res, newData, 'application/json')
            break;
        case '/save':
            saveThisData(req, res); //pass the incoming request
            break;
        case '/modifyTable':
            modifyTable(req, res);
            break;
        case '/deleteRow':
            deleteRow(req, res);
            break;

        default:
            res.end('404 not found')
    }

});

server.listen(process.env.PORT || port);
console.log('listening on 8080');

// subroutines
// NOTE: this is an ideal place to add your data functionality

function sendFile(res, filename, contentType) {
    contentType = contentType || 'text/html';


    fs.readFile(filename, function (error, content) {
        res.writeHead(200, {'Content-type': contentType})
        res.end(content, 'utf-8')
    })

}

function sendData(res, data, contentType) {
    contentType = contentType || 'text/html';

    res.writeHead(200, {'Content-type': contentType});
    res.end(
        JSON.stringify(data)
    );
}

function saveThisData(req, res) {
    req.on('data', function (thisData) {


        var body = JSON.parse(thisData);

        var year = body['year'];


        var season = getSeason(parseInt(year));
        body['season'] = season;


        data.push(body);

        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(JSON.stringify(data), 'utf-8');

    });

}


function getSeason(year){

    var diff = year - 1896;

    var season = "Summer"
    if(diff % 6 === 0){
        season = "Winter"
    }

    return season;

}

function modifyTable(req, res) {

    req.on('data', function (thisData) {



        data = JSON.parse(thisData);

        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(JSON.stringify(data), 'utf-8');
    });
}

function deleteRow(req, res) {

    req.on('data', function (thisData) {


        data = JSON.parse(thisData);



        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(JSON.stringify(data), 'utf-8');
    });
}


var data = {
    "title": "Gay",
    "body": "idk what the fuck is wrong with me but im gay",
    "postId": "123456789",
    "upvotes": 0,
    "location": "01609",
    "contractionDate": "10/1/18",
    "symptoms": ["liking men", "being gay", "hating myself"],
    "upvoteIds": [],
    "doctorNotes": "The doctor said im going to die because im weird",
    "ownerId": "1234",
    "comments": [ {
                        "commentId": "123452131",
                        "postId": "123456789",
                        "date": "10/2/18",
                        "body": "no way dude im also gay"

                    },{
                        "commentId": "903475987324",
                        "postId": "123456789",
                        "date": "10/2/18",
                        "body": "being gay is a sin"

                    }]

}

console.log(JSON.stringify(data));
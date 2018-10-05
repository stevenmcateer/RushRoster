const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const databaseConfig = require('./dbconfig.json')

const PORT = process.env.PORT || 5000;

// PostgreSQL db
const pgp = require('pg-promise')({
    ssl: true,
});
const db = pgp(databaseConfig); //local
// const db = pgp(process.env.DATABASE_URL); //heroku

db.oneOrNone('CREATE TABLE IF NOT EXISTS POSTS(' +
    'title varchar(80),'+
    'body varchar(100),'+
    'postid varchar(20),'+
    'upvotes int,'+
    'location varchar(20),'+
    'contractiondate varchar(20),'+
    'symptoms varchar(1000),' +
    'upvotesids varchar(1000),'+
    'doctornotes varchar(1000),'+
    'ownerid varchar(20),'+
    'comments varchar(10000));')
    .then(data => {
        // success;
    })
    .catch(error => {
        // error;
    });

// Multi-process to utilize all CPU cores.
if (cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
  const app = express();

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

  // Answer API requests.
  app.get('/api', function (req, res) {
      res.set('Content-Type', 'application/json');
      res.send('{"message":"Hello from the custom server!"}');
  });

    // Get all rows from DB
    app.get('/api/getRows', function (req, res) {
        getRows().then((rows) => {
            res.end(JSON.stringify(rows))
        }).catch(e => {
            console.log(e.stack);
            res.end(JSON.stringify({'status': 'failure', 'message': e.stack}))
        })
    });

    app.put('/api/updateRow', function (req, res) {
        console.log("IN THE ENDPOINT");
        getReq(req).then((obj) => {
            updateRow(obj).then((rows) => {
                res.end(JSON.stringify(rows))
            }).catch(e => {
                res.end(JSON.stringify({'status': 'failure', 'message': e.stack}))
            })
        })
    });

    app.put('/api/addRow', function (req, res) {
        getReq(req).then((obj) => {
            addRow(obj).then((rows) => {
                res.end(JSON.stringify(rows))

            })
                .catch(e => {
                    console.log(e.stack)
                    res.end(JSON.stringify({'status': 'failure', 'message': e.stack}))
                })
        })
    });

    app.put('/api/deleteRow', function (req, res) {
        getReq(req).then((obj) => {
            deleteRow(obj).then((rows) => {
                res.end(JSON.stringify(rows))
            })
                .catch(e => {
                    console.log(e.stack)
                    res.end(JSON.stringify({'status': 'failure', 'message': e.stack}))
                })
        })
    });


    // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });

  app.listen(PORT, function () {
    console.error(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
  });

}

// Database functions
// Asynchronous function for parsing request data
async function getReq(req) {
    let body = []
    return new Promise(function (resolve, reject) {
        req.on('data', (chunk) => {
            body.push(chunk)
        }).on('end', () => {
            body = Buffer.concat(body).toString()
            resolve(JSON.parse(body))
        })
    })
}

// Asynchronous getRows : JSON Array of all rows from DB
async function getRows() {
    return await db.any('SELECT * from posts')
}

// Asynchronous addRow(req) : JSON Object of row added
// req : json containing {illness, votes, location, conception, symptoms,
// listOfUserId, doctorVisit, ownerid, postid, comment, commentId, time}

async function addRow(obj) {
    let id = generateId()
    console.log(id)
    return await db.oneOrNone(`INSERT INTO posts
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [obj.title, obj.body, obj.postid ,
        obj.upvotes, obj.location,
        obj.contractiondate, JSON.stringify(obj.symptoms),
        JSON.stringify(obj.upvotesids),
        obj.doctornotes,
        obj.ownerid, JSON.stringify(obj.comments)])
}


// Asynchronous editRow(req) : JSON Object of row edited
// req : request containing json of {id, student, item, grade}
async function updateRow(obj) {
    console.log("UPVTOTES " + JSON.stringify(obj.upvoteids));


    return await db.one('UPDATE posts SET body = $2, upvotes = $4, location = $5, contractiondate = $6, symptoms = $7, upvoteids = $8, doctornotes = $9, ownerid = $10, comments = $11  WHERE postid = $3 RETURNING *',
        [obj.title, obj.body, obj.postid ,obj.upvotes, obj.location,
        obj.contractiondate, obj.symptoms, JSON.stringify(obj.upvoteids), obj.doctornotes,
        obj.ownerid, obj.comments])
}

// Asynchronous deleteRow(req) : JSON Object of row deleted
// req : containing id
async function deleteRow(obj) {
    console.log(obj.postid);
    return await db.oneOrNone('Delete from POSTS where postid = $1',
        [obj.postid])
}

generateId.previous = 0;

// Generates unique number for IDs in DB
function generateId() {
    var date = Date.now();

    // If created at same millisecond as previous
    if (date <= generateId.previous) {
        date = ++generateId.previous;
    } else {
        generateId.previous = date;
    }

    return date;
}

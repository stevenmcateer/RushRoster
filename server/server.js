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

db.oneOrNone('INSERT INTO ORGANIZATIONS VALUES("123", "TKE");')
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
  app.get('/api', function(req, res) {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Hello from the custom server!"}');
  });


  // GET PNM Functions and API CALlS
  app.put('/api/pnm/editPNM', function(req, res) {
    getReq(req).then((obj) => {
      editPNM(obj).then((result) => {
        res.end(JSON.stringify({
          "success": "Successfully edited PNM"
        }))
      }).catch(e => {
        res.end(JSON.stringify({
          'status': 'failure',
          'message': e.stack
        }))
      })
    })
  });

  async function editPNM(obj) {
    return await db.oneOrNone('UPDATE pnm set name = $2, major = $3, description = $4, graduationyear = $5, approvedEntry = $6 where (pnmid = $1 and organizationid  = $7)', [obj.pnmid, obj.name, obj.major, obj.description, obj.graduationyear, false, obj.organizationid])

  }


  app.post('/api/pnm/submitPNM', function(req, res) {
    getReq(req).then((obj) => {
      submitPNM(obj).then((result) => {
        res.end(JSON.stringify({
          "success": "Successfully added PNM"
        }))
      }).catch(e => {
        res.end(JSON.stringify({
          'status': 'failure',
          'message': e.stack
        }))
      })
    })
  });
  async function submitPNM(obj) {
    return await db.oneOrNone(`  INSERT INTO pnm values($1, $2, $3, $4, $5, $6, $7)
        `, [Date.now(), obj.name, obj.major, obj.description, obj.graduationyear, true, obj.organizationid])

  }

  // Get all rows from DB
  app.get('/api/pnm/getEditedPNM', function(req, res) {
    getEditedPNM(req.query.orgid).then((obj) => {
      res.end(JSON.stringify(obj))

    }).catch(e => {
      res.end(JSON.stringify({
        'status': 'failure',
        'message': e.stack
      }))
    })

  });
  async function getEditedPNM(orgid, req) {
    return await db.any('SELECT * from pnm where organizationid = $1 and approvedEntry  = $2', [orgid, false]);
  }

  app.get('/api/pnm/getAll', function(req, res) {
    getAllpnm(req.query.orgid).then((obj) => {
      res.end(JSON.stringify(obj))
    }).catch(e => {
      res.end(JSON.stringify({
        'status': 'failure',
        'message': e.stack
      }))
    })

  });
  async function getAllpnm(orgid, req) {
    return await db.any('SELECT * from pnm where organizationid = $1', [orgid]);
  }


  //BID RELATED API CALLS AND FUNCTIONS
  app.get('/api/bid/getBids', function(req, res) {
    getBids(req.query.orgid).then((obj) => {
      res.end(JSON.stringify(obj))
    }).catch(e => {
      console.log(e.stack);
      res.end(JSON.stringify({
        'status': 'failure',
        'message': e.stack
      }))
    })

  });
  async function getBids(orgid) {
    console.log("ORGID FOR BIDS" + orgid);
    return await db.many('SELECT * FROM BIDS WHERE organizationid = $1;', [orgid]);
  }



  app.post("/api/bid/addBid", function(req, res) {
    getReq(req).then((obj) => {
      addBid(obj).then((result) => {

        res.end(JSON.stringify({
          "success": "Successfully recorded Bid"
        }))

      }).catch(e => {

        res.end(JSON.stringify({
          'status': 'failure',
          'message': e.stack
        }))
      })
    })
  });

  async function addBid(obj) {
    console.log(obj)
    return await db.oneOrNone('INSERT into bids values($1, $2, $3, $4, $5)',
      [obj.pnmid, obj.round, obj.status, obj.organizationid, obj.meetingid])

  }


  //COMMENT API CALLS AND Functions
  app.post('/api/comments/addComment', function(req, res) {
    getReq(req).then((obj) => {
      addComment(obj).then(result => {
        res.end(res.end(JSON.stringify({
          "success": "Successfully added Comment"
        })))
      }).catch(e => {
        res.end(JSON.stringify({
          'status': 'failure',
          'message': e.stack
        }))
      })
    })
  });

  async function addComment(obj) {
    console.log(new Date().toUTCString());
    return await db.oneOrNone('INSERT INTO COMMENTS VALUES ($1, $2, $3, $4, $5)', [obj.pnmid, obj.userid, new Date().toUTCString(), Date.now(), obj.commentbody])

  }

  app.get('/api/comments/getComments', function(req, res) {
    getComments(req.query.pnmid).then(result => {
      res.end(JSON.stringify(result))
    }).catch(e => {
      res.end(JSON.stringify({
        'status': 'failure',
        'message': e.stack
      }))
    })
  })

async function getComments(pnmid){
  return await db.many("SELECT * FROM COMMENTS WHERE pnmid= $1", [pnmid]);

}






  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });

  app.listen(PORT, function() {
    console.error(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
  });

}

// Database functions
// Asynchronous function for parsing request data
async function getReq(req) {
  let body = []
  return new Promise(function(resolve, reject) {
    req.on('data', (chunk) => {
      body.push(chunk)
    }).on('end', () => {
      body = Buffer.concat(body).toString()
      resolve(JSON.parse(body))
    })
  })
}








// Asynchronous getRows : JSON Array of all rows from DB




// Asynchronous addRow(req) : JSON Object of row added
// req : json containing {illness, votes, location, conception, symptoms,
// listOfUserId, doctorVisit, ownerid, postid, comment, commentId, time}

async function addRow(obj) {
  let id = generateId()
  console.log(id)
  return await db.oneOrNone(`INSERT INTO posts
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
    [obj.title, obj.body, obj.postid,
      obj.upvotes, obj.location,
      obj.contractiondate, JSON.stringify(obj.symptoms),
      JSON.stringify(obj.upvotesids),
      obj.doctornotes,
      obj.ownerid, JSON.stringify(obj.comments)
    ])
}


// Asynchronous editRow(req) : JSON Object of row edited
// req : request containing json of {id, student, item, grade}
async function updateRow(obj) {
  console.log("UPVTOTES " + JSON.stringify(obj.upvoteids));


  return await db.one('UPDATE posts SET body = $2, upvotes = $4, location = $5, contractiondate = $6, symptoms = $7, upvoteids = $8, doctornotes = $9, ownerid = $10, comments = $11  WHERE postid = $3 RETURNING *',
    [obj.title, obj.body, obj.postid, obj.upvotes, obj.location,
      obj.contractiondate, obj.symptoms, JSON.stringify(obj.upvoteids), obj.doctornotes,
      obj.ownerid, obj.comments
    ])
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

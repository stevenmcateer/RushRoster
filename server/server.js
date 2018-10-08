const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const databaseConfig = require('./dbconfig.json')
// const awsConfig = require('../configs/awsConfig.csv');
const aws = require('aws-sdk');
const S3_BUCKET = process.env.S3_BUCKET || 'herokurushroster';

aws.config.region = 'us-east-2';
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


  app.get('/sign-s3', (req, res) => {
    const s3 = new aws.S3();
    const fileName = req.query['file-name'];
    const fileType = req.query['file-type'];
    const s3Params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: 'public-read'
    };

    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if(err){
        console.log(err);
        return res.end();
      }
      const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
      };
      res.write(JSON.stringify(returnData));
      res.end();
    });
  });

  // Answer API requests.
  app.get('/api', function(req, res) {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Hello from the custom server!"}');
  });

  app.post('/api/pnm/deletePNM', function(req, res){
    getReq(req).then(obj=>{
      deletePNM(obj).then(result=>{
        res.end(JSON.stringify({
          "success": "Successfully added PNM"
        }))
      }).catch(e=>{
        res.end(JSON.stringify({
          'status': 'failure',
          'message': e.stack
        }))
      })
    })
  });

  async function deletePNM(obj){
    return await db.oneOrNone('DELETE FROM PNM where pnmid= $1', [obj.pnmid]);
  }

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
    console.log(obj);
    return await db.oneOrNone(`Insert into edits values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`
    , [obj.pnmid, Date.now() ,obj.name || "", obj.major || "", obj.description || "",
     obj.graduationyear || "",  obj.dorm || "", obj.grades || "", obj.hometown || "",
      obj.phonenumber || "", obj.organizationid, obj.photo || ""])

  }

  app.get('/api/pnm/getEdits', function(req, res){
    getEdits(req.query.pnmid, req.query.orgid).then(result =>{

        res.end(JSON.stringify(result))
    }).catch(e =>{
      res.end(JSON.stringify({
        'status': 'failure',
        'message': e.stack
      }))
    })
  });

  async function getEdits(pnmid, orgid){
    return await db.many('SELECT * FROM edits where pnmid = $1 and organizationid = $2', [pnmid, orgid]);

  }
  app.post('/api/pnm/submitPNM', function(req, res) {
    getReq(req).then((obj) => {
      submitPNM(JSON.parse(obj.body)).then((result) => {
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
    return await db.oneOrNone(`  INSERT INTO pnm values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        `, [Date.now(), obj.name, obj.major, obj.description, obj.graduationyear,
          obj.dorm, obj.grades, obj.hometown, obj.phonenumber, obj.organizationid, obj.photo || ""])

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
      addBid(JSON.parse(obj.body)).then((result) => {

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
      addComment(JSON.parse(obj.body)).then(result => {
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

  app.get('/api/login', function(req, res) {
    checkUser(req.query).then((obj) => {
      res.end(JSON.stringify(obj))
    }).catch(e => {
      res.end(JSON.stringify({
        'status': 'failure',
        'message': e.stack
      }))
    })

  });
  async function checkUser(obj) {
    console.log(obj);
    return await db.any('SELECT username, organization, permission from users where email = $1, passw= $2', [obj.email, obj.password]);
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

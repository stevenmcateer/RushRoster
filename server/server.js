const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const databaseConfig = require('./dbconfig.json')
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
      console.log(JSON.stringify(returnData))
    });
  });

  // Answer API requests.
  app.get('/api', function(req, res) {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Hello from the custom server!"}');
  });

  app.post('/api/pnm/deletePNM', function(req, res){
      console.log("here boi")
    getReq(req).then(obj=>{
      deletePNM(obj).then(result=>{
        res.end(JSON.stringify({
          "success": "Successfully deleted PNM"
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
      console.log("final" + obj.body.pnmid)
    return await db.oneOrNone('DELETE FROM edits where pnmid= $1;' + 'DELETE FROM comments WHERE pnmid= $1;' + 'DELETE FROM bids WHERE pnmid= $1;' +
        'DELETE FROM pnm where pnmid= $1;' , [obj.body.pnmid]);
  }

  //Delete an edit request
    app.post('/api/pnm/deleteEditRequest', function(req, res){
        console.log("here boi")
        getReq(req).then(obj=>{
            deleteEditRequest(obj).then(result=>{
                res.end(JSON.stringify({
                    "success": "Successfully deleted PNM edits"
                }))
            }).catch(e=>{
                res.end(JSON.stringify({
                    'status': 'failure',
                    'message': e.stack
                }))
            })
        })
    });

    async function deleteEditRequest(obj){
        return await db.oneOrNone('DELETE FROM edits where pnmid= $1', [obj.body.pnmid.toString()]);
    }

  // GET PNM Functions and API CALlS
  app.put('/api/pnm/editPNM', function(req, res) {
    getReq(req).then((obj) => {

      editPNM(obj.body).then((result) => {
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

  app.post('/api/user/updatePermission', function(req, res) {
    console.log("Updating user permission");
    getReq(req).then((obj) => {
      console.log(obj.body)
        updatePermission(obj.body).then((result) => {
        res.end(JSON.stringify({
          "success": "Successfully updated user"
        }))
      }).catch(e => {
        console.log(e.stack);
        res.end(JSON.stringify({
          'status': 'failure',
          'message': e.stack
        }))
      })
    })
  });

  async function updatePermission(obj) {
    return await db.oneOrNone(` UPDATE users SET permissions=$3 WHERE userid=$1 AND organizationid=$2);
        `, [obj.userid, obj.organizationid, obj.permissionslevel])

  }

    app.post('/api/user/approveUser', function(req, res) {
        console.log("Adding new user");
        getReq(req).then((obj) => {
            console.log(obj.body)
            approveUser(obj.body).then((result) => {
                res.end(JSON.stringify({
                    "success": "Successfully added user"
                }))
            }).catch(e => {
                console.log(e.stack);
                res.end(JSON.stringify({
                    'status': 'failure',
                    'message': e.stack
                }))
            })
        })
    });


    async function approveUser(obj) {
        console.log("arrpasdfasfd")
        return await db.oneOrNone(`  INSERT INTO users values($1, $2, $3, $4, $5, $6, $7); DELETE from pending_users where userid=$1;
        `, [obj.userid, obj.organizationid, obj.username, obj.email, obj.passw, obj.permissionslevel, 1])

    }

  app.post('/api/user/deletePending', function(req, res) {
    console.log("Adding new user");
    getReq(req).then((obj) => {
      console.log(obj.body)
      deletePending(obj.body).then((result) => {
        res.end(JSON.stringify({
          "success": "Successfully deleted pending user"
        }))
      }).catch(e => {
        console.log(e.stack);
        res.end(JSON.stringify({
          'status': 'failure',
          'message': e.stack
        }))
      })
    })
  });


  async function deletePending(obj) {
    console.log("arrpasdfasfdasdfasdfasdfasdf")
    return await db.oneOrNone(`DELETE from pending_users where userid=$1;
        `, [obj.userid])

  }

  app.post('/api/user/deleteUser', function(req, res) {
    console.log("deleting user");
    getReq(req).then((obj) => {
      console.log(obj.body)
      deleteUser(obj.body).then((result) => {
        console.log(result)
        res.end(JSON.stringify({
          "success": "Successfully deleted user"
        }))
      }).catch(e => {
        console.log(e.stack);
        res.end(JSON.stringify({
          'status': 'failure',
          'message': e.stack
        }))
      })
    })
  });


  async function deleteUser(obj) {
    console.log(obj.userid)
    return await db.oneOrNone(`DELETE from users where userid=$1;
        `, [obj.userid])

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
    return await db.any('SELECT * from edits where organizationid = $1', [orgid]);
  }



  // Get all rows from pending users
  app.get('/api/getPendingUsers', function(req, res) {
      getPendingUsers(req.query.orgid).then((obj) => {
        console.log(obj)
          res.end(JSON.stringify(obj))
      }).catch(e => {
          res.end(JSON.stringify({
              'status': 'failure',
              'message': e.stack
          }))
      })

  });
  async function getPendingUsers(orgid, req) {
      return await db.any('SELECT * from pending_users where organizationid = $1', [orgid]);
  }
  app.get('/api/getAllUsers', function(req, res) {
      getAllUsers(req.query.orgid).then((obj) => {
          res.end(JSON.stringify(obj))

      }).catch(e => {
          res.end(JSON.stringify({
              'status': 'failure',
              'message': e.stack
          }))
      })

  });
  async function getAllUsers(orgid, req) {
      return await db.any('SELECT * from users where organizationid = $1', [orgid]);
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
    console.log("getting bids")
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
    return await db.manyOrNone('SELECT * FROM BIDS WHERE organizationid = $1;', [orgid]);
  }



  app.post("/api/bid/addBid", function(req, res) {
    getReq(req).then((obj) => {
      addBid(obj.body).then((result) => {

        res.end(JSON.stringify({
          "success": "Successfully recorded Bid"
        }))

      }).catch(e => {
        console.log(e.stack)
        res.end(JSON.stringify({
          'status': 'failure',
          'message': e.stack
        }))
      })
    })
  });

  async function addBid(obj) {
    console.log(obj)
    return await db.oneOrNone('DELETE FROM bids where pnmid=$1; INSERT into bids values($1, $2, $3, $4, $5)',
      [obj.pnmid, obj.round, obj.status, obj.organizationid, Date.now()])

  }


  //COMMENT API CALLS AND Functions
  app.post('/api/comments/addComment', function(req, res) {
    getReq(req).then((obj) => {
      addComment(JSON.parse(obj.body)).then(result => {
        res.end(res.end(JSON.stringify({
          "success": "Successfully added Comment"
        })))
      }).catch(e => {
          console.log(e.stack)
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


  app.post('/api/user/submitNewUser', function(req, res){

      getReq(req).then(obj=>{
        console.log(obj)
          submitNewUser(obj.body).then(result=>{
              res.end(JSON.stringify({"Success": "Successfully submitted pending user"}))
          }).catch(e=>{
            console.log(e.stack)
            res.end(JSON.stringify({
              'status': 'failure',
              'message': e.stack
            }))
          })

      })
  })

  async function submitNewUser(obj) {
    return await db.oneOrNone('INSERT INTO pending_users values($1, $2, $3, $4, $5)',[Date.now(), obj.username, obj.email, obj.passw, obj.organizationid])
  }

  app.get('/api/login', function(req, res) {
    console.log("AUTHENTICATING")

    authUser(req.query).then((obj) => {
      console.log(obj);
      res.end(JSON.stringify(obj))
    }).catch(e => {
      console.log(e.stack)
      res.end(JSON.stringify({
        'status': 'failure',
        'message': e.stack
      }))
    })
  });
  async function authUser(query) {
    var email = query.email;
    var password = query.password;
    return await db.any('SELECT userid, username, organizationid, permission, isAuthenticated FROM USERS where email= $1 AND passw = $2', [email, password]);
  }
  // Decryption Function
  function decrypt(text, key){
    var crypto = require('crypto'),
        algorithm = 'aes-256-ctr';
    var decipher = crypto.createDecipher(algorithm, key)
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    var clear = strip_buffer(dec)
    // console.log("Clear: " + clear);
    return dec;
  }
  // Encryption Function
  function encrypt(value, key){
    var crypto = require('crypto'),
        algorithm = 'aes-256-ctr';
    var text = buffer(value);
    var cipher = crypto.createCipher(algorithm, key);
    var crypted = cipher.update(text,'utf8','hex');
    crypted += cipher.final('hex');
    console.log(crypted);
    return crypted;
  }
  // Buffer creation for encryption
  function buffer(str){
    var curLen = str.length;
    var desired = (36 - curLen);
    console.log("current string length: " + curLen);
    for (var i = curLen; i < desired; i++) {
      // console.log("Buffered String: "+ str);
      str += "*";
    };
    // console.log("Final Buffered String: "+str);
    return str;
  }
  function strip_buffer(value) {
      var j = value.length;
      for (var i = 0; i < j; i++) {
      	value = value.replace("*", "");
      };
      // console.log("Stripped: " + value);
      return value;
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
  return await db.manyOrNone("SELECT * FROM COMMENTS WHERE pnmid= $1", [pnmid]);
}

    app.get('/api/comments/getUser', function(req, res) {
        getUser(req.query.userid).then(result => {
            res.end(JSON.stringify(result))
        }).catch(e => {
            res.end(JSON.stringify({
                'status': 'failure',
                'message': e.stack
            }))
        })
    })

    async function getUser(userid) {
        return await db.oneOrNone("SELECT username FROM users WHERE userid= $1", [userid]);
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

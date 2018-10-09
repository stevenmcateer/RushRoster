var requestify = require('requestify');
const BASE_URL = window.location.href.replace(/\/$/, "") + '/api';
// Call getRows(fn) to call the function when the rows are done
export function getPnms() {
    return new Promise((resolve, reject) => {
            const res = {
                rows: [
                    {
                        'pnmid': "12345",
                        'name': 'chucky',
                        'major': 'CS',
                        'description': 'arcades and shit',
                        'graduationyear': '2022',
                        'organizationid': 123
                    },
                    {
                        'pnmid': "12346",
                        'name': 'satan',
                        'major': 'civil',
                        'description': 'bbqs and shit',
                        'graduationyear': '2666',
                        'organizationid': 123
                    },
                    {
                        'pnmid': "12347",
                        'name': 'god',
                        'major': 'RBE',
                        'description': 'halos and shit',
                        'graduationyear': '2018',
                        'organizationid': 123
                    },
                    {
                        'pnmid': "12348",
                        'name': 'loki',
                        'major': 'CS',
                        'description': 'nordic af',
                        'graduationyear': '2018',
                        'organizationid': 123
                    },
                    {
                        'pnmid': "12349",
                        'name': 'thor',
                        'major': 'ECE',
                        'description': 'thunder n lightning n shit',
                        'graduationyear': '2018',
                        'organizationid': 123
                    },
                    {
                        'pnmid': "12350",
                        'name': 'thor',
                        'major': 'ECE',
                        'description': 'thunder n lightning n shit',
                        'graduationyear': '2018',
                        'organizationid': 123
                    },
                    {
                        'pnmid': "12351",
                        'name': 'thor',
                        'major': 'ECE',
                        'description': 'thunder n lightning n shit',
                        'graduationyear': '2018',
                        'organizationid': 123
                    },
                    {
                        'pnmid': "12352",
                        'name': 'thor',
                        'major': 'ECE',
                        'description': 'thunder n lightning n shit',
                        'graduationyear': '2018',
                        'organizationid': 123
                    }
                ],
                rounds: [
                    {
                        roundNum: 1

                    },
                    {
                        roundNum: 2}]
            }
            setTimeout(() => resolve(res), 50);
        }
    )
}

/**
 * @param pnm : JSON Object
 * @returns Promise : Nothing
 */
export function addPNM(pnm) {
  console.log("Sending to DB")
    return requestify.post(BASE_URL + '/pnm/submitPNM', {
        body: JSON.stringify(pnm)
    })
}

/**
 * @TODO: OrgID functionality
 * @returns Promise : all PNMs from DB in JSONArray
 */
export function getAll() {
    return requestify.get(BASE_URL + '/pnm/getAll', {
        params: {
            orgid: '123'
        }
    })
}

/**
 * @TODO: OrgID functionality
 * @returns Promise : all pendingUsers from DB in JSONArray
 */
export function getPendingUsers() {
    return requestify.get(BASE_URL + '/getPendingUsers', {
        params: {
            orgid: '123'
        }
    })
}

/**
 *
 * @param pnmid : number
 * @returns Promise : JSON Array of comments
 */
export function getComments(pnmid){
    return requestify.get(BASE_URL + '/comments/getComments', {
        params: {
            pnmid: pnmid
        }
    })
}

/**
 *
 */
export function getAuthentication(obj){
    return requestify.get(BASE_URL + '/login', {
      body: JSON.stringify(obj)
    })
}

/**
 *
 * @param pnm : JSON Object
 * @returns Promise : Nothing
 */
export function editPNM(pnm){
    return requestify.put(BASE_URL + '/pnm/editPNM', {
        body: pnm
    })
}

/**
 *
 * @param pnmid : JSON Object
 * @returns Promise : Nothing
 */
export function deletePNM(pnmid){
    return requestify.post(BASE_URL + '/pnm/deletePNM', {
        body: pnmid
    })
}

/**
*
* @param file: file Name
*
*/
export function getSignedRequest(file) {
  console.log(file)
  const fileName = file.name;
  console.log(fileName)

  const fileType = fileName.substr(fileName.lastIndexOf('.') + 1);
  console.log(file);
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `/sign-s3?file-name=${fileName}&file-type=${fileType}`);
  console.log(`/sign-s3?file-name=${fileName}&file-type=${fileType}`);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        console.log("UPLOADING ")
        uploadFile(file[0], response.signedRequest, response.url);
      } else {
        alert('Could not get signed URL.');
      }
    }
  };
  xhr.send();
}

export function uploadFile(file, signedRequest, url) {
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', signedRequest);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log("SUCCESSFULLY UPLOADED FILE")
        return true;
      } else {
        alert('Could not upload file.');
      }
    }
  };
  xhr.send(file);
}
export function printPhoto(photo){
console.log("PHOTO IS");
  console.log(photo)
}

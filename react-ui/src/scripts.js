var requestify = require('requestify');
const BASE_URL = window.location.href + '/api';
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
 * @returns {*}
 */
export function addPNM(pnm) {
    console.log("uhhhh....")
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
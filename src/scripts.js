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
                        'organizationId': 123
                    },
                    {
                        'pnmid': "12346",
                        'name': 'satan',
                        'major': 'civil',
                        'description': 'bbqs and shit',
                        'graduationyear': '2666',
                        'organizationId': 123
                    },
                    {
                        'pnmid': "12347",
                        'name': 'god',
                        'major': 'RBE',
                        'description': 'halos and shit',
                        'graduationyear': '2018',
                        'organizationId': 123
                    },
                    {
                        'pnmid': "12348",
                        'name': 'loki',
                        'major': 'CS',
                        'description': 'nordic af',
                        'graduationyear': '2018',
                        'organizationId': 123
                    },
                    {
                        'pnmid': "12349",
                        'name': 'thor',
                        'major': 'ECE',
                        'description': 'thunder n lightning n shit',
                        'graduationyear': '2018',
                        'organizationId': 123
                    },
                    {
                        'pnmid': "12350",
                        'name': 'thor',
                        'major': 'ECE',
                        'description': 'thunder n lightning n shit',
                        'graduationyear': '2018',
                        'organizationId': 123
                    },
                    {
                        'pnmid': "12351",
                        'name': 'thor',
                        'major': 'ECE',
                        'description': 'thunder n lightning n shit',
                        'graduationyear': '2018',
                        'organizationId': 123
                    },
                    {
                        'pnmid': "12352",
                        'name': 'thor',
                        'major': 'ECE',
                        'description': 'thunder n lightning n shit',
                        'graduationyear': '2018',
                        'organizationId': 123
                    }
                ]
            }
        setTimeout(() => resolve(res), 50);
        }
    )
}

// Add a new PNM to the DB
export function addPNM(pnm){

}
// Call getRows(fn) to call the function when the rows are done
function getRows(fn) {
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
                    }
                ]
            }
        setTimeout(() => resolve(fn(res)), 50);
        }
    )
}

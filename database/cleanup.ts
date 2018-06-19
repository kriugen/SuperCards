import * as db from './util'
db.cleanup()
    .then(() => {
        console.log('cleanup done')
        process.exit()
    })
    .catch((e: Error) => console.error(e))

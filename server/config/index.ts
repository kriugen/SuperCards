import { IConfig } from './common'
import Development from './development'
import Production from './production'

var config: IConfig

if (process.env.NODE_ENV == 'production') {
    config = new Production()
} else {
    config = new Development()
}

export default config
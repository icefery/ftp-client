import * as path from 'path'
import * as os from 'os'

export const HOME_PATH = os.homedir()

export const CONFIG_PATH = path.resolve(HOME_PATH, '.ftp-client')

export const DB_PATH = path.resolve(CONFIG_PATH, 'ftp-client.db')
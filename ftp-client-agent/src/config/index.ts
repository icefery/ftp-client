import * as path from 'path'
import * as os from 'os'

// 用户主目录
export const HOME_PATH = os.homedir()

// 配置文件目录
export const CONFIG_PATH = path.resolve(HOME_PATH, '.ftp-client')

// 数据库文件路径
export const DB_PATH = path.resolve(CONFIG_PATH, 'ftp-client.db')

// FTP 超时时间
export const FTP_TIMEOUT = 3000

// SFTP 超时时间
export const SFTP_TIMEOUT = 3000

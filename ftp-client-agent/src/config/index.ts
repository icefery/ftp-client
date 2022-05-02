import * as path from 'path'
import * as os from 'os'
import { Session } from '../module/session/session.entity'

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

// 本地会话配置
export const LOCAL_SESSION = { id: -1, name: 'local', type: 'FS', init: HOME_PATH } as Session

// 任务刷新间隔
export const TASK__REFRESH_INTERVAL = 500

// swagger 文档路径
export const SWAGGER_PATH = '/swagger'

// swagger 文档标题
export const SWAGGER_TITLE = 'FTP 客户端'

// 静态资源目录
export const PUBLIC_PATH = path.resolve(__dirname, '../../../build/ui')

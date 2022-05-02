import os
import pathlib

# 用户主目录
HOME_PATH = os.environ['HOME']

# 配置文件目录
CONFIG_PATH = str(pathlib.Path(f'{HOME_PATH}/.ftp-client').resolve())

# 日志文件路径
AGENT_LOG_PATH = str(pathlib.Path(f'{CONFIG_PATH}/ftp-client-agent.log').resolve())

# pid 文件路径
AGENT_PIP_PATH = str(pathlib.Path(f'{CONFIG_PATH}/ftp-client-agent.pip').resolve())

# __dirname
CONTEXT_PATH = str(pathlib.Path(__file__).parent.resolve())

# agent 文件名称
AGENT_EXE_NAME = 'ftp-client-agent'

# agent 文件路径
if 'Contents/MacOS' in CONTEXT_PATH:
    AGENT_EXE_PATH = str(pathlib.Path(f'{CONTEXT_PATH}/{AGENT_EXE_NAME}').resolve())
else:
    AGENT_EXE_PATH = str(pathlib.Path(f'{CONTEXT_PATH}/../../build/agent/{AGENT_EXE_NAME}').resolve())

# 首页 URL
INDEX_URL = 'http://localhost:8000'
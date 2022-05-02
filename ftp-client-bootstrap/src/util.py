import psutil
import config


def get_agent_process() -> psutil.Process | None:
    for p in psutil.process_iter():
        if p.name() == config.AGENT_EXE_NAME:
            return p
    return None
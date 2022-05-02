import os
import subprocess
import sys
import webbrowser
import PySide6.QtCore
import PySide6.QtWidgets
import config
import ui_dialog
import util


class Window(PySide6.QtWidgets.QDialog):

    def __init__(self):
        super(Window, self).__init__()
        self.ui = ui_dialog.Ui_Dialog()
        self.ui.setupUi(self)
        self.p = util.get_agent_process()
        if self.p is None:
            self.ui.button.setText('启动')
        else:
            self.ui.button.setText('停止')

    @PySide6.QtCore.Slot()
    def on_button_clicked(self) -> None:
        if self.p is None:
            try:
                self.p = subprocess.Popen([config.AGENT_EXE_PATH, '>', config.AGENT_LOG_PATH])
                self.ui.button.setText('停止')
                webbrowser.open(config.INDEX_URL)
            except Exception as e:
                self.ui.button.setText('启动')
        else:
            os.kill(self.p.pid, 9)
            self.p = None
            self.ui.button.setText('启动')


def main() -> None:
    app = PySide6.QtWidgets.QApplication(sys.argv)
    app.setStyle(PySide6.QtWidgets.QStyleFactory.create('Fusion'))
    window = Window()
    window.show()
    sys.exit(app.exec())


main()
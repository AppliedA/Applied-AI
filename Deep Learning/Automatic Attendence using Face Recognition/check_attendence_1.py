import sys
import csv
from PyQt5.QtCore import *
from PyQt5.QtGui import *
from PyQt5.QtWidgets import *
from PyQt5 import QtGui
from PyQt5 import QtCore
from PyQt5 import QtWidgets
 
import tensorflow as tf
import logging
tf.get_logger().setLevel(logging.ERROR)
                   
#Main Window
class AttendenceSheet(QWidget):
    def __init__(self,name):
        super().__init__()
        self.title = 'Attendence_Sheet '+name
        self.left = 0
        self.top = 0
        self.width = 800
        self.height = 600
        
        self.name = name
        
        self.setWindowTitle(self.title)
        self.setGeometry(self.left, self.top, self.width, self.height)
        
        self.model = QtGui.QStandardItemModel(self)
        
        self.tableView = QtWidgets.QTableView(self)
        self.tableView.setModel(self.model)
        self.tableView.horizontalHeader().setStretchLastSection(True)
        #self.tableWidget.horizontalHeader().setSectionResizeMode(QHeaderView.Stretch)
        
        self.createTable()
   
        self.layout = QVBoxLayout()
        self.layout.addWidget(self.tableView)
        self.setLayout(self.layout)
   
        #Show window
        self.show()
   
    #Create table
    def createTable(self):
        with open(self.name,"r") as fileInput:
            for rows in csv.reader(fileInput):
                items = [QtGui.QStandardItem(field) for field in rows]
                self.model.appendRow(items)
   
if __name__ == '__main__':
    app = QApplication(sys.argv)
    ex = AttendenceSheet()
    sys.exit(app.exec_())
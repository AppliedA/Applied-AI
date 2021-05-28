#!/usr/bin/env python
# coding: utf-8

# In[3]:


import sys
import cv2
import os
from PyQt5.QtCore import *
from PyQt5.QtGui import *
from PyQt5.QtWidgets import *
from PyQt5 import QtGui
from PyQt5 import QtCore

from keras_vggface.utils import preprocess_input
from keras_vggface.vggface import VGGFace
from scipy.spatial.distance import cosine
from matplotlib.patches import Rectangle
from matplotlib import pyplot as plt
from mtcnn.mtcnn import MTCNN
from numpy import asarray
from PIL import Image
from imutils import paths

from registeration_window_1 import RegistrationWindow
from attendence_window_1 import AttendenceWindow
from check_attendence_1 import AttendenceSheet

import tensorflow as tf
import logging
tf.get_logger().setLevel(logging.ERROR)

class window(QWidget):
    def __init__(self):
        super(window, self).__init__()
        self._registration_window = None
        self._attendance_window = None
        self.setGeometry(300,50,800,600)
        self.setWindowTitle("Automated Attendance System")
        self.setWindowIcon(QtGui.QIcon(''))
        
        h=QLabel(self)
        h.setAlignment(QtCore.Qt.AlignCenter)
        h.setGeometry(QtCore.QRect(100,30,600,60))
        h.setStyleSheet("QLabel { background-color : blue;color :white ; }")
        font=QtGui.QFont("Times",20,QtGui.QFont.Bold)
        h.setFont(font)
        h.setText("AUTOMATED ATTENDANCE SYSTEM")
        
        b1=QPushButton(self)
        b1.setText("REGISTRATION")
        font1=QtGui.QFont("Times",16,QtGui.QFont.Bold)
        b1.setFont(font1)
        b1.setGeometry(275,200,275,50)
        b1.setStyleSheet("QPushButton { background-color : gray;color :black ; }")
        b1.clicked.connect(self.create_registration_window)
        
        b2=QPushButton(self)
        b2.setText("ATTENDANCE")
        b2.setFont(font1)
        b2.setGeometry(275,300,275,50)
        b2.setStyleSheet("QPushButton { background-color : gray;color :black ; }")
        b2.clicked.connect(self.create_attendance_window)
        
        b3=QPushButton(self)
        b3.setText("View Attendence Sheets")
        b3.setFont(font1)
        b3.setGeometry(275,400,275,50)
        b3.setStyleSheet("QPushButton { background-color : gray;color :black ; }")
        b3.clicked.connect(self.check_attendance_sheet)

    def create_registration_window(self):
        #Function for opening Registration window
        self._registration_window = RegistrationWindow()
        self._registration_window.show()
        
        
    def create_attendance_window(self):
        #Function for opening Attendance window
        self._attendance_window = AttendenceWindow()
        self._attendance_window.show()
        
    def check_attendance_sheet(self):
        fname,_ = QFileDialog.getOpenFileName(self, 'Open file', 'Attendence Sheets/',"Excel files (*.csv *.xlxs)")
        self._attendence_sheet_window = AttendenceSheet(fname)
        self._attendence_sheet_window.show()
'''
def __init__(self, parent = None):
      super(window, self).__init__(parent)
      self.resize(200,50)
      self.setWindowTitle("PyQt5")
      self.label = QLabel(self)
      self.label.setText("Hello World")
      font = QFont()
      font.setFamily("Arial")
      font.setPointSize(16)
      self.label.setFont(font)
      self.label.move(50,20)'''
    
def main():
   app = QApplication(sys.argv)
   ex = window()
   ex.show()
   sys.exit(app.exec_())
if __name__ == '__main__':
   main()


# In[ ]:





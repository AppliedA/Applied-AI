#!/usr/bin/env python
# coding: utf-8

# In[1]:


import csv
import numpy as np
import os
import time
import datetime
import cv2

from PIL import Image
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
from numpy import loadtxt
from PIL import Image
from imutils import paths

import tensorflow as tf
import logging
tf.get_logger().setLevel(logging.ERROR)

from registeration_window_1 import RegistrationWindow
from check_attendence_1 import AttendenceSheet

class AttendenceWindow(QWidget):
    #Attendance Window
    def __init__(self):
        super(AttendenceWindow, self).__init__()
        self.setGeometry(300,50,800,600)
        self.setWindowTitle("Attendance")
        #self.setWindowIcon(QtGui.QIcon('other_images/logo.png'))

        #Heading
        h=QLabel(self)
        h.setAlignment(QtCore.Qt.AlignCenter)
        h.setGeometry(QtCore.QRect(200,20,400,50))
        h.setStyleSheet("QLabel { background-color : blue;color :white ; }")
        font=QtGui.QFont("Times",20,QtGui.QFont.Bold)
        h.setFont(font)
        h.setText("ATTENDANCE")

        #Label and Subject code entry
        l=QLabel(self)
        l.setAlignment(QtCore.Qt.AlignCenter)
        l.setGeometry(QtCore.QRect(275,140,250,30))
        l.setStyleSheet("QLabel { background-color:green;color: white;}")
        font=QtGui.QFont("Times",16,QtGui.QFont.Bold) 
        l.setFont(font)
        l.setText("ENTER SUB-CODE")

        self.e = QLineEdit(self)
        self.e.setGeometry(275,175,250,50)
        self.e.setAlignment(QtCore.Qt.AlignCenter)
        self.e.setFont(QtGui.QFont("Times",18,QtGui.QFont.Bold))

        
        l1=QLabel(self)
        l1.setAlignment(QtCore.Qt.AlignCenter)
        l1.setGeometry(QtCore.QRect(275,275,250,30))
        l1.setStyleSheet("QLabel { background-color:green;color: white;}")
        l1.setFont(font)
        l1.setText("ENTER DATE")
        
        
        current_date = datetime.date.today()
        current_date = current_date.strftime("%d_%m_%Y")
        
        self.e1 = QLineEdit(self)
        self.e1.setGeometry(275,310,250,50)
        self.e1.setAlignment(QtCore.Qt.AlignCenter)
        self.e1.setFont(QtGui.QFont("Times",18,QtGui.QFont.Bold))
        self.e1.setText(current_date)
        
        self.le = QLabel()
        
        self.l4=QLabel(self)
        self.l4.setAlignment(QtCore.Qt.AlignCenter)
        self.l4.setStyleSheet("QLabel {  color:green ; }")
        self.l4.setFont(QtGui.QFont('Times',13))
        
        font1=QtGui.QFont("Arial",11)
        self.e3=QLineEdit(self)
        self.e3.setGeometry(75,400,300,30)
        self.e3.setAlignment(QtCore.Qt.AlignCenter)
        self.e3.setFont(font1)
        self.e3.setText("Uploaded path will be shown here")
        
        #Recording Button
        b1=QPushButton(self)
        b1.setText("Upload photo and mark")
        b1.setStyleSheet("QPushButton { background-color : gray;color : black ; }")
        b1.setFont(font)
        b1.setGeometry(400,400,350,30)
        b1.clicked.connect(self.upload_photo_and_mark)

        #Check Attendance button to check specific subject's Attendance
        b2=QPushButton(self)
        b2.setText("Check Attendence Sheet")
        b2.setStyleSheet("QPushButton { background-color : gray;color : black ; }")
        b2.setFont(font)
        b2.setGeometry(215,450,350,50)
        b2.clicked.connect(self.check_attendance_sheet)
    
    def get_model_scores(self,faces):
        samples = asarray(faces, 'float32')

        # prepare the data for the model
        samples = preprocess_input(samples, version=2)

        # create a vggface model object
        model = VGGFace(model='resnet50',
          include_top=False,
          input_shape=(224, 224, 3),
          pooling='avg')

        # perform prediction
        return model.predict(samples)
    
    def extract_face_from_image(self,image_path, required_size=(224, 224)):
        #load image and detect faces
        image = plt.imread(image_path)
        detector = MTCNN()
        faces = detector.detect_faces(image)

        #list for storing images(in array form)
        face_images = []
        
        plt.imshow(image)

        #for plotting rectangle above detected faces
        ax = plt.gca()

        # for each face, draw a rectangle based on coordinates
        for face in faces:
            x, y, width, height = face['box']
            face_border = Rectangle((x, y), width, height,
                              fill=False, color='red')
            ax.add_patch(face_border)
        plt.show()

        for face in faces:
            #extract the bounding box from the requested face
            x1, y1, width, height = face['box']
            x2, y2 = x1 + width, y1 + height

            # extract the face
            face_boundary = image[y1:y2, x1:x2]

            # resize pixels to the model size
            face_image = Image.fromarray(face_boundary)
            face_image = face_image.resize(required_size)
            face_array = asarray(face_image)
            face_images.append(face_array)

        return face_images
    
    
    def upload_photo_and_mark(self):
        check_value = self.check()
        self.l4.setGeometry(QtCore.QRect(40,525,550,30))
        if (check_value == 2):
            self.l4.setText("Enter Subject Id or there is some kind of error")
        elif (check_value == 3):
            self.l4.setText("Enter Date or there is some kind of error")
        else:
            fname,_ = QFileDialog.getOpenFileName(self, 'Open file', 'c:\\',"Image files (*.jpg *.gif)")
            self.l4.setText("Wait until model is recognising faces")
            print(fname)
            self.e3.setText(fname)
            self.l4.setText("Wait until model is recognising faces")
            # creating a image object (main image) 
            im1 = Image.open(fname) 
            self.le.setPixmap(QPixmap(fname))
            base_image_dict = {}
            base_image_dict_matrix = {}
            
            scores = ''
            
            
            with open('data/data_score.csv', mode='r') as file:
                scores = loadtxt(file,delimiter=',')
                #base_image_score_list = list[reader]
                #print(base_image_score_list)
                '''
                with open('data_matrix.csv', mode='r') as file:
                    reader = csv.reader(file)
                    base_image_matrix_list = list[reader]
                    print(base_image_matrix_list)
                '''
            #print(scores)
            
            labels = []
            with open('data/data_label.csv', mode='r') as file:
                reader = csv.reader(file)
                for row in reader:
                    labels.append(row)
            #print(labels)
            
            if(len(scores)!=1):        
                base_image_dict = {labels[i][0]:scores[i] for i in range(len(labels))}
            else:
                base_image_dict[labels[0]] = scores
            
            #print(base_image_dict)
            '''
            if(len(scores)==1):
                base_image_dict[labels[0]] = scores
            else:
                for i,j in scores,labels:
                    base_image_dict[j] = i
            '''
            #print(base_image_dict)
            '''
                    with open('data.csv', mode='r') as inp:
                    reader = csv.reader(inp)
                    base_image_dict_matrix = {rows[0]:rows[2] for rows in reader}
                
                print(base_image_dict)
                print(base_image_dict_matrix)
            '''
            '''
            except FileNotFoundError:
                print("No data to be matched given")
                self.l4.setGeometry(QtCore.QRect(75,550,600,30))
                self.l4.setText("No pretrained model found... Try registering students before")
            except:
                print("error opening the file")
                self.l4.setGeometry(QtCore.QRect(75,550,600,30))
                self.l4.setText("Error while recognition")
            '''
            current_date = datetime.date.today()
            current_date = current_date.strftime("%d/%m/%Y")
        
            attendence = []
            attendence_mark = [['Name','TimeStamp']]
            
            recognised_faces = self.extract_face_from_image(fname)
    
            model_scores_for_recognised_faces = self.get_model_scores(recognised_faces)
            #print(model_scores_for_recognised_faces)
            
            for idx, face_score_1 in enumerate(model_scores_for_recognised_faces):
                for name,face_score_2 in base_image_dict.items():
                    '''
                    print(face_score_1)
                    print("***")
                    print(face_score_2)
                    print()
                    print(len(face_score_1)," : ",len(face_score_2))
                    '''
                    score = cosine(face_score_1, face_score_2)
                    #print(score)
        
                    '''
                    print()
                    print(recognised_faces[idx])
                    print("*-***************************************")
                    print(base_image_dict_matrix[name][0])
                    '''
        
                    if score <= 0.40:
                      # Printing the IDs of faces and score
                      #print(idx, name, score)
                      x = [name,str(current_date)]  
                      attendence_mark.append(x)
                      attendence.append(name)
                      # Displaying each matched pair of faces
                      plt.imshow(recognised_faces[idx])
                      plt.title(name)
                      print(name)
                      plt.show()
                      #plt.imshow(RegistrationWindow.base_image_dict_matrix[name][0])
                      #plt.show()
                #print(attendence)
                if(len(attendence_mark)!=0):
                    self.l4.setText(str(len(attendence_mark)-1)+" faces recognised. View Attendence sheet by Check Attendence Button")
                    with open("Attendence Sheets/"+self.e.text()+self.e1.text()+".csv","w",newline='') as file:
                        writer = csv.writer(file)
                        writer.writerows(attendence_mark)
                else:
                    self.l4.setText("Sorry No faces recognised")
                    
    def check(self):        
        subject_id = self.e.text()
        if(len(subject_id) == 0):
            return 2
        
        date = self.e1.text()
        if (len(date) == 0):
            return 3
        
        return 0    
          
    
    def check_attendance_sheet(self):
        self._attendence_sheet_window = AttendenceSheet("Attendence Sheets/"+self.e.text()+self.e1.text()+".csv")
        self._attendence_sheet_window.show()
    
if __name__ == '__main__':
    app = QApplication([])
    gui = AttendenceWindow()
    gui.show()
    app.exec_()


# In[ ]:





# In[ ]:





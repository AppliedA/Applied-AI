


# In[ ]:
import sys
import PIL
import csv
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
from numpy import savetxt
from PIL import Image
from imutils import paths
import pandas as pd
import numpy

import tensorflow as tf
import logging
tf.get_logger().setLevel(logging.ERROR)

class RegistrationWindow(QWidget):
    #Registration window for student registration 
    def __init__(self):
        super(RegistrationWindow, self).__init__()
        fname = '' 
        #Creating Registration Window 
        self.setGeometry(300,50,800,600)
        self.setWindowTitle("Registration")
        self.setWindowIcon(QtGui.QIcon('other_images/logo.png'))

        #Heading
        h=QLabel(self)
        h.setAlignment(QtCore.Qt.AlignCenter)
        h.setGeometry(QtCore.QRect(100,30,600,60))
        h.setStyleSheet("QLabel { background-color : blue;color :white ; }")
        font=QtGui.QFont("Times",20,QtGui.QFont.Bold)
        h.setFont(font)
        h.setText("REGISTRATION")

        #Pseudo photo ID to be replaced by Student's Photo
        self.pic=QLabel(self)
        self.pic.setGeometry(50,120,320,320)
        #self.pic.setPixmap(QtGui.QPixmap("other_images/default.png"))

        #Button for opening file system and selecting photo 
        b=QPushButton(self)
        b.setText("Browse Image")
        b.setFont(QtGui.QFont("Times",12,QtGui.QFont.Bold))
        b.setGeometry(600,350,150,30)
        b.clicked.connect(self.getfile)
        
        font=QtGui.QFont("Times",14,QtGui.QFont.Bold)
        font1=QtGui.QFont("Arial",14)
        #SET OF ENTRIES
        '''
        #Taking Student's Name
        
        '''
        #Taking Student's Registration Number
        l2=QLabel(self)
        l2.setAlignment(QtCore.Qt.AlignVCenter)
        l2.setGeometry(QtCore.QRect(50,150,400,30))
        l2.setStyleSheet("QLabel { background-color : gray;color :black ; }")
        l2.setFont(font)
        l2.setText("    ROLL NO.")

        self.e2=QLineEdit(self)
        self.e2.setGeometry(250,150,300,30)
        self.e2.setAlignment(QtCore.Qt.AlignCenter)
        self.e2.setFont(font1)

        #Taking Student's Year of Study
        l3=QLabel(self)
        l3.setAlignment(QtCore.Qt.AlignVCenter)
        l3.setGeometry(QtCore.QRect(50,250,400,30))
        l3.setStyleSheet("QLabel { background-color : gray;color :black ; }")
        l3.setFont(font)
        l3.setText("  Admission_Year")
        
        self.e3=QLineEdit(self)
        self.e3.setGeometry(250,250,300,30)
        self.e3.setAlignment(QtCore.Qt.AlignCenter)
        self.e3.setFont(font1)
        
        #storing path
        l1=QLabel(self)
        l1.setAlignment(QtCore.Qt.AlignVCenter)
        l1.setGeometry(QtCore.QRect(50,350,400,30))
        l1.setStyleSheet("QLabel { background-color : gray;color :black ; }")
        l1.setFont(font)
        l1.setText("     Path")

        self.e1=QLineEdit(self)
        self.e1.setGeometry(250,350,300,30)
        self.e1.setAlignment(QtCore.Qt.AlignCenter)
        self.e1.setFont(font1)
        
        #Button for clearing fields 
        b2=QPushButton(self)
        b2.setText("RESET")
        b2.setFont(QtGui.QFont("Times",12,QtGui.QFont.Bold))
        b2.setGeometry(650,450,100,30)
        b2.setStyleSheet("QPushButton { background-color : red ;color : white ; }")
        self.entries=[self.e1,self.e2,self.e3]
        b2.clicked.connect(self.erase)
        
        #Label for displaying message
        self.l4=QLabel(self)
        self.l4.setAlignment(QtCore.Qt.AlignCenter)
        self.l4.setStyleSheet("QLabel {  color:green ; }")
        self.l4.setFont(QtGui.QFont('Times',13))
    
        self.le = QLabel()
        #Button for submission of data and storing in database 
        b1=QPushButton(self)
        b1.setText("SUBMIT")
        b1.setFont(QtGui.QFont("Times",12,QtGui.QFont.Bold))
        b1.setGeometry(520,450,100,30)
        b1.setStyleSheet("QPushButton { background-color : green;color : white ; }")
        b1.clicked.connect(self.message)
        
        self.temp_path=''
        
    def getfile(self):
      fname,_ = QFileDialog.getOpenFileName(self, 'Open file', 'c:\\',"Image files (*.jpg *.gif)")
      print(fname)
      self.e1.setText(fname)
      check_value = self.check()
      self.l4.setGeometry(QtCore.QRect(40,500,250,30))
      if (check_value == 2):
          self.l4.setText("Error in Roll no")
      elif (check_value == 3):
          self.l4.setText("Year should be between 2016 to 2024")
      elif (check_value == 4):
          self.l4.setText("select image again please.")
      else:      
          # creating a image object (main image) 
          im1 = Image.open(fname) 
          # save a image using extension
          im1 = im1.save("data/Images/"+self.e2.text()+"_"+self.e3.text()+".jpg")
          self.le.setPixmap(QPixmap(fname))
          self.l4.setGeometry(QtCore.QRect(40,500,750,30))
          self.l4.setText("Click Submit and Wait until model is trained, i.e. it wll show successfull message")
    
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
    
    def message(self):
        x = []

        check_value = self.check()
        self.l4.setGeometry(QtCore.QRect(40,500,250,30))
        if(check_value==0):
            image_directory_path = 'data/Images/'
            label = self.e2.text()+"_"+self.e3.text()
            print(label)
            temp = self.extract_face_from_image(image_directory_path+self.e2.text()+"_"+self.e3.text()+".jpg")
            base_image_score = self.get_model_scores(temp)
            print(base_image_score)
            #savetxt('data.csv',base_image_score,delimiter=',')
            #savetxt('data.csv',base_image_score,delimiter=',')
            x.append(label)
            #x[score] = base_image_score
            #x.append(temp)
            
            #savetxt('data.csv',base_image_score,mode='a',delimiter=',')
            
            with open('data/data_score.csv','ab') as file:
                savetxt(file,base_image_score,delimiter=',')
            '''
            with open('data_matrix.csv','ab') as file:
                reshaped = temp[0].reshape(-1)
                reshaped = reshaped.T
                savetxt(file,reshaped,delimiter=',')
            '''
            with open('data/data_label.csv','a',newline='') as file:
                writer = csv.writer(file)
                writer.writerow(x)
        
            self.l4.setText("Successfully Registered")
            
    def erase(self):
        #function for clearing fields and changing to default
        for entry in self.entries:
            entry.clear()
        #self.pic.setPixmap(QtGui.QPixmap("other_images/default.png"))
        self.l4.setText("")

    def check(self):        
        roll = self.e2.text()
        if(roll.isnumeric()):
            pass
        elif(len(roll) == 0):
            return 2
        
        try:
            year = int(self.e3.text())
            if (year < 2016 or year > 2024):
                return 3
        except:
            return 3
           
        try:
            detector = MTCNN()
            print(self.e1.text())
            image = plt.imread(self.e1.text())
            faces = detector.detect_faces(image)
            if (len(faces) != 1):
                return 4
        except:
            return 4
        
        return 0
        
def main():
   app = QApplication(sys.argv)
   ex = RegistrationWindow()
   ex.show()
   sys.exit(app.exec_())
if __name__ == '__main__':
   main()


# In[ ]:





# In[ ]:





# In[ ]:







# In[ ]:





# In[ ]:





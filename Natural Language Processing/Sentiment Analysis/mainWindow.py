from PyQt5.QtCore import *
from PyQt5.QtGui import *
from PyQt5.QtWidgets import *
from PyQt5 import QtGui
from PyQt5 import QtCore

import csv
            
import pickle
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

import re
import nltk
nltk.download('stopwords')
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer

from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import GaussianNB

dataset = pd.read_csv('IMDB Dataset.csv')

corpus = []
with open("corpus.csv",'r') as f:
    read = csv.reader(f)
    linecount=0
    for row in read:
        if(linecount%2==0):
            corpus.append(row[0])
        linecount+=1
cv = CountVectorizer(max_features = 1500)
X = cv.fit_transform(corpus).toarray()
y = dataset.iloc[:, -1].values

class SentimentWindow(QWidget):
    #Attendance Window
    def __init__(self):
        super(SentimentWindow, self).__init__()
        self.setGeometry(300,50,800,500)
        self.setWindowTitle("Sentiment Analyser")
        #self.setWindowIcon(QtGui.QIcon('other_images/logo.png'))

        #Heading
        h=QLabel(self)
        h.setAlignment(QtCore.Qt.AlignCenter)
        h.setGeometry(QtCore.QRect(200,20,400,50))
        h.setStyleSheet("QLabel { background-color : blue;color :white ; border-radius : 10px}")
        font=QtGui.QFont("Times",20,QtGui.QFont.Bold)
        h.setFont(font)
        h.setText("Sentiment Analysis")

        '''
        #Label and review code entry
        l=QLabel(self)
        l.setAlignment(QtCore.Qt.AlignCenter)
        l.setGeometry(QtCore.QRect(275,140,200,30))
        l.setStyleSheet("QLabel { background-color:green;color: white;border-radius : 10px}")
        font=QtGui.QFont("Times",16,QtGui.QFont.Bold) 
        l.setFont(font)
        l.setText("Enter Review")
        '''

        self.e = QLineEdit(self)
        self.e.setFont(QtGui.QFont("Times",12,QtGui.QFont.Bold))
        self.e.setPlaceholderText("Please enter review")
        self.setFocus()
        self.e.setGeometry(50,140,675,35)
        self.e.setAlignment(QtCore.Qt.AlignCenter)
       
        
        
        self.le = QLabel()
        
        self.l4=QLabel(self)
        self.l4.setAlignment(QtCore.Qt.AlignCenter)
        self.l4.setStyleSheet("QLabel {  color:green ; border-radius:10px}")
        self.l4.setFont(QtGui.QFont('Times',16))
        self.l4.setGeometry(220,350,350,40)
        self.l4.setText("")
        
        #Check sentiment button to check specific review for sentiment
        font1=QtGui.QFont("Times",15,QtGui.QFont.Bold)
        b2=QPushButton(self)
        b2.setText("Check Sentiment")
        b2.setStyleSheet("QPushButton { background-color : gray;color : black ; border-radius : 10px}")
        b2.setFont(font1)
        b2.setGeometry(255,200,275,40)
        b2.clicked.connect(self.check_sentiment)
    
    def check_sentiment(self):
        # here will be the code for trained model
        self.l4.setText("")
        
        f = open('classifier.pickle', 'rb')
        classifier = pickle.load(f)
        f.close()
        
        all_stopwords = stopwords.words('english')
        words = ["not", "against", "aren't", "couldn't","didn't", "doesn't", "hadn't", "hasn't", "haven't", "isn't", "mightn't",  "mustn't", "needn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't"]
        
        for w in words:
          all_stopwords.remove(w)
        
        new_review = self.e.text()
        new_review = re.sub('[^a-zA-Z]', ' ', new_review)
        new_review = new_review.lower()
        new_review = new_review.split()
        ps = PorterStemmer()
        new_review = [ps.stem(word) for word in new_review if not word in set(all_stopwords)]
        new_review = ' '.join(new_review)
        new_corpus = [new_review]
                
        
        print(len(X))
        print(len(y))
        
        new_X_test = cv.transform(new_corpus).toarray()
        new_y_pred = classifier.predict(new_X_test)
        print(new_y_pred)
        if(new_y_pred[0]=='negative'):
            self.l4.setStyleSheet("QLabel {  color:red ;background-color:#FFCCCB; border-radius:10px}")
        else:
            self.l4.setStyleSheet("QLabel {  color:green ;background-color:lightgreen; border-radius:10px}")
        self.l4.setText("This review is "+new_y_pred[0])
        

if __name__ == '__main__':
    app = QApplication([])
    gui = SentimentWindow()
    gui.show()
    app.exec_()
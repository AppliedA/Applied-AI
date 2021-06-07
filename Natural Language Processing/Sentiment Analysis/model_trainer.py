'''

import pickle
f = open('my_classifier.pickle', 'wb')
pickle.dump(classifier, f)
f.close()


import pickle
f = open('my_classifier.pickle', 'rb')
classifier = pickle.load(f)
f.close()

'''


# importing necessary libraries
import pickle
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

import csv
import re
import nltk
nltk.download('stopwords')
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer

from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import GaussianNB
from sklearn.linear_model import LogisticRegression


#part for reading data set
dataset = pd.read_csv('IMDB Dataset.csv')
#print(dataset)
#print(len(dataset['review']))


###########  For Naive Bayes Model  #############
#part for refining the data for training
'''
corpus = []
all_stopwords = stopwords.words('english')
words = ["not", "against", "aren't", "couldn't","didn't", "doesn't", "hadn't", "hasn't", "haven't", "isn't", "mightn't",  "mustn't", "needn't", "shan't", "shouldn't", "wasn't", "weren't", "won't", "wouldn't"]

for w in words:
  all_stopwords.remove(w)
  
ps = PorterStemmer()
writing_rows = []

for i in range(0, len(dataset['review'])):
   review = re.sub('[^a-zA-Z]', ' ', dataset['review'][i])
   review = review.lower()
   review = review.split()
   #ps = PorterStemmer()
   review = [ps.stem(word) for word in review if not word in set(all_stopwords)]
   review = ' '.join(review)
   corpus.append(review)
   x = [review]
   writing_rows.append(x)

print(len(writing_rows))

with open("corpus.csv",'w') as f:
   writer = csv.writer(f)
   writer.writerows(writing_rows)
  
#print(corpus)

  
#part for defining bag of word model
cv = CountVectorizer(max_features = 1500)
X = cv.fit_transform(corpus).toarray()
y = dataset.iloc[:, -1].values

print(len(X))
print(len(y))


# Splitting the data into training and testing
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.20, random_state = 0)

# Training the Naive Bayes model on the Training set
classifier = GaussianNB()
classifier.fit(X_train, y_train)

#saving the model
f = open('classifier.pickle', 'wb')
pickle.dump(classifier, f)
f.close()

# Making the Confusion Matrix
from sklearn.metrics import confusion_matrix, accuracy_score
y_pred = classifier.predict(X_test)
cm = confusion_matrix(y_test, y_pred)
print(cm)
accuracy_score(y_test, y_pred)
'''


############# For Logistic Regression  ###############

corpus = []
with open("corpus.csv",'r') as f:
    read = csv.reader(f)
    linecount=0
    for row in read:
        if(linecount%2==0):
            corpus.append(row[0])
        linecount+=1

print(len(corpus))
cv = CountVectorizer(max_features = 1500)
X = cv.fit_transform(corpus).toarray()
y = dataset.iloc[:, -1].values

print(len(X))
print(len(y))

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.20, random_state = 0)

classifier = LogisticRegression(random_state = 0)
classifier.fit(X_train, y_train)

f = open('classifier.pickle', 'wb')
pickle.dump(classifier, f)
f.close()

# Making the Confusion Matrix
from sklearn.metrics import confusion_matrix, accuracy_score
y_pred = classifier.predict(X_test)
cm = confusion_matrix(y_test, y_pred)
print(cm)
print(accuracy_score(y_test, y_pred))



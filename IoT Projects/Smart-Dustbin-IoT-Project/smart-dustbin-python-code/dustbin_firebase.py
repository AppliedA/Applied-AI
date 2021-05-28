
from time import *
import os,sys
import RPi.GPIO as GPIO
from gpiozero import LED
import paho.mqtt.client as mqtt
import urlparse
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("Path to firebase credentials JSON File")
firebase_admin.initialize_app(cred)

db = firestore.client()
dist_ref = db.collection(u'distance').document(u'dustbin')

def show_distance():
    GPIO.output(TRIG, False)
    #print("Waiting For Sensor To Settle")
    sleep(0.05)

    GPIO.output(TRIG, True)
    sleep(0.00001)
    GPIO.output(TRIG, False)

    while GPIO.input(ECHO)==0:
        pulse_start = time()

    while GPIO.input(ECHO)==1:
        pulse_end = time()

    pulse_duration = pulse_end - pulse_start
    distance = pulse_duration * 17150
    distance = round(distance, 2)

    print ("-->    Distance:",int(distance),"cm")

    return int(distance)




GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

TRIG = 23
ECHO = 18

red = 17
green = 4


GPIO.setup(TRIG,GPIO.OUT)
GPIO.setup(ECHO,GPIO.IN)

GPIO.setup(red,GPIO.OUT)
GPIO.setup(green,GPIO.OUT)

i = 0
dist = []


while True:
    result = show_distance()
    dist_ref.update({u'value': result})
    if result < 9:
        GPIO.output(green, False)
        GPIO.output(red, True)
    else:
        GPIO.output(red, False)
        GPIO.output(green, True)
    i=i+1
    sleep(0.5)

# print("Added to firebase")

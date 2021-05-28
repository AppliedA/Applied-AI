
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from time import sleep
import RPi.GPIO as GPIO

cred = credentials.Certificate("Path for Firebase Credentials JSON file")
firebase_admin.initialize_app(cred)

db = firestore.client()

GPIO.setmode(GPIO.BCM)
GPIO.setup(4,GPIO.OUT)



while True:
    try:
        status_ref = db.collection(u'LEDStatus').document(u'voicecontrol')
        status=status_ref.get()
        #print(format(status.to_dict()[u'status']))
        #print(status.to_dict()[u'status'])
        output_data = not(status.to_dict()[u'status'])
        print(not(output_data))
        GPIO.output(4,output_data)

    except google.cloud.exeption.NotFound:
        print(u'No Data Found')
    sleep(1)


# Self Driving Car - IoT Project
# Author @ Tirth Patel

from time import *
import RPi.GPIO as GPIO
import random




def show_distance():
    GPIO.output(TRIG, False)
    #print("Waiting For Sensor To Settle")
    sleep(0.05)

    GPIO.output(TRIG, True)
    sleep(0.05)
    GPIO.output(TRIG, False)

    while GPIO.input(ECHO)==0:
        pulse_start = time()

    while GPIO.input(ECHO)==1:
        pulse_end = time()

    pulse_duration = pulse_end - pulse_start
    distance = pulse_duration * 17150
    distance = round(distance, 2)

    print ("Distance:",distance,"cm")

    return int(distance)




def forward():
    #print("[INFO] Moving forward")
    GPIO.output(in1,GPIO.HIGH)
    GPIO.output(in3,GPIO.HIGH)
    GPIO.output(in2,GPIO.LOW)
    GPIO.output(in4,GPIO.LOW)
def backward():
    #print("[INFO] Moving backward")
    GPIO.output(in2,GPIO.HIGH)
    GPIO.output(in4,GPIO.HIGH)
    GPIO.output(in1,GPIO.LOW)
    GPIO.output(in3,GPIO.LOW)  
def right():
    #print("[INFO] Turning right")
    GPIO.output(in1,GPIO.HIGH)
    GPIO.output(in3,GPIO.LOW)
    GPIO.output(in2,GPIO.LOW)
    GPIO.output(in4,GPIO.LOW)  
def left():
    #print("[INFO] Turning left")
    GPIO.output(in1,GPIO.LOW)
    GPIO.output(in3,GPIO.HIGH)
    GPIO.output(in2,GPIO.LOW)
    GPIO.output(in4,GPIO.LOW) 
def uturn_left():
    #print("[INFO] Turning left")
    GPIO.output(in1,GPIO.LOW)
    GPIO.output(in3,GPIO.HIGH)
    GPIO.output(in2,GPIO.HIGH)
    GPIO.output(in4,GPIO.LOW) 
def uturn_right():
    #print("[INFO] Turning left")
    GPIO.output(in1,GPIO.HIGH)
    GPIO.output(in3,GPIO.LOW)
    GPIO.output(in2,GPIO.LOW)
    GPIO.output(in4,GPIO.HIGH)  
def brake():
    #print("[INFO] Brake applied")
    GPIO.output(in1,GPIO.LOW)
    GPIO.output(in3,GPIO.LOW)
    GPIO.output(in2,GPIO.LOW)
    GPIO.output(in4,GPIO.LOW)  


in1 = 17
in2 = 4
in3 = 27
in4 = 22
#ena = 27
#enb = 24

TRIG = 23
ECHO = 18

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

GPIO.setup(in1,GPIO.OUT)
GPIO.setup(in2,GPIO.OUT)
GPIO.setup(in3,GPIO.OUT)
GPIO.setup(in4,GPIO.OUT)

GPIO.setup(TRIG,GPIO.OUT)
GPIO.setup(ECHO,GPIO.IN)


GPIO.output(in1,GPIO.LOW)
GPIO.output(in2,GPIO.LOW)
GPIO.output(in3,GPIO.LOW)
GPIO.output(in4,GPIO.LOW)




print("\n")
print("[INFO] The basic setup is ready...")
print("\n")



brake()
sleep(3)

while True:

    sleep(0.5)
    dist = show_distance()
   

    if dist<=50:
        brake()
        sleep(1)
        backward()
        sleep(1)
        brake()
        sleep(0.5)
        choice = random.randint(1,2)
        if choice==1:
            uturn_right()
        elif choice==2:
            uturn_left()
        sleep(3)
        brake()
        sleep(0.5)
        #forward()
        #continue
    else:
        forward()

   
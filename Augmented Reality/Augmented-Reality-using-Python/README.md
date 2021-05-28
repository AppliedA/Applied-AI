# Augmented Reality using Python

<img src="https://firebasestorage.googleapis.com/v0/b/smart-home-9497d.appspot.com/o/Other%20Images%2Faugmented-reality.png?alt=media&token=51b595cf-b0b2-4f46-9685-4eb38024c824" alt="augmented reality" width="200" />

### Plot any images or 3D model on real world  object using OpenCV


- In this Computer Vision project we have used **ARUco Markers** backed by **OpenCV** to augment any 2D/3D image on any physical object . 

- The OpenCV tracks the ARUco markers present in the input frame &#8594; Mark the bounding frame around it &#8594; Augments the provided image on that bounding frame.

![aruco marker](https://lh3.googleusercontent.com/proxy/23uzxchUk_wExOUFEjk4zs-YrSB92aD3w2eIyabi4i81dJcDmojDkQbGDHQGne2gzBdki_ITDHkIIfFR-xXkvRxwBEdq4r1X8-8)
Image Source : [jevois.org](https://jevois.org)

- This overall process is made possible using advanced image processing techniques like Homography and Image Masking. 

- This tracking & masking is done in real-time, so as a rendered product it seems that there is no ARUco marker. Instead there is a 3D Model itself. Please have a look at the working demo in below section.

\#AR &nbsp;&nbsp;   \#OpenCV

<br>

## Project Features

 - AR implementation in Python 🔥
 - Realtime masking of image 🖼️
 - Good accuracy with ARUco Markers 📈
 
 <br>
 
 ## Technologies Used
 - [x] Python <img src="https://firebasestorage.googleapis.com/v0/b/smart-home-9497d.appspot.com/o/Other%20Images%2F005-python.png?alt=media&token=067ada19-745a-4e4b-be1a-55c389e05fb3" alt="drawing" width="20"/>
 - [x] OpenCV <img src="https://firebasestorage.googleapis.com/v0/b/smart-home-9497d.appspot.com/o/Other%20Images%2Fopencv.png?alt=media&token=9293b45e-1f45-4da1-abae-4fa05dc0a753" alt="opencv" width="20"/>

 
<br>

 ## Working Demo
 [Click](https://www.youtube.com/watch?v=P4YSgWi4zEQ&list=PLdaWlSfDidCTVN303hA-2RGtthdIk1PxM&index=8) on the image below to see the working demo of the project.
 
 <br>
 
[![2D/3D Object Plotting - Augmented Reality](http://img.youtube.com/vi/P4YSgWi4zEQ/0.jpg)](https://www.youtube.com/watch?v=P4YSgWi4zEQ&list=PLdaWlSfDidCTVN303hA-2RGtthdIk1PxM&index=8 "2D/3D Object Plotting - Augmented Reality")
 
<br>

 ## Installation & Implementation

1.  Clone the repository on your system
    
    `git clone https://github.com/tirth-2001/Meditech-Healthcare.git`
    
2.  Or direct download ZIP file in your system
3. For running the project, first make a playcard which has respective ARUco Marker pasted on it. Take reference from the video shown in the demo section above.
4. Go to the project folder in which `ar_python.py` file is present. Open it , and check the relative path for reference marker, images to augment etc.
5. For running the code, install the dependencies mentioned in the `requirements.txt` file.
6. Finally, if everything is ready and installed, execute the `ar_python.py` file and you will see the window which shows the augmented mask on your playcard frame.

<br>

## References

> [opencv.org](https://opencv.org)
> [computervision.zone](https://www.computervision.zone/)

<br>

## Closing Comments

 - [x] Interested? 
 - [ ] Cloned?
 - [ ] Starred the Repo?
 
*Thanks for showing interest in this project. In case if you face any bugs while implementing this project, feel free to contact me. I'll we happy to help you out.*
 

 


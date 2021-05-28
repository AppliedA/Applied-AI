


import cv2 as cv
#from cv2 import aruco
import argparse
import sys
import os.path
import numpy as np

cap = cv.VideoCapture('video4.mp4')
#frame = cv.imread('test.jpg')

outputFile = "ar_out.avi"

show = cv.VideoCapture('ironman2.mp4')

#video = cv.imread('blue2.jpg')

# Get the video writer initialized to save the output video
vid_writer = cv.VideoWriter(outputFile, cv.VideoWriter_fourcc('M','J','P','G'), 28, (round(2*cap.get(cv.CAP_PROP_FRAME_WIDTH)),round(cap.get(cv.CAP_PROP_FRAME_HEIGHT))))

winName = "Augmented Reality using Aruco markers in OpenCV"

while cv.waitKey(1) < 0:
    try:
        # get frame from the video
        hasFrame, frame = cap.read()
        ret, video = show.read()
        #video = cv.resize(video,(frame.shape[1],frame.shape[0]))
        # Stop the program if reached end of video
        if not hasFrame:
            print("Done processing !!!")
            print("Output file is stored as ", outputFile)
            cv.waitKey(3000)
            break

        #Load the dictionary that was used to generate the markers.
        dictionary = cv.aruco.Dictionary_get(cv.aruco.DICT_7X7_250)
        
        # Initialize the detector parameters using default values
        parameters =  cv.aruco.DetectorParameters_create()
        
        # Detect the markers in the image
        markerCorners, markerIds, rejectedCandidates = cv.aruco.detectMarkers(frame, dictionary, parameters=parameters)
        #print(markerCorners, markerIds, rejectedCandidates)

        index = np.squeeze(np.where(markerIds==34));
        refPt1 = np.squeeze(markerCorners[index[0]])[0];
        
        index = np.squeeze(np.where(markerIds==40));
        refPt2 = np.squeeze(markerCorners[index[0]])[3];

        distance = np.linalg.norm(refPt1-refPt2);
        
        scalingFac = 0.02;
        pts_dst = [[refPt1[0] - round(scalingFac*distance), refPt1[1] - round(scalingFac*distance)]];
        pts_dst = pts_dst + [[refPt2[0] + round(scalingFac*distance), refPt2[1] - round(scalingFac*distance)]];
        
        index = np.squeeze(np.where(markerIds==33));
        refPt3 = np.squeeze(markerCorners[index[0]])[2];
        pts_dst = pts_dst + [[refPt3[0] + round(scalingFac*distance), refPt3[1] + round(scalingFac*distance)]];

        index = np.squeeze(np.where(markerIds==60));
        refPt4 = np.squeeze(markerCorners[index[0]])[2];
        pts_dst = pts_dst + [[refPt4[0] - round(scalingFac*distance), refPt4[1] + round(scalingFac*distance)]];

        pts_src = [[0,0], [video.shape[1], 0], [video.shape[1], video.shape[0]], [0, video.shape[0]]];
        
        pts_src_m = np.asarray(pts_src)
        pts_dst_m = np.asarray(pts_dst)

        # Calculate Homography
        h, status = cv.findHomography(pts_src_m, pts_dst_m)
        
        # Warp source image to destination based on homography
        warped_image = cv.warpPerspective(video, h, (frame.shape[1],frame.shape[0]))
        
        # Prepare a mask representing region to copy from the warped image into the original frame.
        mask = np.zeros([frame.shape[0], frame.shape[1]], dtype=np.uint8);
        cv.fillConvexPoly(mask, np.int32([pts_dst_m]), (255, 255, 255), cv.LINE_AA);

        # Erode the mask to not copy the boundary effects from the warping
        element = cv.getStructuringElement(cv.MORPH_RECT, (3,3));
        mask = cv.erode(mask, element, iterations=3);

        # Copy the mask into 3 channels.
        warped_image = warped_image.astype(float)
        mask3 = np.zeros_like(warped_image)
        for i in range(0, 3):
            mask3[:,:,i] = mask/255

        # Copy the warped image into the original frame in the mask region.
        warped_image_masked = cv.multiply(warped_image, mask3)
        frame_masked = cv.multiply(frame.astype(float), 1-mask3)
        im_out = cv.add(warped_image_masked, frame_masked)
        
        # Showing the original image and the new output image side by side
        concatenatedOutput = cv.hconcat([frame.astype(float), im_out]);
        cv.imshow("AR using Aruco markers", concatenatedOutput.astype(np.uint8))
        
        #Write the frames in video file
        vid_writer.write(concatenatedOutput.astype(np.uint8))
        #vid_writer.write(concatenatedOutput.astype(np.uint8))


    except Exception as inst:
        print(inst)

cv.destroyAllWindows()
if 'vid_writer' in locals():
    vid_writer.release()
    print('Video writer released..')

import numpy as np
import argparse
import time
import cv2
import imutils
from imutils.video import FPS


def detectVideo(args, config_path, weight_path, ln, write_output, show_display):
    # vs = cv2.VideoCapture(args["video"])
    # writer = None
    (W, H) = (None, None)
    cap = cv2.VideoCapture(args["video"])

    if (cap.isOpened() == False):
        print("[INFO] Error opening video stream or file")
        return

    (success, frame) = cap.read()
    # frame = imutils.resize(frame, width=640)
    if write_output:
        out = cv2.VideoWriter("output/prediction.avi", cv2.VideoWriter_fourcc(
            *"MJPG"), cap.get(cv2.CAP_PROP_FPS), (frame.shape[1], frame.shape[0]), True)

    fps = FPS().start()
    print("[INFO] detecting objects in video...")
    while success:
        # frame = imutils.resize(frame, width=640)
        if W is None or H is None:
            (H, W) = frame.shape[:2]

        # Construct blob of frames by standardization, resizing, and swapping Red and Blue channels (RBG to RGB)
        blob = cv2.dnn.blobFromImage(
            frame, 1 / 255.0, (416, 416), swapRB=True, crop=False)
        net.setInput(blob)
        layerOutputs = net.forward(ln)
        boxes = []
        confidences = []
        classIDs = []
        for output in layerOutputs:
            for detection in output:
                scores = detection[5:]
                classID = np.argmax(scores)
                confidence = scores[classID]
                if confidence > args["confidence"]:
                    # Scale the bboxes back to the original image size
                    box = detection[0:4] * np.array([W, H, W, H])
                    (centerX, centerY, width, height) = box.astype("int")
                    x = int(centerX - (width / 2))
                    y = int(centerY - (height / 2))
                    boxes.append([x, y, int(width), int(height)])
                    confidences.append(float(confidence))
                    classIDs.append(classID)

        # Remove overlapping bounding boxes and boundig boxes
        bboxes = cv2.dnn.NMSBoxes(
            boxes, confidences, args["confidence"], args["threshold"])
        if len(bboxes) > 0:
            for i in bboxes.flatten():
                (x, y) = (boxes[i][0], boxes[i][1])
                (w, h) = (boxes[i][2], boxes[i][3])
                color = [int(c) for c in COLORS[classIDs[i]]]
                cv2.rectangle(frame, (x, y), (x + w, y + h), color, 1)
                text = "{}: {:.4f}".format(LABELS[classIDs[i]], confidences[i])
                cv2.putText(frame, text, (x, y - 5),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 1)

        if show_display:
            cv2.imshow("Predictions", frame)
            key = cv2.waitKey(1) & 0xFF
            # if the `q` key was pressed, break the loop
            if key == ord("q"):
                break

        if write_output:
            out.write(frame)

        fps.update()
        (success, frame) = cap.read()
    fps.stop()
    print("Elasped time: {:.2f}".format(fps.elapsed()))
    print("FPS: {:.2f}".format(fps.fps()))
    cap.release()
    if write_output:
        out.release()
    cv2.destroyAllWindows()


def detectImage(args, config_path, weight_path, ln):
    # load image from arguments and get it's height & width
    print("[INFO] loading input image...")
    image = cv2.imread(args["image"])
    (H, W) = image.shape[:2]

    # getting a blob image to compare & perfoming forward pass
    blob = cv2.dnn.blobFromImage(image, 1 / 255.0, (416, 416),
                                 swapRB=True, crop=False)
    net.setInput(blob)
    start = time.time()
    layerOutputs = net.forward(ln)
    end = time.time()
    print("[INFO] YOLO took {:.6f} seconds".format(end - start))

    boxes = []
    confidences = []
    classIDs = []

    # extracting detected object's IDs, Coordinates and Confidence
    for output in layerOutputs:
        for detection in output:
            scores = detection[5:]
            classID = np.argmax(scores)
            confidence = scores[classID]

            if(confidence >= args["confidence"]):
                box = detection[0:4] * np.array([W, H, W, H])
                (centerX, centerY, width, height) = box.astype("int")
                # exctracting top-left corner
                tlx = int(centerX - (width / 2))
                tly = int(centerY - (height / 2))
                # update our list of bounding box coordinates, confidences,
                # and class IDs
                boxes.append([tlx, tly, int(width), int(height)])
                confidences.append(float(confidence)*100.0)
                classIDs.append(classID)

    # applying non-maxima suppression to remove overlapping boxes
    idxs = cv2.dnn.NMSBoxes(
        boxes, confidences, args["confidence"], args["threshold"])

    print("[INFO] Object Detection Completed!")
    # drawing boxes on image
    if len(idxs) > 0:
        for i in idxs.flatten():
            (x, y) = (boxes[i][0], boxes[i][1])
            (w, h) = (boxes[i][2], boxes[i][3])
            # draw a bounding box rectangle and label on the image
            color = [int(c) for c in COLORS[classIDs[i]]]
            cv2.rectangle(image, (x, y), (x + w, y + h), color, 2)
            text = "{}: {:.1f}%".format(
                LABELS[classIDs[i]], confidences[i])
            cv2.putText(image, text, (x, y - 5), cv2.FONT_HERSHEY_DUPLEX,
                        0.5, color, 1)

    # saving the output image
    print("[INFO] Saving Output Image!")
    cv2.imwrite("output/prediction.png", image)

    # display the output image
    cv2.imshow("Image", image)
    cv2.waitKey(0)


if __name__ == "__main__":
    args = argparse.ArgumentParser()
    args.add_argument("-i", "--image")
    args.add_argument("-v", "--video")
    args.add_argument("-c", "--confidence", type=float, default=0.5)
    args.add_argument("-t", "--threshold", type=float, default=0.3)
    args = vars(args.parse_args())
    LABELS = open("model_data/coco.names").read().strip().split("\n")

    # list of colours to display
    np.random.seed(42)
    COLORS = np.random.randint(0, 255, (len(LABELS), 3), "uint8")

    # configuring the weights and cfgs
    print("[INFO] loading weights...")
    config_path = "model_data/yolov4.cfg"
    weight_path = "model_data/yolov4.weights"

    # load YOLO object detector
    print("[INFO] loading YOLO object detector...")
    net = cv2.dnn.readNetFromDarknet(config_path, weight_path)

    # getting output layer from YOLO
    ln = net.getLayerNames()
    ln = [ln[i[0] - 1] for i in net.getUnconnectedOutLayers()]

    if(args["video"]):
        detectVideo(args, config_path, weight_path, ln, True, False)
    else:
        detectImage(args, config_path, weight_path, ln)

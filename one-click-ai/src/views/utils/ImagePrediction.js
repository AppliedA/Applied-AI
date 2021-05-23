import React, { useState } from 'react';

import { setApiKey, callStandardApi } from 'deepai';

import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Backdrop } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Button from '@material-ui/core/Button';

import firebase from 'firebase/app';
const DEEP_AI = process.env.REACT_APP_DEEP_AI;
setApiKey(DEEP_AI);

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const ImagePrediction = () => {
  const [borderShadow, setBorderShadow] = useState('');
  const [progress, setProgress] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [msg, setMsg] = useState('');
  const [output, setOutput] = useState('');
  const [msgColor, setMsgColor] = useState('#ff9800');
  const classes = useStyles();

  const filePicker = e => {
    e.preventDefault();
    handleFiles(e.target.files[0]);
    setBorderShadow('');
  };
  const dragEnter = e => {
    e.preventDefault();
    setBorderShadow('show__border__shadow');
  };
  const dragOver = e => {
    e.preventDefault();
    setBorderShadow('show__border__shadow');
  };

  const dragLeave = e => {
    e.preventDefault();
    setBorderShadow('');
  };

  const fileDrop = e => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files[0]);
    setBorderShadow('');
  };
  const handleFiles = async file => {
    try {
      const extName = file.name.split('.').pop();
      const ext = ['jpeg', 'png', 'gif', 'jpg', 'jfif'];
      const extRes = ext.findIndex(res => res === extName);

      if (extRes === undefined || extRes === -1)
        return setMsg('Not a valid Image');

      const metaData = {
        contentType: file.type,
      };
      const storageRef = await firebase.storage().ref();
      const randomFileName = Math.random().toString(36).substr(2, 15);
      let uploadTask = storageRef
        .child(`/user-uploaded-imgs/${randomFileName}`)
        .put(file, metaData);
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          setProgress(
            Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          );

          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED:
              setProgress(null);
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
            default:
              break;
          }

          if (progress === 100) {
            setProgress(null);
          }
        },
        err => {
          console.log(err);
          setMsgColor('#ff9800');
          setMsg('Something Went Wrong');
        },
        () => {
          uploadTask.snapshot.ref
            .getDownloadURL()
            .then(downloadURL => {
              setMsgColor('#4caf50');
              setMsg('Image Uploaded');
              setDownloadUrl(downloadURL);
              setProgress(null);
              document.getElementById('imgs').scrollIntoView();
            })
            .catch(error => {
              setMsgColor('#ff9800');
              setMsg('Something Went Wrong');
              console.log(error);
            });
        }
      );
    } catch (error) {
      setMsgColor('#ff9800');
      setMsg('Something Went Wrong');
      console.log(error);
    }
  };
  const handlePredict = async () => {
    if (downloadUrl === '') return setMsg('Please Upload Image');
    try {
      await callStandardApi('neuraltalk', {
        image: downloadUrl,
      })
        .then(res => {
          setOutput(res.output);
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="card-wrapper bottom">
        <Backdrop
          className={classes.backdrop}
          open={progress > 0 && progress !== null ? true : false}
        >
          <Box position="relative" display="inline-flex">
            <CircularProgress
              variant="determinate"
              color="secondary"
              value={progress}
            />
            <Box
              top={0}
              left={0}
              bottom={0}
              right={0}
              position="absolute"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography
                variant="caption"
                component="div"
              >{`${progress}%`}</Typography>
            </Box>
          </Box>
        </Backdrop>
        <Snackbar
          open={msg === '' ? false : true}
          autoHideDuration={3000}
          onClose={() => setMsg('')}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <SnackbarContent
            message={msg}
            style={{ backgroundColor: msgColor, color: 'white' }}
          />
        </Snackbar>
        <h2 className="p-3">
          Upload any image of disaster and our AI model will predict the
          disaster right on the browser!
        </h2>
        <div className="upload__cover mt-4">
          <div
            className={'upload__border ' + borderShadow}
            onDragOver={dragOver}
            onDragEnter={dragEnter}
            onDragLeave={dragLeave}
            onDrop={fileDrop}
          >
            <div className="upload">
              <div className="upload__img__animation">
                <img src="./images/image-upload.svg" alt="img-upload" />
              </div>
              <h4 className="upload__img__txt">
                drop your images or click to Browse
              </h4>
              <div className="upload__file">
                <input
                  type="file"
                  name="file"
                  id="file"
                  className="inputfile"
                  accept="image/*"
                  onChange={filePicker}
                />
                <label htmlFor="file">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="17"
                    viewBox="0 0 20 17"
                  >
                    <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" />
                  </svg>
                  <span>Select Image&hellip;</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex__newline"></div>
        <div className="upload">
          <Button
            onClick={handlePredict}
            variant="contained"
            color="primary"
            size="large"
            id="predict"
          >
            PREDICT
          </Button>
        </div>
      </div>

      {downloadUrl !== '' ? (
        <>
          <div className="flex img__flex__direction bottom" id="imgs">
            <div className="align__center m-4">
              <h3>Input Image</h3>
              <img src={downloadUrl} alt="input-img" />
            </div>
            <div className="align__center m-4">
              <h3>Output</h3>
              <h5>{output}</h5>
            </div>
          </div>
          <div className="flex__newline"></div>
        </>
      ) : null}
    </>
  );
};

export default ImagePrediction;

var db = firebase.firestore();

      function changeFavicon(src) {
       var link = document.createElement('link'),
           oldLink = document.getElementById('dynamic-favicon');
       link.id = 'dynamic-favicon';
       link.rel = 'shortcut icon';
       link.href = src;
       if (oldLink) {
        document.head.removeChild(oldLink);
       }
       document.head.appendChild(link);
      }

      changeFavicon('./img/microphone.png');

      function textToAudio(text_input,vol=1) {
        // let msg = document.getElementById("text-to-speech").value;
        // var synth = speechSynthesis;
        // console.log(synth);
        var voices = speechSynthesis.getVoices();
        // console.log(voices);
        let speech = new SpeechSynthesisUtterance();
        // var voices = speech.getVoices();
        speech.lang = "en-US";

        speech.text = text_input;
        speech.volume = vol;
        speech.rate = 1;
        speech.pitch = 0.5;
        speech.voice = voices[1];

        window.speechSynthesis.speak(speech);
      }

      var btn = document.createElement('button');

      btn.onclick = () => {
        textToAudio("welcome",0)

        setTimeout(() => {
          textToAudio("Welcome to Smart Home!")

          textToAudio("Click on the mic icon & speak your command")

        }, 100);
        // console.log("inside");
        // speak_something();
      }
      btn.click();

      // changeFavicon("../img/microphone.png");

    /* JS comes here */
      function runSpeechRecognition() {
          // get output div reference
          var output = document.getElementById("output");

          var output = document.getElementsByClassName("object");
          var outline = document.createElement('div');
          var outline_delayed = document.createElement('div');

          // get action element reference
          var action = document.getElementById("action");
              // new speech recognition object
              var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
              var recognition = new SpeechRecognition();

              // This runs when the speech recognition service starts
              recognition.onstart = function() {

                  outline.setAttribute("class","outline");
                  outline_delayed.setAttribute("class","outline");
                  outline_delayed.setAttribute("id","delayed");
                  output[0].appendChild(outline);
                  output[0].appendChild(outline_delayed);

                  // outline.class = "outline";
                  // outline_delayed.class = "outline";
                  // outline_delayed.id = "delayed";
                  // object.appendChild(outline);
                  // object.appendChild(outline_delayed);
                  // action.innerHTML = "<small>listening, please speak...</small>";
              };

              recognition.onspeechend = function() {
                  // action.innerHTML = "<small>stopped listening, hope you are done...</small>";
                  output[0].removeChild(outline);
                  output[0].removeChild(outline_delayed);
                  recognition.stop();
              }

              // This runs when the speech recognition service returns result
              recognition.onresult = function(event) {
                  var transcript = event.results[0][0].transcript;
                  var confidence = event.results[0][0].confidence;
                  console.log(transcript);
                  getinference(transcript);

                  // output.innerHTML = "<b>Text:</b> " + transcript + "<br/> <b>Confidence:</b> " + confidence*100+"%";
                  // output.classList.remove("hide");
              };

               // start recognition
               recognition.start();



               // console.log(window.transcript);
        }


        var getinference = (snap) => {
          var speech_data = snap.toLowerCase();
          console.log(speech_data);
          var speech_parts = speech_data.split(" ");
          console.log(speech_parts);
          var flag_on = speech_parts.includes("on");
          var flag_off = speech_parts.includes("off");
          var flag_current = "bac";
          db.collection('LEDStatus').doc("voicecontrol").get().then(doc =>{
            flag_current=doc.data().status;
            // console.log(flag_current);
            if(flag_on===true && flag_current===false){
              textToAudio("Device Turned On!");
              console.log("Flag On & Current Off");
              db.collection("LEDStatus").doc("voicecontrol")
            	.set({
            		status:true
            	});
            }
            else if(flag_off===true && flag_current===true){
              textToAudio("Device Turned Off!");
              console.log("Flag Off & Current On");
              db.collection("LEDStatus").doc("voicecontrol")
            	.set({
            		status:false
            	});
            }
            else if(flag_on===true){
              textToAudio("Device is already on!");
              console.log("Device is already on!");
              db.collection("LEDStatus").doc("voicecontrol")
            	.set({
            		status:true
            	});
            }
            else if(flag_off===true){
              textToAudio("Device is already off!");
              console.log("Device Already Off!");
              db.collection("LEDStatus").doc("voicecontrol")
            	.set({
            		status:false
            	});
            }
            else {
              textToAudio("Didn't Recognize Command. Please Speak Again!");
              console.log("Didn't Recognize. Speak Again!");
            }
          });

          // console.log(flag_current);



          // alert(flag);

        }

      // real time update
      //
      // db.collection("LEDStatus").onSnapshot(function(snap){
      // 	snap.docChanges().forEach(function(change){
      // 		if(change.type==="added"){
      //       var led_status = change.doc.data().status;
      //       if(led_status){
      //         // alert("LED Turned On!");
      //         // document.body.style.backgroundColor = "white";
      //       }
      //       else{
      //         // alert("LED Turned Off!");
      //         // document.body.style.backgroundColor = '#222032'";
      //       }
      //
      // 			// console.log("Status :",change.doc.data().status);
      // 			// $("#chkLED").prop('checked',change.doc.data().status);
      // 		}
      // 		if(change.type==="modified"){
      //
      //       var led_status = change.doc.data().status;
      //       if(led_status){
      //         // alert("LED Turned On!");
      //         // document.body.style.backgroundColor = "white";
      //
      //       }
      //       else{
      //         // alert("LED Turned Off!");
      //         // document.body.style.backgroundColor = '#222032'";
      //
      //       }
      //
      // 			// console.log("Status :",change.doc.data().status);
      //
      // 		}
      //
      // 	});
      // });

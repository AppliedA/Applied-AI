grad = document.querySelector("#grad3");
report = document.querySelector("#report");

db.collection("distance").doc("dustbin").set({
  value: 21,
});

var initial_depth = 28;

var x = document.getElementById("myAudio");

function playAudio() {
  // console.log("inside playAudio");
  x.play();
}

function pauseAudio() {
  // console.log("inside pauseAudio");

  x.pause();
}

var play_btn = document.createElement("button");
var stop_btn = document.createElement("button");
stop_btn.click();
play_btn.addEventListener("click", () => {
  playAudio();
});
stop_btn.addEventListener("click", () => {
  pauseAudio();
});

document.body.appendChild(play_btn);
document.body.appendChild(stop_btn);

play_btn.style.display = "none";
stop_btn.style.display = "none";

db.collection("distance")
  .doc("dustbin")
  .onSnapshot((snap) => {
    const dist = snap.data();
    // console.log(dist.value);

    var current_depth = dist.value;
    var filled_depth = initial_depth - current_depth;
    var filled_per = Math.trunc((filled_depth / initial_depth) * 100);

    console.table({ initial_depth, current_depth, filled_depth, filled_per });
    var depth1 = filled_per;
    var depth2 = 0;
    var color = current_depth > 9 ? "green" : "red";

    grad.childNodes[1].setAttribute("offset", `${depth1}%`);
    grad.childNodes[1].setAttribute(
      "style",
      `stop-color: ${color}; stop-opacity: 0.8;`
    );

    if (current_depth < 9) {
      // playAudio();
      // console.log(filled_per, "inside play");

      play_btn.click();
    } else {
      // console.log(filled_per, "inside pause");

      // pauseAudio();
      stop_btn.click();
    }
    grad.childNodes[3].setAttribute("offset", `${depth2}%`);
    report.innerHTML = `<span style="color:${color};">Dustbin is ${
      filled_per + 5
    }% filled </span>`;
  });

(function () {
  window.requestAnimFrame = (function (callback) {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimaitonFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();

  var canvas2 = document.getElementById("sig-canvas2");
  var ctx2 = canvas2.getContext("2d");
  ctx2.strokeStyle = "#222222";
  ctx2.lineWidth = 4;

  var drawing = false;
  var mousePos = {
    x: 0,
    y: 0,
  };
  var lastPos = mousePos;

  canvas2.addEventListener(
    "mousedown",
    function (e) {
      drawing = true;
      lastPos = getMousePos(canvas2, e);
    },
    false
  );

  canvas2.addEventListener(
    "mouseup",
    function (e) {
      drawing = false;
    },
    false
  );

  canvas2.addEventListener(
    "mousemove",
    function (e) {
      mousePos = getMousePos(canvas2, e);
    },
    false
  );

  // Add touch event support for mobile
  canvas2.addEventListener("touchstart", function (e) {}, false);

  canvas2.addEventListener(
    "touchmove",
    function (e) {
      var touch = e.touches[0];
      var me = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY,
      });
      canvas2.dispatchEvent(me);
    },
    false
  );

  canvas2.addEventListener(
    "touchstart",
    function (e) {
      mousePos = getTouchPos(canvas2, e);
      var touch = e.touches[0];
      var me = new MouseEvent("mousedown", {
        clientX: touch.clientX,
        clientY: touch.clientY,
      });
      canvas2.dispatchEvent(me);
    },
    false
  );

  canvas2.addEventListener(
    "touchend",
    function (e) {
      var me = new MouseEvent("mouseup", {});
      canvas2.dispatchEvent(me);
    },
    false
  );

  function getMousePos(canvas2Dom, mouseEvent) {
    var rect = canvas2Dom.getBoundingClientRect();
    return {
      x: mouseEvent.clientX - rect.left,
      y: mouseEvent.clientY - rect.top,
    };
  }

  function getTouchPos(canvas2Dom, touchEvent) {
    var rect = canvas2Dom.getBoundingClientRect();
    return {
      x: touchEvent.touches[0].clientX - rect.left,
      y: touchEvent.touches[0].clientY - rect.top,
    };
  }

  function rendercanvas2() {
    if (drawing) {
      ctx2.moveTo(lastPos.x, lastPos.y);
      ctx2.lineTo(mousePos.x, mousePos.y);
      ctx2.stroke();
      lastPos = mousePos;
    }
  }

  // Prevent scrolling when touching the canvas2
  document.body.addEventListener(
    "touchstart",
    function (e) {
      if (e.target == canvas2) {
        e.preventDefault();
      }
    },
    false
  );
  document.body.addEventListener(
    "touchend",
    function (e) {
      if (e.target == canvas2) {
        e.preventDefault();
      }
    },
    false
  );
  document.body.addEventListener(
    "touchmove",
    function (e) {
      if (e.target == canvas2) {
        e.preventDefault();
      }
    },
    false
  );

  (function drawLoop() {
    requestAnimFrame(drawLoop);
    rendercanvas2();
  })();

  function clearcanvas2() {
    canvas2.width = canvas2.width;
  }

  // Set up the UI
  var sigText = document.getElementById("sig-dataUrl");
  var sigImage = document.getElementById("sig-image");
  var clearBtn = document.getElementById("sig-clearBtn2");
  var submitBtn = document.getElementById("sig-submitBtn");
  clearBtn.addEventListener(
    "click",
    function (e) {
      clearcanvas2();
      sigText.innerHTML = "Data URL for your signature will go here!";
      sigImage.setAttribute("src", "");
    },
    false
  );
  submitBtn.addEventListener(
    "click",
    function (e) {
      var dataUrl = canvas2.toDataURL();
      sigText.innerHTML = dataUrl;
      sigImage.setAttribute("src", dataUrl);
    },
    false
  );
})();

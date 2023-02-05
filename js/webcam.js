// Obtener acceso a la cámara web
navigator.mediaDevices
  .getUserMedia({ video: true })
  .then(function (stream) {
    // Asignar el stream de la cámara web a un elemento <video>
    var video = document.getElementById("webcam");
    video.srcObject = stream;
    video.play();
  })
  .catch(function (error) {
    console.error("No se puede acceder a la cámara web:", error);
    alert("No se puede acceder a la cámara web:", error);
  });

$(document).ready(function () {
  $("#snap").click(function () {
    takePhoto();
    $("#sound-file")[0].play();
    $("#exampleModal").modal("show");
  });

  $("#close_modal").click(function (e) {
    $("#exampleModal").modal("hide");
  });

$("#btn_save").click(function (e) { 
  e.preventDefault();
   downloadImage();
});

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
// dibujar en el canvas
context.fillRect(10, 10, 50, 50);
$("#download-button").click(function (e) { 
  e.preventDefault();
  var dataURL = canvas.toDataURL("image/jpeg");
  // crear un enlace para descargar la imagen
  var link = document.createElement("a");
  link.download = "imagen.jpeg";
  link.href = dataURL;
  link.click();  
});
 
});

function takePhoto() {
  var canvas = document.getElementById("canvas");
  var video = document.getElementById("webcam");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  var context = canvas.getContext("2d");
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
}
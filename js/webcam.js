$(document).ready(function () {
  $("#snap").hide();
  var param = getParam();
  if (param === undefined || param === "") {
    Swal.fire(
      "URL Incorrecta",
      "La dirección web del navegador no es correcta.<br>La operación será cancelada",
      "error"
    );
  } else {
    console.log("Nro tramite: ", param);   
      // Obtener acceso a la cámara web
    getCamara();
   
  }

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


function getCamara() {
  // $.blockUI({ message: "<h1>Obtener acceso a la cámara web...</h1>" });  
  $('#container').block({ 
    message: '<h5>Obteniendo acceso a la cámara web...</h5>'
});   
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(function (stream) {
      // Asignar el stream de la cámara web a un elemento <video>
      var video = document.getElementById("webcam");
      video.srcObject = stream;
      video.play(); 
      $("#snap").show();
    })
    .catch(function (error) {
      // console.error("No se puede acceder a la cámara:", error);
      // alert("No se puede acceder a la cámara:", error);
      Swal.fire(
        "Error al acceder a la camara",
        `No se puede acceder a la cámara: <br> 
        Por favor verifique que <br>
       - Se encuentre conectada. <br>
       - Otro programa la tenga en uso.`
       ,
        "error"
      );
      $("#snap").hide();
    });
    $('#container').unblock();
}

function getParam() {
  // Obtiene la URL actual
  const currentUrl = window.location.href;
  // Crea un objeto URLSearchParams a partir de la URL actual
  const urlParams = new URLSearchParams(window.location.search);
  // Obtiene el valor de un parámetro específico (por ejemplo, "param")
  const paramValue = urlParams.get("ntramite");
  return paramValue;
}

function takePhoto() {
  var canvas = document.getElementById("canvas");
  var video = document.getElementById("webcam");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  var context = canvas.getContext("2d");
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
}

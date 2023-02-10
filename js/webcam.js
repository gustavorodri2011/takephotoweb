const canvas = document.querySelector("#canvas");

$(document).ready(function () {
  $("#snap").hide();

  if (CheckUrlWellFormed()) {
    var param = GetValueParam();
    if (!checkParamStatus(param)) {
      TriggerAlertBasic(
        "Error",
        "Parametro ntramite no esta presente en la url",
        "error"
      );
    } else {
      // Obtener acceso a la cámara web
      getCamara();
    }
  } else {
    TriggerAlertBasic("Error", "La dirección Url no es correcta.", "error");
  }

  var myModal = new bootstrap.Modal(document.getElementById("exampleModal"), {
    keyboard: false,
    backdrop: false,
  });
  $("#snap").click(function () {
    takePhoto();
    $("#sound-file")[0].play();
    myModal.show();
    //$("#exampleModal").modal("show");
  });

  $("#close_modal").click(function (e) {
    $("#exampleModal").modal("hide");
  });

  $("#btn__save").click(function (e) {
    e.preventDefault();
    sendImage(GetValueParam());
  });

  function CheckUrlWellFormed() {
    const currentUrl = window.location.href;
    if (currentUrl.includes("ntramite=")) {
      return true;
    }
    return false;
  }

  // $("#formImagen").submit(function (e) {
  //   e.preventDefault();

  //   var dataURL = canvas.toDataURL();
  //   var ntramite=GetValueParam();
  //   const url="https://localhost:7054/api/photo";
  //   var formData=new FormData();

  //   formData.append("tramite",ntramite);
  //   formData.append("imagen", dataURL);

  //   var xhr=new XMLHttpRequest();
  //   xhr.open("POST",url);
  //   xhr.send(formData);
  // });

  $("#btn_send").click(function (e) {
    e.preventDefault();
    sendImage();
  });

  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  // dibujar en el canvas
  context.fillRect(10, 10, 50, 50);
  //   $("#download-button").click(function (e) {
  //     e.preventDefault();
  //     var dataURL = canvas.toDataURL("image/jpeg");
  //     // crear un enlace para descargar la imagen
  //     var link = document.createElement("a");
  //     link.download = "imagen.jpeg";
  //     link.href = dataURL;
  //     link.click();
  //   });
});

function checkParamStatus(param) {
  if (param === undefined || param === "") {
    return false;
  }
  return true;
}

function TriggerAlertBasic(title, description, icon) {
  Swal.fire(
    title,
    description,
    icon
    // --TODO-- Implementar funcion para cerrar navegador web
  );
}

function TriggerAlertWithConfirmation(title, description, icon) {
  Swal.fire(
    title,
    description,
    icon
    // --TODO-- Implementar funcion para cerrar navegador web
  );
}

function getCamara() {
  // $.blockUI({ message: "<h1>Obtener acceso a la cámara web...</h1>" });
  $("#container").block({
    message: "<h5>Obteniendo acceso a la cámara web...</h5>",
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
       - Otro programa la tenga en uso.`,
        "error"
      );
      $("#snap").hide();
    });
  $("#container").unblock();
}

function GetValueParam() {
  // Obtiene la URL actual
  const currentUrl = window.location.href;
  // Crea un objeto URLSearchParams a partir de la URL actual
  const urlParams = new URLSearchParams(window.location.search);
  // Obtiene el valor de un parámetro específico (por ejemplo, "param")
  return urlParams.get("ntramite");
}

function takePhoto() {
  var canvas = document.getElementById("canvas");
  var video = document.getElementById("webcam");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  var context = canvas.getContext("2d");
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  var ntramite = GetValueParam();
  $("#ntramiteHiden").val(ntramite);
  console.log(ntramite);
}

<<<<<<< HEAD
function sendImage(ntramite) {
  const canvas = document.querySelector("#canvas");
  //const dataURL = canvas.toDataURL();

  canvas.toBlob( (blob) => {
    const file = new File( [ blob ], `${ntramite}.jpg` );
    const dT = new DataTransfer();
    dT.items.add( file );
    document.querySelector( "input" ).files = dT.files;
  } );

=======
function sendImage() {
  var canvas = document.getElementById("canvas");
  var dataURL = canvas.toDataURL();
  //Convert to Base64 string
  var base64 = getBase64StringFromDataURL(dataURL);
  var ntramite = GetValueParam();

  fetch("https://localhost:7054/api/photo", {
    method: "POST",
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({TramiteId:ntramite,ImageData: base64})
  })
    .then((response) => {
      if(response.status=="200"){
        TriggerAlertBasic("Éxito", "Imagen se guardó satisfactoriamente.", "success") 
    }})  
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
>>>>>>> 4c3148851e5ee2aa28ba4c6eb95cac2a563d48ae
}

const getBase64StringFromDataURL = (dataURL) =>
    dataURL.replace('data:', '').replace(/^.+,/, '');
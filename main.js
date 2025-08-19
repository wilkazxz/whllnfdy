<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Halaman Login - Face ID</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      text-align: center;
      padding: 50px;
      background: #f3f3f3;
    }
    h1 {
      color: #333;
    }
    video {
      border: 2px solid #333;
      border-radius: 8px;
      margin-top: 20px;
    }
    p {
      margin-top: 10px;
      color: #555;
    }
  </style>
</head>
<body>
  <h1>Login dengan Face ID</h1>
  <p>Arahkan wajah Anda ke kamera untuk masuk</p>

  <!-- Kamera -->
  <video id="video" width="320" height="240" autoplay muted></video>

  <!-- Load library face-api.js dari CDN -->
  <script src="https://cdn.jsdelivr.net/npm/@vladmandic/face-api/dist/face-api.min.js"></script>

  <script>
    const video = document.getElementById('video');

    // Aktifkan kamera
    navigator.mediaDevices.getUserMedia({ video: {} })
      .then(stream => { video.srcObject = stream })
      .catch(err => alert("Kamera tidak bisa diakses: " + err));

    // Load model face-api.js
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('https://justadudewhohacks.github.io/face-api.js/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('https://justadudewhohacks.github.io/face-api.js/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('https://justadudewhohacks.github.io/face-api.js/models')
    ]).then(start);

    async function start() {
      video.addEventListener('play', async () => {
        setInterval(async () => {
          const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions());
          
          // Jika ada wajah terdeteksi -> pindah ke main.html
          if (detections.length > 0) {
            window.location.href = "main.html"; 
          }
        }, 1500);
      });
    }
  </script>
</body>
</html>

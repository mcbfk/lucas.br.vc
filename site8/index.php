<!DOCTYPE html>
<html>
<head> 
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <title>LolMovies</title>
    <link rel="icon" href="./img/favicon.webp" type="image/png">
    <link rel="stylesheet" href="style.css" type="text/css" media="all" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
</head>
<body>
  <div class="page-wrapper">
    <video id="background-video" loop autoplay muted>
      <source src="./video/videoplayback.mp4" type="video/mp4">
    </video>
    <div id="overlay"></div>
    <div class="containerBody">
      <div id="container-overlay"></div>
      <h1>Filmes de</h1>
      <img class="img-fluid logo" src="./img/lol.webp" alt="League of Legends" />
      <div id="video-container">
        <?php
            $apiKey = "AIzaSyBGGMRi7ryWvZtEu1HBuYKNF4A-DLyfsxk";
            $playlistId = "PL641ZZYmJr0EV7iu-lJCMXq5dlhS11Ptv&si=d7O5-MT-k7ze23Z-";
            
            $apiUrl = "https://www.googleapis.com/youtube/v3/playlistItems?key=$apiKey&part=snippet&maxResults=10&playlistId=$playlistId";
            
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $apiUrl);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            $response = curl_exec($ch);
            curl_close($ch);

            $data = json_decode($response);

            if ($data && isset($data->items)) {
                foreach ($data->items as $item) {
                    $videoId = $item->snippet->resourceId->videoId;
                    $videoTitle = $item->snippet->title;
                    $videoThumbnail = $item->snippet->thumbnails->default->url;

                    echo "<div class='video col-md-3 mb-4' data-bs-toggle='' data-bs-target='#video' data-video-id='$videoId'>";
                    echo "<img src='$videoThumbnail' alt='$videoTitle' class='img-fluid'>";
                    echo "<p class='video-title'>$videoTitle</p>";
                    echo "</div>";
                }
            } else {
                echo "Nenhum vídeo encontrado.";
            }
        ?>
      </div>
    </div>
 <!--  -->
<div class=" fade" id="video" tabindex="-1" aria-labelledby="videoLabel" aria-hidden="true">
  <div class="-dialog -lg -dialog-centered custom">
    <div class="-content" style="border: none; background-color: transparent;">
      <div class="-body">
        <iframe id="videoIframe" width="100%" height="400" src="" frameborder="0" allowfullscreen></iframe>
      </div>
    </div>
  </div>
</div>

    <!-- ======= Footer ======= -->
    <footer id="footer">
      <div class="container-fluid">
        <div class="credits">
          Todos os direitos reservados à mcbfk &copy; Copyright2023 
        </div>
      </div>
    </footer>
    <!-- End Footer -->
  </div>

  <script>
    $('#video').on('show.bs.', function(event) {
      var button = $(event.relatedTarget);
      var videoId = button.data('video-id');
      var iframe = document.getElementById('videoIframe');
      iframe.src = "https://www.youtube.com/embed/" + videoId;
    });

    $('#video').on('hidden.bs.', function(event) {
      var iframe = document.getElementById('videoIframe');
      iframe.src = "";
    });
  </script>
</body>
</html>

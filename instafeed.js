var json;
function insta() {
  // Getting data from the given API using Ajax
  let req = new XMLHttpRequest();
  req.open(
    "POST",
    "https://elevate-be-staging.azurewebsites.net/instafeed.php",
    true
  );
  req.onreadystatechange = function () {
    if (req.readyState == 4 && req.status == 200) {
      json = JSON.parse(req.responseText);
      console.log(json);
      Info();
    }
  };
  req.send();
}

function Info() {
  document.getElementById("post").innerHTML +=
    "<center><img src=" +
    json.graphql.user.profile_pic_url +
    " style='border-radius: 75px; width: 150px; height: 150px;'><br><h3>@" +
    json.graphql.user.username +
    "</h3><br><h4>" +
    json.graphql.user.biography +
    "</h4><br><h3>" +
    json.graphql.user.full_name +
    "</h3><hr><h3>Followers: " +
    json.graphql.user.edge_followed_by.count +
    "&nbsp&nbsp&nbsp&nbsp Following: " +
    json.graphql.user.edge_follow.count +
    "</h3><br></center>";
}

function feeds() {
  var num_post = Object.keys(
    json.graphql.user.edge_owner_to_timeline_media.edges
  ).length;
  console.log(num_post);
  var k = 0;
  var n = "row";
  let igf = new XMLHttpRequest();
  document.getElementById("feed").innerHTML = "<div>";
  for (var i = 0; i < num_post; i = i + 2) {
    var postid = n + (i + 1).toString();
    console.log(postid);
    console.log(typeof postid);
    document.getElementById("feed").innerHTML +=
      "<div class='row' id=" + postid + ">";
    for (var j = 0; j < 2; j++) {
      var des = json.graphql.user.edge_owner_to_timeline_media.edges[
        k
      ].node.edge_media_to_caption.edges[0].node.text.substring(0, 180);
      var img =
        json.graphql.user.edge_owner_to_timeline_media.edges[k].node
          .display_url;
      igf.open("GET", img, false);
      igf.onreadystatechange = function () {
        if (igf.status == 200) {
          document.getElementById(postid).innerHTML +=
            "<div class='col' id='col'" +
            j +
            " ><div class='container' style='background-color: black; text-align: left; border-radius: 25px; height: 200px;width: 520px;display: flex;&__image {margin: 20px 30px 0 0;width: 200px; object-fit: contain;align-self: flex-start;}&__text {flex: 1 1 auto;}}'><img src=" +
            img +
            " style='height: 150px;width: 200px; border-radius: 25px;'>" +
            des +
            "...." +
            "</div></div>";
          console.log(img);
        } else if (igf.status == 403) {
          document.getElementById(postid).innerHTML +=
            "<div class='col' id='col'" +
            j +
            "><div class='container' style='background-color: black; text-align: left; border-radius: 25px; height: 200px;width: 520px;display: flex;&__image {margin: 20px 30px 0 0;width: 200px;object-fit: contain;align-self: flex-start;}&__text {flex: 1 1 auto;}}'><iframe height=' 150px' width= '200px' src=" +
            img +
            " type='video/mp4' style='border-radius: 25px;'></iframe>" +
            des +
            "...." +
            "</div></div>";
        }
      };
      igf.send();
      k++;
    }
    document.getElementById("feed").innerHTML += "</div><br><br><br>";
  }
  document.getElementById("feed").innerHTML +=
    "</div><a href='https://instagram.com/licetpattarai?igshid=1fm7dmacxpd3u' class='btn' role='button'><strong>OFFICIAL INSTAGRAM PAGE<strong></a><br><br>";
}

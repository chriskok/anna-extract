// import "./styles.css";
// import * as markerjs2 from "markerjs2";

var submit_button = document.getElementById('submit_button');

function showMarkerArea(target) {
  const markerArea = new markerjs2.MarkerArea(target);
  markerArea.availableMarkerTypes = ["FrameMarker"];
  markerArea.addRenderEventListener((imgURL) => {
    target.src = imgURL;
    console.log(markerArea.markers);

    const coords = [];
    markerArea.markers.forEach(element => {
      const current_coords = [element.width, element.height, element.centerX, element.centerY, element.top, element.left];
      coords.push(current_coords);

      // create text input for user to label
      var mainform = document.getElementById('mainform');
      var input = document.createElement("input");
      input.type = "text";
      input.name = "label" + coords.length;
      input.className = "form-control"; 
      // mainform.appendChild(input); // put it into the DOM
      submit_button.before(input)
      
    });
    data = [
      {
          "name":"image.png",
          "size":42410,
          "markers": coords
       }
    ]
    document.getElementById('my_hidden_input').value = JSON.stringify(data);
    console.log(document.getElementById('my_hidden_input').value);
  });
  markerArea.show();
}

const sampleImage = document.getElementById("sampleImage");
sampleImage.addEventListener("click", () => {
  showMarkerArea(sampleImage);
});

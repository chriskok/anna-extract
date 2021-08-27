var submit_button = document.getElementById('submit_button');
const coords = [];
const label_inputs = [];
const sampleImage = document.getElementById("sampleImage");

function showMarkerArea(target) {
  const markerArea = new markerjs2.MarkerArea(target);
  markerArea.availableMarkerTypes = ["FrameMarker"];
  markerArea.addRenderEventListener((imgURL) => {
    target.src = imgURL;
    // console.log(markerArea.markers);

    markerArea.markers.forEach(element => {
      // create text input for user to label
      var input = document.createElement("input");
      input.type = "text";
      input.name = "label" + coords.length;
      input.className = "form-control"; 
      submit_button.before(input)

      // const current_coords = [element.width, element.height, element.centerX, element.centerY, element.top, element.left];
      const current_coords = [element.width, element.height, element.top, element.left, sampleImage.width, sampleImage.height];
      coords.push(current_coords);
      label_inputs.push(input);
      // console.log(current_coords);
      // console.log(sampleImage.width, sampleImage.height);
    });
  });
  markerArea.show();
}

sampleImage.addEventListener("click", () => {
  showMarkerArea(sampleImage);
});

function parseData(){
  // need to warn user if items are not filled OR already in dict
  data_dict = {};
  count = 0;
  coords.forEach(element => {
    data_dict[label_inputs[count].value] = element
    count++;
  });

  document.getElementById('my_hidden_input').value = JSON.stringify(data_dict);
  // console.log(document.getElementById('my_hidden_input').value);
}

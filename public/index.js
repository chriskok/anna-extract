// import "./styles.css";
// import * as markerjs2 from "markerjs2";

function showMarkerArea(target) {
  const markerArea = new markerjs2.MarkerArea(target);
  markerArea.availableMarkerTypes = ["FrameMarker"];
  markerArea.addRenderEventListener((imgURL) => {
    target.src = imgURL;
    console.log(markerArea.markers);
  });
  markerArea.show();
}

const sampleImage = document.getElementById("sampleImage");
sampleImage.addEventListener("click", () => {
  showMarkerArea(sampleImage);
});

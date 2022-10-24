let qPoint = 0;
let markers = []

function updateQPoints() {
    qPoint++;
}
function getQPoints() {
    return qPoint;
}
function resetQPoints() {
    qPoint = 0;
}
function updateMarker(marker){
    markers.push(marker)
}
function clearMarkers(map) {
    markers.forEach((e) => map.removeLayer(e))
    return map
}
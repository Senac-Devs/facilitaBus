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
function returnPath (){    
    const caminho = [
    {"lat": -24.04497847821831, "lng":-52.37854166814854}, 
    {"lat": -24.045659,"lng": -52.377844},
    {"lat": -24.037977,"lng": -52.367882},
    {"lat": -24.036729,"lng": -52.369037},
    {"lat": -24.035601,"lng": -52.367646},
    {"lat": -24.034495,"lng": -52.366826},
    {"lat": -24.033158,"lng": -52.366350},
    {"lat": -24.032395,"lng": -52.366260},
    {"lat": -24.032170,"lng": -52.365979},
    {"lat": -24.031937,"lng": -52.365788},
    {"lat": -24.020738,"lng": -52.359591},
    {"lat": -24.020648,"lng": -52.359432},
    {"lat": -24.020659,"lng": -52.355850},
    {"lat": -24.020731,"lng": -52.355683},
    {"lat": -24.020758,"lng": -52.355606},
    {"lat": -24.0205, "lng": -52.3555},
    {"lat": -24.0121, "lng": -52.3556},
    {"lat": -24.0121, "lng": -52.3555},
    {"lat": -24.0078, "lng": -52.3518},
    {"lat": -24.0066, "lng": -52.3522},
    {"lat": -24.0046, "lng": -52.3531},
    {"lat": -24.0039, "lng": -52.3532},
    {"lat": -24.0032, "lng": -52.3531},
    {"lat": -24.0024, "lng": -52.3528},
];
    return caminho;
}
let qPoint = 0;
let departureMarker;
let arriveMarker;
let lines = [];
let arriveLines = [];
let departureLines = [];

function updateDepartureLines(line) {
    departureLines.push(line);
}
function updateArriveLines(line) {
    arriveLines.push(line);
}
function clearArriveLines(map) {
    arriveLines.forEach((e) => map.removeLayer(e));
    arriveLines = [];
    return map;
}
function clearDepartureLines(map) {
    departureLines.forEach((e) => map.removeLayer(e));
    departureLines = [];
    return map;
}
function getQPoints() {
    return qPoint;
}
function setQPoints(value) {
    qPoint = value;
    updateButton();
}
function setDepartureMarker(map, marker) {
    if (departureMarker === undefined) {
        departureMarker = marker;
    } else {
        map.removeLayer(departureMarker);
        departureMarker = marker;
    }
}
function setArriveMarker(map, marker) {
    if (arriveMarker === undefined) {
        arriveMarker = marker;
    } else {
        map.removeLayer(arriveMarker);
        arriveMarker = marker;
    }
}
function getLengthMarker() {
    return markers.length;
}
// function popMarker(map) {
//     map.removeLayer(markers[markers.length - 1])
//     markers.pop()
//     return map;
// }
// function clearMarkers(map) {
//     markers.forEach((e) => map.removeLayer(e));
//     markers = [];
//     return map;
// }

function calcDistKm(pointA, pointB) {
    const distancia =
        Math.sqrt(
            (pointB.lat - pointA.lat) ** 2 + (pointB.lng - pointA.lng) ** 2
        ) * 100;
    return parseFloat(distancia.toFixed(4));
}

function encontraMaisProx(pointA, caminhos) {
    const pontos = caminhos.length;
    let pontoMaisProx;
    let menorDistancia = 50000;

    for (let i = 0; i < pontos; i++) {
        distAtual = calcDistKm(pointA, caminhos[i]);
        if (distAtual <= menorDistancia) {
            menorDistancia = distAtual;
            pontoMaisProx = caminhos[i];
        }
    }
    return [pontoMaisProx, menorDistancia];
}

function createPath(map, L, caminho) {
    const firstpolyline = new L.Polyline(caminho["path"], {
        color: caminho["color"],
        weight: 6,
        opacity: 1.0,
        smoothFactor: 1,
    });
    firstpolyline.addTo(map);
}

function createPaths(map, L) {
    const caminhos = returnPaths();
    Object.keys(caminhos).forEach((linha) => {
        createPath(map, L, caminhos[linha]);
    });
}

function updatePoint(e) {
    let pointA;
    let pointB;
    if (getQPoints() === 0) {
        // criar o marcador
        const marker = new L.marker([e.latlng.lat, e.latlng.lng]);
        // Limpa o marcador antigo e salva o novo
        setDepartureMarker(map, marker);
        // Adciona o marcador ao mapa
        marker.addTo(map);
        // Pega coordenadas do ponto
        pointA = new L.LatLng(e.latlng.lat, e.latlng.lng);
        // Adiciona ao mapa
        c.setCoordinates(e);
        // Limpa linhas antigas
        clearDepartureLines(map);
        // Calcula novas distâncias e linhas
        setLinesToPaths(pointA, "departure");
    } else if (getQPoints() === 1) {
        // criar o marcador
        const marker = new L.marker([e.latlng.lat, e.latlng.lng]);
        // Limpa o marcador antigo e salva o novo
        setArriveMarker(map, marker);
        // Adciona o marcador ao mapa
        marker.addTo(map);
        // Pega coordenadas do ponto
        pointB = new L.LatLng(e.latlng.lat, e.latlng.lng);
        // Adiciona ao mapa
        c.setCoordinates(e);
        // Limpa linhas antigas
        clearArriveLines(map);
        // Calcula novas distâncias e linhas
        setLinesToPaths(pointB, "arrive");
        distanciaPontos = calcDistKm(pointA, pointB);
    }
    return [pointA, pointB];
}

function setLinesToPaths(point, typeLine) {
    let todosCaminhos = returnPaths();
    document.getElementById("distancias").innerHTML = "";
    const distancias = [];
    for (let i = 0; i < Object.keys(todosCaminhos).length; i++) {
        const item = todosCaminhos[Object.keys(todosCaminhos)[i]];
        let [pontoMaisProx, menorDistancia] = encontraMaisProx(
            point,
            item.path
        );
        let firstpolyline = new L.Polyline([point, pontoMaisProx], {
            color: item.color,
            weight: 3,
            opacity: 0.5,
            smoothFactor: 1,
        });
        if (typeLine === "departure") {
            updateDepartureLines(firstpolyline);
        } else {
            updateArriveLines(firstpolyline);
        }
        firstpolyline.addTo(map);
        distancias.push({
            dist: menorDistancia,
            nome: item.name,
        });
    }
    distancias.sort((a, b) => a.dist - b.dist);
    distancias.forEach(
        (e) =>
            (document.getElementById(
                "distancias"
            ).innerHTML += `<p> ${e.dist} km : ${e.nome} </p>`)
    );
}

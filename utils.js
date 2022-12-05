function calcDistKm(pointA, pointB) {
    const distancia =
        Math.sqrt(
            (pointB.lat - pointA.lat) ** 2 + (pointB.lng - pointA.lng) ** 2
        ) * 100;
    return parseFloat( distancia.toFixed(4));
}

function encontraMaisProx(pointA,caminhos) {
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
    updateLines(firstpolyline);
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
        const marker = new L.marker([e.latlng.lat, e.latlng.lng]);
        marker.addTo(map);
        setInitialMarker(marker);
        pointA = new L.LatLng(e.latlng.lat, e.latlng.lng);
        console.log(pointA);
        c.setCoordinates(e);
        console.log(c.setCoordinates(e), getQPoints());
        setLinesToPaths(pointA);
    } else if (getQPoints() === 1) {
        const marker = new L.marker([e.latlng.lat, e.latlng.lng]);
        marker.addTo(map);
        setDepartureMarker(marker)
        pointB = new L.LatLng(e.latlng.lat, e.latlng.lng);
        c.setCoordinates(e);
        console.log(c.setCoordinates(e), getQPoints());
        distanciaPontos = calcDistKm(pointA, pointB);
        console.log(distanciaPontos);
        setLinesToPaths(pointB);
    }
    return [pointA, pointB]
}

function setLinesToPaths(point) {
    let todosCaminhos = returnPaths();
    document.getElementById("distancias").innerHTML=""
    for (let i = 0; i < Object.keys(todosCaminhos).length; i++) {
        console.log(todosCaminhos[Object.keys(todosCaminhos)[i]]);
        let [pontoMaisProx, menorDistancia] = encontraMaisProx(
            point,
            todosCaminhos[Object.keys(todosCaminhos)[i]].path
        );
        let color = todosCaminhos[Object.keys(todosCaminhos)[i]].color;
        let firstpolyline = new L.Polyline([point, pontoMaisProx], {
            color: color,
            weight: 3,
            opacity: 0.5,
            smoothFactor: 1,
        });
        updateLines(firstpolyline);
        firstpolyline.addTo(map);
        document.getElementById("distancias").innerHTML+=`<p> ${color}: ${menorDistancia} km </p>`
    }
}

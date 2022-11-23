function calcDistKm(pointA, pointB) {
    const distancia =
        Math.sqrt(
            (pointB.lat - pointA.lat) ** 2 + (pointB.lng - pointA.lng) ** 2
        ) * 100;
    return parseFloat( distancia.toFixed(4));
}
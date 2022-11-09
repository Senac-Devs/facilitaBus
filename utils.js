function calcDistKm(pointA, pointB) {
    console.log(pointA);
    console.log(pointB.lat);
    console.log(pointB.lng);

    const distancia =
        Math.sqrt(
            (pointB.lat - pointA.lat) ** 2 + (pointB.lng - pointA.lng) ** 2
        ) * 100;
    return distancia.toFixed(4);
}
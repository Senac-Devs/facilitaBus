function thing(ct, color) {
    const markerHtmlStyles = `
    background-color: ${color};
    width: 15px;
    height: 15px;
    font-size:15px;
    text-align:center;
    display: block;` 
    return L.divIcon({
        className: "box",
        iconAnchor: [12, 25],
        labelAnchor: [-6, 0],
        popupAnchor: [0, -15],
        html: `<span style="${markerHtmlStyles}" >M</span>`
    })
}
       
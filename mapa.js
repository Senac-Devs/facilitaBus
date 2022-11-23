L.Control.Coordinates = L.Control.extend({
    options: {
        position: "bottomleft",
        latitudeText: "lat.",
        longitudeText: " lon.",
        promptText: "Pressione Ctrl + C para copiar as coordenadas",
        precision: 4,
    },

    initialize: function (options) {
        L.Control.prototype.initialize.call(this, options);
    },

    onAdd: function (map) {
        let className = "leaflet-control-coordinates";
        let that = this;
        let container = (this._container = L.DomUtil.create("div", className));
        this.visible = false;

        L.DomUtil.addClass(container, "hidden");

        L.DomEvent.disableClickPropagation(container);

        this._addText(container, map);

        L.DomEvent.addListener(container, "click", function () {
            let lat = L.DomUtil.get(that._lat);
            let lng = L.DomUtil.get(that._lng);
            let latTextLen = this.options.latitudeText.length + 1;
            let lngTextLen = this.options.longitudeText.length + 1;
            let latTextIndex =
                lat.textContent.indexOf(this.options.latitudeText) + latTextLen;
            let lngTextIndex =
                lng.textContent.indexOf(this.options.longitudeText) +
                lngTextLen;
            let latCoordinate = lat.textContent.substr(latTextIndex);
            let lngCoordinate = lng.textContent.substr(lngTextIndex);

            window.prompt(
                this.options.promptText,
                latCoordinate + " " + lngCoordinate
            );
        });

        return container;
    },

    _addText: function (container, context) {
        this._lat = L.DomUtil.create(
            "span",
            "leaflet-control-coordinates-lat",
            container
        );
        this._lng = L.DomUtil.create(
            "span",
            "leaflet-control-coordinates-lng",
            container
        );

        return container;
    },

    setCoordinates: function (obj) {
        if (!this.visible) {
            L.DomUtil.removeClass(this._container, "hidden");
        }

        if (obj.latlng) {
            L.DomUtil.get(this._lat).innerHTML =
                "<strong>" +
                this.options.latitudeText +
                ":</strong> " +
                obj.latlng.lat.toFixed(this.options.precision).toString();
            L.DomUtil.get(this._lng).innerHTML =
                "<strong>" +
                this.options.longitudeText +
                ":</strong> " +
                obj.latlng.lng.toFixed(this.options.precision).toString();
        }
    },
});
let map = L.map("map").setView([-24.04497847821831, -52.37854166814854], 17);
let marker = L.marker([-24.04497847821831, -52.37854166814854]).addTo(map);
marker.bindPopup("<b>Terminal Urbano Central</b>").openPopup();
let textoLocal = L.control.locate({
    strings: {
        title: "Mostrar localização atual",
    },
});

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

createPaths(map, L);

let pointA;
let pointB;
let c = new L.Control.Coordinates();
let distanciaPontos;
function updatePoint(e) {
    if (getQPoints() === 0) {
        const marker = new L.marker([e.latlng.lat, e.latlng.lng]);
        marker.addTo(map);
        updateMarker(marker);
        pointA = new L.LatLng(e.latlng.lat, e.latlng.lng);
        console.log(pointA);
        c.setCoordinates(e);
        console.log(c.setCoordinates(e), getQPoints);
        updateQPoints();
        setLinesToPaths();
    } else if (getQPoints() === 1) {
        const marker = new L.marker([e.latlng.lat, e.latlng.lng]);
        marker.addTo(map);
        updateMarker(marker);
        pointB = new L.LatLng(e.latlng.lat, e.latlng.lng);
        c.setCoordinates(e);
        console.log(c.setCoordinates(e), getQPoints);
        updateQPoints();
        distanciaPontos = calcDistKm(pointA, pointB);
        console.log(distanciaPontos);
    } else {
        resetQPoints();
        map = clearLines(map);
        map = clearMarkers(map);
    }
}
map.on("click", function (e) {
    updatePoint(e);
    if (getQPoints() !== 0) {
        console.log([pointA, pointB]);
        //   console.log(e.latlng.lat);
        //   console.log(e.latlng.lng);
        let pointList = [pointA, pointB];

        let line = new L.Polyline(pointList, {
            color: "red",
            weight: 3,
            opacity: 0.5,
            smoothFactor: 1,
        });
        updateLines(line);
        console.log(lines);
        line.addTo(map);
    }
});

let controleLocal = L.control
    .locate({
        locateOptions: {
            enableHighAccuracy: true,
            maxZoom: 17,
        },
    })
    .addTo(map);
c.addTo(map);
marker.on("click");

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
}).addTo(map);
function setLinesToPaths() {
    let todosCaminhos = returnPaths();
    for (let i = 0; i < Object.keys(todosCaminhos).length; i++) {
        console.log(todosCaminhos[Object.keys(todosCaminhos)[i]]);
        let [pontoMaisProx, menorDistancia] = encontraMaisProx(
            pointA,
            todosCaminhos[Object.keys(todosCaminhos)[i]].path
        );

        let firstpolyline = new L.Polyline([pointA, pontoMaisProx], {
            color: todosCaminhos[Object.keys(todosCaminhos)[i]].color,
            weight: 3,
            opacity: 0.5,
            smoothFactor: 1,
        });
        updateLines(firstpolyline);
        firstpolyline.addTo(map);
    }
}

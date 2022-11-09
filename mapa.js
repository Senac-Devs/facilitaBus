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
        var className = "leaflet-control-coordinates";
        var that = this;
        var container = (this._container = L.DomUtil.create("div", className));
        this.visible = false;

        L.DomUtil.addClass(container, "hidden");

        L.DomEvent.disableClickPropagation(container);

        this._addText(container, map);

        L.DomEvent.addListener(container, "click", function () {
            var lat = L.DomUtil.get(that._lat);
            var lng = L.DomUtil.get(that._lng);
            var latTextLen = this.options.latitudeText.length + 1;
            var lngTextLen = this.options.longitudeText.length + 1;
            var latTextIndex =
                lat.textContent.indexOf(this.options.latitudeText) + latTextLen;
            var lngTextIndex =
                lng.textContent.indexOf(this.options.longitudeText) +
                lngTextLen;
            var latCoordinate = lat.textContent.substr(latTextIndex);
            var lngCoordinate = lng.textContent.substr(lngTextIndex);

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
var map = L.map("map").setView([-24.04497847821831, -52.37854166814854], 17);
var marker = L.marker([-24.04497847821831, -52.37854166814854]).addTo(map);
marker.bindPopup("<b>Terminal Urbano Central</b>").openPopup();
var textoLocal = L.control.locate({
    strings: {
        title: "Mostrar localização atual",
    },
});


function createPath(map, L,caminho) {
    const firstpolyline = new L.Polyline(caminho["path"],{
        color: caminho["color"],
        weight: 6,
        opacity: 1.0,
        smoothFactor: 1,
    });
    firstpolyline.addTo(map);
}

function createPaths(map,L) {
    const caminhos = returnPaths();
    Object.keys(caminhos).forEach((linha) => {
    createPath(map,L,caminhos[linha])
    });
}

createPaths(map, L);



var pointA;
var pointB;
var c = new L.Control.Coordinates();
function updatePoint(e) {
    if (getQPoints() === 0) {
        const marker = new L.marker([e.latlng.lat, e.latlng.lng]);
        marker.addTo(map);
        updateMarker(marker);
        pointA = new L.LatLng(e.latlng.lat, e.latlng.lng);
        console.log(pointA);
        c.setCoordinates(e);
        console.log(c.setCoordinates(e));
        updateQPoints();
    } else if (getQPoints() === 1) {
        const marker = new L.marker([e.latlng.lat, e.latlng.lng]);
        marker.addTo(map);
        updateMarker(marker);
        pointB = new L.LatLng(e.latlng.lat, e.latlng.lng);
        c.setCoordinates(e);
        console.log(c.setCoordinates(e));
        updateQPoints();
    } else {
        resetQPoints();
        map = clearMarkers(map);
    }
}
map.on("click", function (e) {
    updatePoint(e);
    if (getQPoints() !== 0) {
        console.log([pointA, pointB]);
        //   console.log(e.latlng.lat);
        //   console.log(e.latlng.lng);
        var pointList = [pointA, pointB];

        var firstpolyline = new L.Polyline(pointList, {
            color: "red",
            weight: 3,
            opacity: 0.5,
            smoothFactor: 1,
        });
        firstpolyline.addTo(map);
    }
});

var controleLocal = L.control
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

// ARRUMAR LOOP
console.log(pointA,pointB)
console.log(Math.hypot(pointA,pointB))

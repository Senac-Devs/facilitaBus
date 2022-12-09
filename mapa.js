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

createPaths(map, L);

map.on("click", function (e) {
    updatePoint(e);
});

let controleLocal = L.control
    .locate({
        locateOptions: {
            enableHighAccuracy: true,
            maxZoom: 17,
        },
    })
    .addTo(map);

let c = new L.Control.Coordinates();
c.addTo(map);

marker.on("click");

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap | SENAC Paraná",
}).addTo(map);

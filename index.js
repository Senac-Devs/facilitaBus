let qPoint = 0;
let initialMarker;
let departureMarker;
let lines = [];

function updateLines(line) {
    lines.push(line);
}
function clearLines(map) {
    lines.forEach((e) => map.removeLayer(e));
    lines = [];
    return map;
}
function setQPoints(value,map) {
    qPoint = value;
    return map;
}
function setInitialMarker(marker) {
    initialMarker = marker;
}
function setDepartureMarker(marker) {
    departureMarker = marker;
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
function returnPaths() {
    const caminhos = {
        linhaA: {
            path: [
                { lat: -24.04497847821831, lng: -52.37854166814854 },
                { lat: -24.045659, lng: -52.377844 },
                { lat: -24.037977, lng: -52.367882 },
                { lat: -24.036729, lng: -52.369037 },
                { lat: -24.035601, lng: -52.367646 },
                { lat: -24.034495, lng: -52.366826 },
                { lat: -24.033158, lng: -52.36635 },
                { lat: -24.032395, lng: -52.36626 },
                { lat: -24.03217, lng: -52.365979 },
                { lat: -24.031937, lng: -52.365788 },
                { lat: -24.020738, lng: -52.359591 },
                { lat: -24.020648, lng: -52.359432 },
                { lat: -24.020659, lng: -52.35585 },
                { lat: -24.020731, lng: -52.355683 },
                { lat: -24.020758, lng: -52.355606 },
                { lat: -24.0205, lng: -52.3555 },
                { lat: -24.0121, lng: -52.3556 },
                { lat: -24.0121, lng: -52.3555 },
                { lat: -24.0078, lng: -52.3518 },
                { lat: -24.0066, lng: -52.3522 },
                { lat: -24.0046, lng: -52.3531 },
                { lat: -24.0039, lng: -52.3532 },
                { lat: -24.0032, lng: -52.3531 },
                { lat: -24.0024, lng: -52.3528 },
            ],
            color: "red",
        },
        linhaB: {
            path: [
                {lat: -24.0450 ,lon: -52.3785},
                {lat: -24.0457 ,lon: -52.3778},
                { lat: -24.0471, lng: -52.3796 },
                { lat: -24.0507, lng: -52.3841 },
                { lat: -24.0518, lng: -52.3857 },
                { lat: -24.054, lng: -52.389 },
                { lat: -24.0574, lng: -52.3934 },
                { lat: -24.0617, lng: -52.39 },
                {lat: -24.0604 ,lng: -52.3881},
                {lat: -24.0607 ,lng: -52.3880},
                {lat: -24.0561 ,lng: -52.3807},
                {lat: -24.0560 ,lng: -52.3802},
                {lat: -24.0557 ,lng: -52.3804},
                {lat: -24.0553 ,lng: -52.3812},
                {lat: -24.0537 ,lng: -52.3828},
                {lat: -24.0518 ,lng: -52.3856}
            ],
            color: "green",
        },
        linhaC: {
            path: [
                {lat: -24.0451, lng: -52.3784},
                { lat: -24.0467, lng: -52.3769 },
                { lat: -24.0469, lng: -52.3768 },
                { lat: -24.0481, lng: -52.3757 },
                { lat: -24.0483, lng: -52.3756 },
                { lat: -24.0507, lng: -52.3733 },
                { lat: -24.0537, lng: -52.3706 },
                { lat: -24.055, lng: -52.3722 },
                { lat: -24.0599, lng: -52.3693 },
                { lat: -24.0627, lng: -52.3678 },
                { lat: -24.0649, lng: -52.3728 },
                {lat: -24.0594 ,lng: -52.3769},
                {lat: -24.0557 ,lng: -52.3804},
                {lat: -24.0538 ,lng: -52.3825},
                {lat: -24.0481, lng: -52.3756}
            ],
            color: "blue",
        },
        linhaD: { path: [
            { lat: -24.0447, lng: -52.3787 },
            {lat: -24.0431 ,lng: -52.3802},
            {lat: -24.0370 ,lng: -52.3857},
            {lat: -24.0379 ,lng: -52.3870},
            {lat: -24.0263 ,lng: -52.4020}

        ], color: "orange" },
        linhaE:{path:[
            {lat: -24.0443 ,lng: -52.3789},
            {lat: -24.0372, lng: -52.3694},
            {lat: -24.0361 ,lng: -52.3681},
            {lat: -24.0334 ,lng: -52.3664},
            {lat: -24.0217 ,lng: -52.3637},
            {lat: -24.0011 ,lng: -52.3595},

        ],
        color:"purple"
        },
        linhaF:{path:[
            {lat: -24.0447 ,lng: -52.3787},
           {lat: -24.0431 ,lng: -52.3802},
           {lat: -24.0405, lng: -52.3823},
           {lat: -24.0337, lng: -52.3733},
           {lat:-24.0301, lng: -52.3767},
           {lat: -24.0267 ,lng: -52.3724},
           {lat: -24.0210 ,lng: -52.3804},
           {lat: -24.0247 ,lng: -52.3832},
           {lat: -24.0267 ,lng: -52.3803},
           {lat: -24.0267 ,lng: -52.3800},
          {lat: -24.0298 ,lng: -52.3768},

        ],color:"yellow"},
      linhaG:{path:[
        {lat: -24.0444 ,lng: -52.3790},
        {lat: -24.0509, lng: -52.3872},
        {lat: -24.0472 ,lng: -52.3940},
        {lat: -24.0592 ,lng: -52.4204},
        {lat: -24.0566 ,lng: -52.4226},
        {lat: -24.0449 ,lng: -52.3974},
        {lat: -24.0459 ,lng: -52.3959},
        {lat: -24.0459 ,lng: -52.3957},
        {lat: -24.0473 ,lng: -52.3949},
        {lat: -24.0468 ,lng: -52.3938},
        {lat: -24.0509 ,lng: -52.3871},
      ],color:"red"},
      linhaH:{path:[
        {lat: -24.0450 ,lon: -52.3784},
        {lat: -24.0470 ,lng: -52.3768},
        {lat: -24.0482 ,lon: -52.3755},
        {lat: -24.0440 ,lon: -52.3701},
        {lat: -24.0478 ,lon: -52.3666},
        {lat: -24.0468 ,lon: -52.3644},
        {lat: -24.0470 ,lon: -52.3629},
        {lat: -24.0482 ,lon: -52.3602},
        {lat: -24.0484 ,lon: -52.3554},
        {lat: -24.0497 ,lon: -52.3540},
        {lat: -24.0530 ,lon: -52.3560},
        {lat: -24.0484 ,lon: -52.3584}

      ],color:"orange"}
    };

    return caminhos;
}

// console.log(L.LocateControl)
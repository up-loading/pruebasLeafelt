// Inicializa el mapa
var map = L.map('map', {
    center: [32.480489, -116.872669], // Tijuana
    zoom: 13
});

// Capa base
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Ruta entre dos puntos
L.Routing.control({
  waypoints: [
    L.latLng(32.1000, -116.872610), // punto inicial
    L.latLng(32.5269, -117.0368) 
  ]
}).addTo(map);
             // punto final

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

// Ruta inicial entre dos puntos (ejemplo)
var control = L.Routing.control({
  waypoints: [
    L.latLng(32.1000, -116.872610), // Punto inicial
    L.latLng(32.5269, -117.0368)    // Punto final
  ]
}).addTo(map);

// --- FUNCIÓN PARA BUSCAR DIRECCIÓN ---
async function buscarDireccion() {
  const input = document.getElementById("direccion");
  const direccion = input.value || "Av. Revolución 123, Tijuana";
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccion)}`;

  try {
    const respuesta = await fetch(url, { headers: { "User-Agent": "MiApp" } });
    const datos = await respuesta.json();

    if (datos.length > 0) {
      const lugar = datos[0];
      const lat = parseFloat(lugar.lat);
      const lon = parseFloat(lugar.lon);

      // Mostrar datos en texto
      document.getElementById("resultado").innerHTML = `
        <strong>Dirección:</strong> ${lugar.display_name}<br>
        <strong>Latitud:</strong> ${lat}<br>
        <strong>Longitud:</strong> ${lon}
      `;

      // Mover el mapa a la ubicación
      map.setView([lat, lon], 15);

      // Agregar marcador
      L.marker([lat, lon])
        .addTo(map)
        .bindPopup(`<b>${lugar.display_name}</b>`)
        .openPopup();

    } else {
      document.getElementById("resultado").textContent = "No se encontró la dirección.";
    }

  } catch (error) {
    document.getElementById("resultado").textContent = "Error al conectar con Nominatim.";
    console.error(error);
  }
}

// Conectar el botón a la función
document.getElementById("buscar").addEventListener("click", buscarDireccion);



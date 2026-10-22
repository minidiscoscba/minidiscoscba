const parametros = new URLSearchParams(window.location.search);
const artistaSlug = parametros.get("a");
const albumSlug = parametros.get("d");
function mostrarEnlace(id, url) {
  const el = document.getElementById(id);
  if (url && typeof url === "string" && url.trim()) {
    el.href = url.trim(); el.hidden = false;
  } else { el.hidden = true; el.removeAttribute("href"); }
}
fetch("data/discos.json")
 .then(r => { if (!r.ok) throw new Error("No se pudo cargar el catálogo"); return r.json(); })
 .then(discos => {
   const disco = discos.find(d => d.artista === artistaSlug && d.album === albumSlug);
   if (!disco) {
     document.getElementById("artista").textContent = "MiniCD no encontrado";
     document.getElementById("album").textContent = "Revisá el enlace o consultá con quien te lo entregó.";
     document.getElementById("portada").hidden = true; document.getElementById("botones").hidden = true; return;
   }
   document.title = `${disco.nombreArtista || "Artista"} - ${disco.nombreAlbum || "MiniCD"}`;
   document.getElementById("artista").textContent = disco.nombreArtista || "";
   document.getElementById("album").textContent = disco.nombreAlbum || "";
   const portada = document.getElementById("portada");
   if (disco.portada) portada.src = disco.portada; else portada.hidden = true;
   mostrarEnlace("spotify", disco.spotify); mostrarEnlace("youtube", disco.youtube);
   // Registros viejos sin modo conservan la modalidad habitual.
   const comercial = disco.modo === "comercial";
   document.body.classList.toggle("modo-comercial", comercial);
   if (comercial) {
     document.getElementById("cabecera").hidden = true;
     document.getElementById("info").hidden = true;
     document.getElementById("pie").hidden = true;
     document.getElementById("etiqueta").textContent = "DESCUBRÍ AL ARTISTA";
     document.getElementById("instagramMD").hidden = true;
     document.getElementById("comprar").hidden = true;
     mostrarEnlace("instagramArtista", disco.instagramArtista);
     mostrarEnlace("tiktok", disco.tiktok); mostrarEnlace("facebook", disco.facebook); mostrarEnlace("webOficial", disco.webOficial);
   } else {
     mostrarEnlace("instagramMD", "https://www.instagram.com/minidiscos_cba/");
     mostrarEnlace("comprar", "https://minidiscoscba.mitiendanube.com");
     ["instagramArtista", "tiktok", "facebook", "webOficial"].forEach(id => { document.getElementById(id).hidden = true; });
   }
 })
 .catch(error => { console.error(error); document.getElementById("artista").textContent = "No se pudo cargar el MiniCD"; document.getElementById("album").textContent = "Comprobá tu conexión e intentá nuevamente."; });

// Obtener parámetros de la URL
const parametros = new URLSearchParams(window.location.search);

const artista = parametros.get("a");
const album = parametros.get("d");

// Cargar base de datos
fetch("data/discos.json")
    .then(respuesta => respuesta.json())
    .then(discos => {

        const disco = discos.find(d =>
            d.artista === artista &&
            d.album === album
        );

        if (!disco) {

            document.getElementById("artista").textContent = "MiniCD no encontrado";
            document.getElementById("album").textContent = "";
            return;

        }

        // Completar datos
        document.getElementById("artista").textContent = disco.nombreArtista;
        document.getElementById("album").textContent = disco.nombreAlbum;
        document.getElementById("portada").src = disco.portada;

        // Botón Spotify
        document.getElementById("spotify").href = disco.spotify;
        document.getElementById("spotify").target = "_blank";

        // Botón YouTube Music
        document.getElementById("youtube").href = disco.youtube;
        document.getElementById("youtube").target = "_blank";

        // Botón Comprar
        document.getElementById("comprar").href = "https://minidiscoscba.mitiendanube.com";
        document.getElementById("comprar").target = "_blank";

    })
    .catch(error => {
        console.error(error);
    });
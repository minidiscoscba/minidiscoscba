const botonGuardar = document.getElementById("guardar");

function convertirSlug(texto) {

    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

}

botonGuardar.addEventListener("click", async () => {

    const nombreArtista =
        document.getElementById("artista").value.trim();

    const nombreAlbum =
        document.getElementById("album").value.trim();

    const spotify =
        document.getElementById("spotify").value.trim();

    const youtube =
        document.getElementById("youtube").value.trim();

    if (!nombreArtista || !nombreAlbum) {

        document.getElementById("mensaje").textContent =
            "⚠️ Completá artista y álbum.";

        return;
    }

    const datos = {

        artista: convertirSlug(nombreArtista),

        album: convertirSlug(nombreAlbum),

        nombreArtista: nombreArtista,

        nombreAlbum: nombreAlbum,

        spotify: spotify,

        youtube: youtube,

        portada: ""

    };

    console.log("Datos:", datos);

    try {

        const respuesta = await window.api.guardarDisco(datos);

        if (respuesta.ok) {

            document.getElementById("mensaje").textContent =
                "✔ MiniCD guardado correctamente.";

        }

    } catch (error) {

        console.error(error);

        document.getElementById("mensaje").textContent =
            "❌ Ocurrió un error al guardar.";

    }

});
const pantalla = document.getElementById("pantalla");

document.getElementById("btnNuevo").onclick = mostrarFormulario;
document.getElementById("btnCatalogo").onclick = mostrarCatalogo;
document.getElementById("btnPublicar").onclick = publicar;

function slug(texto){

    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g,"")
        .replace(/[^a-z0-9]+/g,"-")
        .replace(/^-|-$/g,"");

}

function mostrarFormulario(){

pantalla.innerHTML=`

<h2>➕ Nuevo MiniCD</h2>

<div class="formulario">

<label>Artista</label>
<input id="artista">

<label>Álbum</label>
<input id="album">

<label>Spotify</label>
<input id="spotify">

<label>YouTube</label>
<input id="youtube">

<label>Portada</label>
<input id="portada" type="file">

<button id="guardar">
💾 Generar MiniCD
</button>

</div>

<div id="resultado"></div>

`;

document
.getElementById("guardar")
.onclick=generarMiniCD;

}

function generarMiniCD(){

const nombreArtista=document.getElementById("artista").value.trim();

const nombreAlbum=document.getElementById("album").value.trim();

const spotify=document.getElementById("spotify").value.trim();

const youtube=document.getElementById("youtube").value.trim();

const artista=slug(nombreArtista);

const album=slug(nombreAlbum);

const imagen=`${artista}-${album}.jpg`;

const url=`https://minidiscoscba.github.io/minidiscoscba/?a=${artista}&d=${album}`;

const json=
`{
  "artista":"${artista}",
  "album":"${album}",
  "nombreArtista":"${nombreArtista}",
  "nombreAlbum":"${nombreAlbum}",
  "spotify":"${spotify}",
  "youtube":"${youtube}",
  "portada":"img/portadas/${imagen}"
}`;

document.getElementById("resultado").innerHTML=`

<hr>

<h2>Vista previa</h2>

<p><b>Imagen:</b> ${imagen}</p>

<p><b>URL:</b></p>

<textarea id="url">${url}</textarea>

<p><b>JSON:</b></p>

<textarea id="json">${json}</textarea>

<button onclick="copiar('url')">
📋 Copiar URL
</button>

<button onclick="copiar('json')">
📋 Copiar JSON
</button>

`;

}

function copiar(id){

navigator.clipboard.writeText(

document.getElementById(id).value

);

alert("Copiado.");

}

function mostrarCatalogo(){

pantalla.innerHTML=`

<h2>📀 Catálogo</h2>

<p>

Todavía no hay discos cargados.

</p>

`;

}

function publicar(){

alert("Disponible en la versión 1.");

}
const { shell } = require("electron");

class Marcadores{
    constructor(){
        this.mensajeError = document.querySelector('.mensajeError');
        this.formularioCreacionMarcadores = document.querySelector('.creacionMarcadorFormulario');
        this.inputURL = document.querySelector('.creacionMarcadorURL');
        this.limpiarFormulario = this.limpiarFormulario.bind(this);
        this.creacionMarcador= document.querySelector('.creacionMarcadorBoton');
        this.marcadores = document.querySelector('.marcadores');
        this.eliminarMarcadores = document.querySelector('.removerMarcadores');

        this.parser = new DOMParser();
        
        this.agregarEventListeners();
    }

    agregarEventListeners(){
        this.inputURL.addEventListener('input', ()=>{
            this.creacionMarcador.disabled = !this.inputURL.checkValidity();
        });

        this.formularioCreacionMarcadores.addEventListener('submit', this.crearMarcador.bind(this));

        this.eliminarMarcadores.addEventListener('click', this.eliminarMarcadoresCreados.bind(this));

        this.marcadores.addEventListener('click', this.abrirEnlaceMarcador.bind(this))
    }

    crearMarcador(evento){
        console.log('Crear marcador llamado')
        evento.preventDefault();

        const url = this.inputURL.value;

        fetch(url)
        .then(respuesta => respuesta.text())
        .then(this.extraerContenido.bind(this))
        .then(this.encontrarTitle.bind(this))
        .then(titulo => this.almacenarMarcador(url, titulo))
        .then(this.limpiarFormulario())
        .then(this.visualMarcadores())
        .catch(error => this.reportarError(error, url))
    }

    extraerContenido(contenido){
        return this.parser.parseFromString(contenido, 'text/html')
    }

    encontrarTitle(html){
        return html.querySelector('title').innerText
    }

    almacenarMarcador(url, titulo){
        localStorage.setItem(url, JSON.stringify({titulo: titulo, url: url}));
    }

    limpiarFormulario(){
        this.inputURL.value = '';
    }

    obtenerMarcadores(){
        return Object.keys(localStorage).map(k => JSON.parse(localStorage.getItem(k)))
    }

    generarHtmlMarcador(marcador){
        return `<div class="enlace"><h3>${marcador.titulo}</h3>
        <p><a href="${marcador.url}">${marcador.url}</a></p></div>`;
    }

    visualMarcadores(){
        let marcadores = this.obtenerMarcadores();

        let html = marcadores.map(marcador => this.generarHtmlMarcador(marcador)).join('');

        this.marcadores.innerHTML = html;
    }

    reportarError(error, url){
        this.mensajeError.innerHTML = `Ocurrio un error al intentar acceder a ${url}: ${error}`;

        setTimeout(()=>{
            this.mensajeError.innerText = null;
        }, 5000);
    }

    eliminarMarcadoresCreados(){
        localStorage.clear()

        this.marcadores.innerHTML = ''
    }

    abrirEnlaceMarcador(evento){
        if (evento.target.href) {
            evento.preventDefault();
            shell.shell.openExternal(evento.target.href)
        }
    }
}

let marcadores = new Marcadores();
marcadores.visualMarcadores();
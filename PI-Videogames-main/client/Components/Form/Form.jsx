

const Form = () => {
    return (
        <form>
            <p>Crea tu propio videogame!!!</p>
            <br></br> 
            <label>Nombre</label>
            <input type='text' placeholder="Ingresa un nombre..."></input>
            <br></br> 
            <label>Descripción</label>
            <textarea placeholder="Ingresa la descripción de tu videogame..."></textarea>
            <br></br> 
            <label>Plataformas</label>
            <input placeholder="ej: IOs, PC, Xbox..."></input>
            <br></br> 
            <label>Fecha de lanzamiento</label>
            <input placeholder="aaaa-mm-dd"></input>
            <br></br> 
            <label>Rating</label>
            <input placeholder="0.00 a 5.00"></input>
            <br></br> 
            <label>Imagen</label>
            <input placeholder="Ingresa el url de la imagen de tu videogame"></input>
            <br></br> 
            <button>Crear</button>
        </form>
    )
}

export default Form
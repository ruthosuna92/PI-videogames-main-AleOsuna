const regexReleased = /^(?:20\d{2}|19\d{2})-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$/
const regexRating = /^(0\.[0-9]{2}|[1-4](\.[0-9]{2})?|5\.00)$/

export const validations = (created, value) => {
    let errors = {}
    if(!created.name){
        errors.eName = 'Por favor ingrese un nombre'
    }
    if(!created.description){
        errors.eDescription = 'Por favor ingrese una descripción'
    }
    if(!created.platforms){
        errors.ePlatforms = 'Por favor ingrese una plataforma'
    }
    if(!regexReleased.test(created.released)){
        errors.eReleased = 'Ingrese una fecha de lanzamiento válida'
    }
    if(created.rating.slice(1,2) !== '.'){
        errors.eRating1 = 'Ingrese un número decimal con punto (.)'
    }
    if(!regexRating.test(created.rating)){
        errors.eRating2 = 'Ingrese un rating válido con dos decimales'
    }
    if(!created.genres.length){
        errors.eGenres1 = 'Por favor seleccione al menos un género'
    }
    if(!created.background_image){
        errors.eImage = 'Por favor ingrese una imagen'
    }
    return errors
}

/*
const [created, setCreated] = useState({
        name: "",
        background_image: "",
        genres: [],
        descrption: "",
        platforms: "",
        rating: "",
        released: "",
    })
*/
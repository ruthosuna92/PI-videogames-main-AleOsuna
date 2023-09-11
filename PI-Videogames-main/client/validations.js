const regexReleased = /^(?:20\d{2}|19\d{2})-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$/
const regexRating = /^(0\.[0-9]{2}|[1-4](\.[0-9]{2})?|5\.00)$/
const regexName = /^(?!.*\s\s)[^\s].{4,253}[^\s]$/
const regexLength = /^.{5,255}$/
const regexSpace = /^(?!.*  )[^ ].*$/
const regexURL = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/


export const validations = (created) => {
    let errors = {}
    if(!regexName.test(created.name)){
        errors.eName = 'Por favor ingrese un nombre'
    }
    if(!regexLength.test(created.name)){
        errors.eName2 = 'Debe tener mínimo 5 caracteres, máximo 255'
    }
    if(!created.description){
        errors.eDescription = 'Por favor ingrese una descripción'
    }
    if(!regexSpace.test(created.description)){
        errors.eDescription2 = 'Descripción inválida'
    }
    if(!regexSpace.test(created.platforms)){
        errors.ePlatforms = 'Por favor ingrese una plataforma válida'
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
    if(!regexURL.test(created.background_image)){
        errors.eImage = 'Por favor ingrese un URL válido'
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
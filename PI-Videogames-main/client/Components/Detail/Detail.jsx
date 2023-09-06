import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { getById } from "../../Redux/actions"
import { useParams} from "react-router-dom"


const Detail = () => {
    const id = useParams().id
    console.log(id);
    const videogameDetail = useSelector((state)=>state.videogameDetail)
    const dispatch = useDispatch()
    console.log(videogameDetail);

    
    useEffect(()=>{
        dispatch(getById(id))
  }, [id])
    return (
        <div>
            <p>{videogameDetail?.name && videogameDetail?.name}</p>
            <img src={videogameDetail?.background_image && videogameDetail?.background_image} alt={videogameDetail?.name && videogameDetail?.name}/>
            <p>Plataformas: {videogameDetail?.platforms && videogameDetail?.platforms.map((plat)=> <li>{plat}</li>)}</p>
            <p>Géneros: {videogameDetail?.genres && videogameDetail?.genres?.map((gen)=><li>{gen}</li>)}</p>
            <p>Descripción: {videogameDetail.description && videogameDetail.description.split('<p>').join('').split('</p>').join('')}</p>
            <p>Rating: {videogameDetail.rating && videogameDetail.rating}</p>
        </div>
    )
}

export default Detail
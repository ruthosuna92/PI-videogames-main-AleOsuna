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
  }, [])
    return (
        <div>
            <p>{videogameDetail.name}</p>
            <img src={videogameDetail.background_image} alt={videogameDetail.name}/>
            <p>Plataformas: {videogameDetail.platforms.map((plat)=> <li>{plat}</li>)}</p>
            <p>Géneros: {videogameDetail.genres.map((gen)=><li>{gen}</li>)}</p>

        </div>
    )
}

export default Detail
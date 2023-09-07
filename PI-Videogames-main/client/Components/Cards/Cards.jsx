import Card from "../Card/Card"


const Cards = ({juegosFiltradosState}) => {
   


    return (
        <div>
            {juegosFiltradosState?.map((videogame, index) => {
                return <Card
                    background_image={videogame?.background_image && videogame?.background_image}
                    name = { videogame?.name && videogame?.name }
                    genres = { videogame?.genres.map((gen) => <li>{gen.name}</li>) && videogame?.genres.map((gen) => <li>{gen.name}</li>) }
                    key = { index }
                    id = { videogame?.id && videogame?.id }
                />
            })}
        </div>
    )
}

export default Cards
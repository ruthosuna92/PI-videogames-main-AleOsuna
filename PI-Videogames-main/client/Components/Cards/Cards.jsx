import Card from "../Card/Card"

const Cards = ({videogames}) => {
    
    
    


    return (
        <div>
            {videogames?.map((videogame) => {
                return <Card
                    background_image={videogame?.background_image}
                    name = { videogame?.name }
                    genres = { videogame?.genres.map((gen) => <li>{gen.name}</li>) }
                    key = { videogame?.id }
                    id = { videogame?.id }
                />
            })}
        </div>
    )
}

export default Cards
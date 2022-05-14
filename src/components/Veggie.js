import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { Link } from 'react-router-dom';
import '@splidejs/splide/dist/css/splide.min.css';

const Veggie = () => {

    const [veggie, setVeggie] = useState([]);

    useEffect(() => {
        getVeggie()
    }, []);

    const getVeggie = async () => {

        const check = localStorage.getItem("veggie")

        if (check) {
            setVeggie(JSON.parse(check))
        } else {
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`);
            const data = await api.json();
            localStorage.setItem("veggie", JSON.stringify(data.recipes));
            console.log(data)
            setVeggie(data.recipes)
        }
        
    }

    return (
        <div>
            <Wrapper>
                <h3>Veggitarian Picks</h3>
                <Splide options={{
                    perPage: 3,
                    arrows: false,
                    paginations: false,
                    drag: "free",
                    gaps: "5rem"
                    }}>
                {veggie.map((recipe) => {
                    return (
                        <SplideSlide key={recipe.id}>
                            <Card>
                                <Link to={'/recipe/' + recipe.id}>
                                    <p>{recipe.title}</p>
                                    <img src={recipe.image} alt={recipe.title} />
                                    <Gradient />
                                </Link>
                            </Card>
                        </SplideSlide>
                    );
                })}
                </Splide>
            </Wrapper>
        </div>
    )
}

const Wrapper = styled.div`
    margin: 1rem 0rem;
`
const Card = styled.div`
    min-height: 18rem;
    border-radius: 2rem;
    overflow: hidden;
    margin-right: 0.5rem;
    position: relative;

    img {
        border-radius: 2rem;
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    p {
        position: absolute;
        z-index: 10;
        left: 50%;
        width: 100%;
        bottom: 0;
        transform: translate(-50%, 0%);
        color: white;
        text-align: ceter;
        font-weight: 600;
        font-size: 1rem;
        height: 40%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`
const Gradient = styled.div`
    z-index: 3;
    position: absolute;
    width: 100%;
    height: 100%;
    bacground: liner-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5))
`

export default Veggie;
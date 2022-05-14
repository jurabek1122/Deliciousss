import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const Recipe = () => {

    const [details, setDetails] = useState({});
    const [activeTab, setActiveTab] = useState('instructions');
    let params = useParams();

    const fetchDetails = async () => {
        const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
        const detailData = await data.json();
        setDetails(detailData);
        console.log(detailData);
    }

    useEffect(() => {
        fetchDetails()
    }, [params.name]);
    return (
        <DetailWrapper>
            <div>
                <h2>{details.title}</h2>
                <img src={details.image} />
            </div>
            <Info>
                <Button 
                onClick={() => setActiveTab('instructions')}
                className={activeTab === 'instructions' ? 'active' : ''}
                >Instructions</Button>
                <Button 
                onClick={() => setActiveTab('ingredient')}
                className={activeTab === 'ingredient' ? 'active' : ''}
                >Ingredients</Button>
                { activeTab === 'instructions' ? (
                    <div>
                    <p dangerouslySetInnerHTML={{__html: details.summary}}></p>
                    {/* <p className='p2' dangerouslySetInnerHTML={{__html: details.instructions}}></p> */}
                </div>
                ) : (
                    <ul>
                    {details.extendedIngredients?.map((ingredient) => (
                         <li key={ingredient.id}>{ingredient.original}</li>
                    ))}
                </ul>
                )}
            </Info>
        </DetailWrapper>
    )
}

const DetailWrapper = styled.div`
    margin-top: 3rem;
    margin-bottom: 5rem;
    display: flex;
    .active {
        background: linear-gradient(35deg, #494949, #313131);
        color: white;
    }
    p {
        margin: 2rem 0;
        font-size: 18px;
        lign-height: 18px;
        
    }
    ul {
        margin-top: 2rem;
    }
    li {
        font-size: 1.2rem;
        line-height: 1.5rem;
    }
`

const Button = styled.button`
    padding: 1rem 2rem;
    color: #313131;
    background: white;
    border: 2px solid black;
    margin-right: 2rem;
    font-weight: 600;
`

const Info = styled.div`
    margin-left: 2rem;
`

export default Recipe;
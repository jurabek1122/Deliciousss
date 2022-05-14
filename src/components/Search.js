import { useState } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Search = () => {

    const [input, setInput] = useState("");
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        navigate("/searched/" + input)
    }

    return (
        <FormStyle onSubmit={submitHandler}>
            <FaSearch onClick={submitHandler} />
            <input type="text" placeholder="Search for recipe" onChange={(e) => setInput(e.target.value)} value={input} />
        </FormStyle>
    );
}

const FormStyle = styled.form`
    margin: 0rem;
    text-align: center;
    position: relative;
    width: 100%;
    color: white;
    input {
        border: none;
        background: linear-gradient(35deg, #494949, #313131);
        font-size: 1.5rem;
        color: white;
        padding: 1rem 3rem;
        border: none;
        border-radius: 1rem;
        outline: none;
    }
    svg {
        position: absolute;
        top: 50%;
        transform: translate(100%, -50%);
        color: white;
    }
`

export default Search;
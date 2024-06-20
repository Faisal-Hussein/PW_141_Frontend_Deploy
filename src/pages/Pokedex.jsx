import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Container } from 'react-bootstrap';

import Pokemon from '../components/Pokemon';
import Loader from '../components/Loader';

const Pokedex = () => {
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);

    const getPokemon = async () => {
        let pokemonArr = [];

        for(let i = 1; i <= 151; i++){
            pokemonArr.push(await retrievePokemon(i))
        }

        setPokemon(pokemonArr);
        setLoading(false);
    }

    const retrievePokemon = async (id) => {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        return res
    } 

    useEffect (() => {
        getPokemon();
    }, [])

    return(
        <Container className='pokedex-page'>
            {loading ? (
                <Loader />
            ) : (
                <Row>
                    {pokemon.map(p => (
                        <Col key={p.data.name} xs={12} sm={12} md={4} lg={4} xl={4}>
                            <Pokemon pokemon={p.data} />
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}

export default Pokedex;
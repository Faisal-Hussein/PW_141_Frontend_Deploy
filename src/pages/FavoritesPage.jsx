import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';

import Pokemon from '../components/Pokemon';
import Loader from '../components/Loader';
import { UserContext } from '../contexts/UserContext';

const FavoritesPage = () => {
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchFavorites = async () => {
            if (user && user.favorites) {
                const pokemonData = await Promise.all(
                    user.favorites.map(async id => {
                        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
                        return response.data;
                    })
                );
                setPokemon(pokemonData);
                setLoading(false);
            } else {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, [user]);

    return (
        <Container className='pokedex-page'>
            {loading ? (
                <Loader />
            ) : (
                <Row>
                    {pokemon.map(p => (
                        <Col key={p.id} xs={12} sm={12} md={4} lg={4} xl={4}>
                            <Pokemon pokemon={p} />
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default FavoritesPage;

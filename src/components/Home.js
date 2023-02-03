import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [characters, setCharacters] = useState();

    // Get Characters
    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const options = {
                    method: 'GET'
                };

                const data = await fetch(process.env.REACT_APP_SERVER + 'api/characters', options);
                if (data.status < 200 || data.status > 299) {
                    throw new Error('Error ' + data.status + ': ' + data.statusText);
                }
                return data.json();
            } catch (error) {
                throw new Error(error);
            }
        };

        fetchCharacters()
        .then(res => {
            setCharacters(res);
        });
    }, []);
    return (
        <main className="home">
            <h2>Characters</h2>
            <section className="characters">
                {characters ?
                    characters.map(character => {
                        return (
                            <Link key={character._id} to={'/' + character.slug} className="character-wrapper">
                                <div className="character">{character.name}</div>
                            </Link>
                        )
                    })
                : null}
            </section>
        </main>
    );
};

export default Home;
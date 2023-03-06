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
            <div className="description">
                Combo List is a web app used for keeping track of combos in fighting games. 
                Simply click on a character to view their combos. Combos can also be added, edited, or deleted on their respective character page.
                <br /><br />
                Tools: JavaScript, HTML, CSS, React, NodeJS, MongoDB
                <br />
                <a href="https://github.com/RedRaptor10/combo-list" target="_blank" rel="noreferrer">View Source Code</a>
            </div>
            <table className="characters">
                <thead>
                    <tr>
                        <th>Characters</th>
                    </tr>
                </thead>
                <tbody>
                    {characters ?
                        characters.map(character => {
                            return (
                                <tr key={character._id}>
                                    <td>
                                        <Link to={'/' + character.slug} className="character-wrapper">
                                            {character.name}
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })
                    : null}
                </tbody>
            </table>
        </main>
    );
};

export default Home;
import { useState } from "react";
import md5 from "md5";
import Characters from "./Characters";
import Comics from "./Comics";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const publicKey = import.meta.env.VITE_PUBLIC_KEY;
const privateKey = import.meta.env.VITE_PRIVATE_KEY;

export default function Search() {
    const [characterName, setCharacterName] = useState("");
    const [characterData, setCharacterData] = useState(null);
    const [comicData, setComicData] = useState(null);

    const getCharacterData = () => {
        setCharacterData(null);
        setComicData(null);

        const timeStamp = new Date().getTime();
        const hash = generateHash(timeStamp);

        const url = `https://gateway.marvel.com:443/v1/public/characters?apikey=${publicKey}&hash=${hash}&ts=${timeStamp}&nameStartsWith=${characterName}&limit=100`;

        fetch(url)
            .then((response) => response.json())
            .then((result) => {
                setCharacterData(result.data);
            })
            .catch(() => {
                console.log("error while getting character data");
            });
    };

    const generateHash = (timeStamp) => {
        return md5(timeStamp + privateKey + publicKey);
    };

    const getComicData = (characterId) => {
        window.scrollTo({ top: 0, left: 0 });

        const timeStamp = new Date().getTime();
        const hash = generateHash(timeStamp);
        const url = `https://gateway.marvel.com:443/v1/public/characters/${characterId}/comics?apikey=${publicKey}&hash=${hash}&ts=${timeStamp}`;

        fetch(url)
            .then((response) => response.json())
            .then((result) => {
                setComicData(result.data);
                console.log(result.data);
            })
            .catch(() => {
                console.log("error while getting comic data");
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        getCharacterData();
    };

    const handleChange = (event) => {
        setCharacterName(event.target.value);
    };

    const handleReset = () => {
        setCharacterName("");
        setCharacterData(null);
        setComicData(null);
    };

    const prepareBarChartData = () => {
        if (!characterData || !characterData.results) {
            return [];
        }

        const comicsPerCharacter = {};
        characterData.results.forEach((character) => {
            comicsPerCharacter[character.name] = character.comics.available || 0;
        });

        const chartData = Object.keys(comicsPerCharacter).map((characterName) => ({
            name: characterName,
            comics: comicsPerCharacter[characterName],
        }));

        return chartData;
    };

    return (
        <>
            <form className="search" onSubmit={handleSubmit}>
                <input placeholder="Search" type="text" onChange={handleChange} />
                <div className="buttons">
                    <button type="submit">Find Comics</button>
                    <button type="reset" className="reset" onClick={handleReset}>Clear</button>
                </div>
            </form>

            {comicData && comicData.results && (
                <Comics data={comicData.results} onClick={() => {}} />
            )}

            {characterData && characterData.results && (
                <Characters data={characterData.results} onClick={getComicData} />
            )}

            {characterData && (
                <div>
                    <h2>Comics per Character</h2>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={prepareBarChartData()}>
                            <XAxis dataKey="name" tick={{ fill: 'white' }} />
                            <YAxis tick={{ fill: 'white' }} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="comics" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </>
    );
}

import React from "react"
import {useState} from "react"

export default function Body(){

    const [meme, setMeme] = useState({
        topText: "One does not simply",
        bottomText: "Walk into Mordor",
        imageUrl: "http://i.imgflip.com/1bij.jpg"
    })

    function handleChange(event){
        const {value, name} = event.currentTarget
        setMeme((prev) => {
            return {...prev, 
                [name] : value
            }
        })
    }

    function getMemeImage(){
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const newMemeUrl = allMemes[randomNumber].url
        setMeme((prevMeme) => ({
            ...prevMeme,
            imageUrl : newMemeUrl
        }) )
    }

    const [allMemes, setAllMemes] = React.useState([])

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMemes(data.data.memes))
    }, [])

    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input type="text"
                        placeholder="One does not simply"
                        name="topText"
                        onChange={handleChange}
                        value={meme.topText}
                    />
                </label>

                <label>Bottom Text
                    <input type="text"
                            placeholder="Walk into Mordor"
                            name="bottomText"
                            onChange={handleChange}
                            value={meme.bottomText}
                    />
                </label>
                <button onClick={getMemeImage}>Get a new meme image</button>
            </div>

            <div className="meme">
                <img src={meme.imageUrl} />
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText}</span>
            </div>
        </main>
    )
}
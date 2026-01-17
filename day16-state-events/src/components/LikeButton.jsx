import { useState } from "react";

 

function LikeButton() {

    const [likes, setLikes] = useState(0);

 

    function addLike() {

        setLikes(likes + 1);

    }
    function reset() {

        setLikes(0);

    }

 

    return (

        <div className="card">

            <h3>Like Button</h3>

            <p className="big">{likes}</p>

 

            {/* Correct: pass a function reference */}

            <button onClick={addLike}>Like</button>
            <button onClick={reset} className="secondary">

                    Reset

                </button>


 

            <p className="muted">

                Event names in React are camelCase (onClick, onChange).

            </p>

        </div>

    );

}

 

export default LikeButton;





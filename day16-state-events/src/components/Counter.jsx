import { useState } from "react";

 

function Counter() {

    const [count, setCount] = useState(0);

 

    function increase() {

        // Always update state using the setter function

        setCount(count + 1);

    }

 

    function decrease() {

        setCount(count - 1);

    }

 

    function reset() {

        setCount(0);

    }

 

    return (

        <div className="card">

            <h3>Counter</h3>

            <p className="big">{count}</p>

 

            <div className="row">

                <button onClick={decrease}>Decrease</button>

                <button onClick={increase}>Increase</button>

                <button onClick={reset} className="secondary">

                    Reset

                </button>

            </div>

 

            <p className="muted">

                Normal variables do not trigger re-render. State does.

            </p>

        </div>

    );

}

 

export default Counter;





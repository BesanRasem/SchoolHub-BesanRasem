import './App.css';

 

 

/*

Day 16: State and Events

Goals: Practice useState + events + controlled inputs + mini interactive app (Task Manager).

Hour 1 - 2 - 3

 */

 

import Counter from './components/Counter';

import LikeButton from './components/LikeButton';



 

function App() {

    return (

    <div className="page">

        <header className="topbar">

            <h1>Day 16: State and Events</h1>

            <p>

                useState + events + controlled inputs + mini interactive app (Task Manager).

            </p>

        </header>

 

        <section className="section">

            <h2>Understanding state</h2>

            <p className="muted">

                State belong to a component. When state changes, React re-renders UI.

            </p>

            <div className="grid">

                <Counter />

                <LikeButton />

            </div>

        </section>

 

        <footer className="footer">

            <p className="muted">

                Best practice: never state directly. Always use setState.

            </p>

        </footer>

    </div>

    );

}

 

export default App;





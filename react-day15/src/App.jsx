import Header from "./Header";

import Card from"./Card";
function App(){
    return(
        <div className="container">
            <Header/>
            <div className="row g-3">
                <Card subject="Math"
                  description="Solve chapter 3 exercises" 
                  status="Pending" 
                  feedback="Not feedback yet"
                />
                <Card subject="English"
                  description="Write an essay about climate change" 
                  status="Completed" 
                  feedback="Great work!"
                />
                <Card subject="Science"
                  description="Complete lab report on acids" 
                  status="Not Completed" 
                  feedback="Please submit ASAP"
                />
                <Card subject="History"
                  description="Read chapter 5 and summarize" 
                  status="Pending" 
                  feedback="Not feedback yet"
                />
             
            </div>
        </div>

    )
}
export default App;
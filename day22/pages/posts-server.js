export default function postsServerPage({posts,generatedAt}){
    return(
        <div style={{padding:20,fontFamily:"Arial"}}>
            <h1>Posts - Server Page</h1>
            <p>
                <strong>Generated at:</strong>{generatedAt}
            </p>
            <ul>
                {posts.map(p =>(
                    <li key={p.id} style={{marginBottom:12}}>
                        <h3 style={{margin:0}}>{p.title}</h3>
                        <p style={{margin:"6px 0"}}>{p.body}</p>


                    </li>
                    
                ))}
            </ul>
            <p style={{marginTop:30}}>
                ال generate بيتنفذ مع كل طلب 

            </p>
        </div>
    );
}
export async function getServerProps() {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
    const posts = await res.json();
    return{props:{
        posts,
        generatedAt: new Date().toISOString()
    }
        
    };
    
}
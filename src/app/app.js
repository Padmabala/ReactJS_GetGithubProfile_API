import React,{useState,useEffect} from 'react';
import "../../stylesheet.css"
const App=()=>{
    const [profile,setProfile]=useState("")
    const [details,setDetails]=useState({})
    const [repositories,setRepositories]=useState([])
    useEffect(
        ()=>{
            console.log(details)
            console.log(details['repos_url'])
            fetch(details['repos_url'])
            .then(res=>res.json())
            .then(repo=>{
                console.log(repo)
                setRepositories(repo)
            })
        },
        [details]
    )
    const getProfileDetails=()=>{
        console.log(profile)
        fetch('https://api.github.com/users/'+profile)
    .then((resp)=>
        resp.json()
    )
    .then(data=>
        {
            console.log(data)
            setDetails(data)
            console.log("hey",data['repos_url'])
            
            
        })
    }
    
    
    return (
        <div>
            <table>
                <tbody>
                <tr>
                    <td>
                    <label> Enter the Github Profile name</label>
                    </td>
                    <td>
                    <input type="text" value={profile} onChange={(event)=>{event.preventDefault;setProfile(event.target.value)}}></input>
                    </td>
                    <td>
                        <button onClick={getProfileDetails}>Get Profile Details</button>
                    </td>
                </tr>
                </tbody>
                </table>
                
                    {
                details.avatar_url
                ?
                <div>
                    <img className="img" styles={{position:'fixed',float:'right'}} src={details.avatar_url} ></img>
                    
                    <ul>
                    <h3>Repositories</h3>
                        {repositories.map((repo,index)=>{
                        return(
                            
                            <li key={index} className="repo">{repo['name']}</li>
                            
                        )
                    })
                }            
                        </ul>               
                </div>
                :
                <div>
                </div>

            }
            
        </div>
    )
}

export default App;



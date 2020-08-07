import React,{useState,useEffect} from 'react';
import "../../stylesheet.css"
const App=()=>{
    const [profile,setProfile]=useState("")
    const [details,setDetails]=useState({})
    const [repositories,setRepositories]=useState([])
    const [starred,setStarred]=useState([])
    useEffect(
        ()=>{
            
            fetch(details['repos_url'])
            .then(res=>res.json())
            .then(repo=>{
                console.log(repo)
                setRepositories(repo)
            })
            
            if(details['starred_url'] !==undefined)
            {                
                details['starred_url']=details['starred_url'].replace('{/owner}{/repo}',"")
            }
            fetch(details['starred_url'])
            .then(res=>res.json())
            .then(repo=>{
                console.log("starreed",repo)
                setStarred(repo)
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
            console.log(data);
            setDetails(data)         
            
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
                    <table style={{float:'right'}}>
                        <tbody>
                        <tr>
                            <td>
                                <img className="img" styles={{position:'fixed',float:'right'}} src={details.avatar_url} ></img>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                <h3>Number of Repos: {repositories.length}</h3>
                                <ul>
                    <h3>Repositories</h3>
                        {repositories.map((repo,index)=>{
                        return(
                            
                            <li key={index} className="repo">{repo['name']}</li>
                            
                        )
                    })
                }            
                        </ul>
                            </td>
                            <td>
                            <h3>Number of followers: {details['followers']}</h3>                            
                            <ul>
                    <h3>Starred</h3>
                        {starred.map((repo,index)=>{
                        return(
                            
                            <li key={index} className="repo">{repo['name']}</li>
                            
                        )
                    })
                }            
                        </ul>
                            </td>
                            
                        </tr>
                        </tbody>
                    </table>
                    
                   
                                   
                </div>
                :
                <div>
                </div>

            }
            
        </div>
    )
}

export default App;



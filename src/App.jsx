import { useContext, useEffect, useState } from 'react'
import Routing from './Router.jsx'
import { DataContext } from './Components/DataProvider/DataProvider.jsx'
import {Type} from "./Utility/Actiontype.js";
import {auth} from "./Utility/firebase.js";


function App() {

  const [{user},dispatch] = useContext(DataContext)
  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        console.log(authUser)
        dispatch({
          Type:Type.SET_USER,
          user:authUser
        })

      }else{
        dispatch({
          type:Type.SET_USER,
          user:null,
        })
      }
    })

  },[])
  return (
    
   <Routing/>
      
    
  )
}

export default App

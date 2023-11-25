import LayoutL from '../components/LayoutL';
import React, { useEffect, useState } from 'react'
import ViewFields from './meta_integrer/view_contract'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader"

    function Sell(){
        const [loading, setLoading] = useState(false)
  useEffect(() =>{
    setLoading(true)
    setTimeout(() =>{
      setLoading(false)
    },1000)
}, [] )
        return (
                <><div id="my-div" className="sell-container">
                { loading ? <div id="loading">  <ClimbingBoxLoader color={'#000000'} loading={loading} size={100} /> </div>
                :
             <LayoutL>
             <div class="ui horizontal segments">
    <div class="ui   segment">
    <a class="item " id="L" href="http://localhost:3000/Create_L" > Dodanie leszego</a>
    </div>
    <div class="ui  green segment">
    <a class="item " id="L" href="http://localhost:3000/View_L" > Twoje obligacje</a>
    </div>
  
  </div>
  <h1>Tutaj możesz obejrzeć swoje obligacje</h1>
  <ViewFields/>
                </LayoutL>
                }
            </div><link
                    async
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css" /></>
              
    
    
        )
    
    
    }
    
    
    export default Sell; 



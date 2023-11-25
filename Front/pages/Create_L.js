import LayoutL from '../components/LayoutL';
import React, { Component, useState } from 'react'
import CreateLeszy from './meta_integrer/create_contracts'
    function Sell(){

        return (
                <><div id="my-div" className="sell-container">
                
             <LayoutL>
             <div class="ui horizontal segments">
    <div class="ui  green  segment">
    <a class="item " id="L" href="http://localhost:3000/Create_L" > Dodanie leszego</a>
    </div>
    <div class="ui  segment">
    <a class="item " id="L" href="http://localhost:3000/View_L" > Twoje obligacje</a>
    </div>
  </div>
            <CreateLeszy/>
            



  
                </LayoutL>
            </div><link
                    async
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css" /></>
              
    
    
        )
    
    
    }
    
    
    export default Sell; 

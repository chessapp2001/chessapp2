import Layout from '../components/Layout';
import {Segment } from 'semantic-ui-react'
import React, { Component, useState } from 'react'
import { Button, Progress } from 'semantic-ui-react'
    function Sell(){
        const [percent, setPercent] = useState(0);

        return (
                <><div id="my-div" className="App">
                
             <Layout>
                <h1>Sell me some tokens</h1>
                <Segment inverted>
                    
                    <Button inverted color='green' href="http://localhost:3000">
                        GreenToken
                    </Button>
                    <Progress percent={percent} indicating />
                    <Button onClick={() => {
                            setPercent(p=>p+10);

                    }
                    }>Increment</Button>
                </Segment>
                </Layout>
            </div><link
                    async
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css" /></>
              
    
    
        )
    
    
    }
    
    
    export default Sell; 

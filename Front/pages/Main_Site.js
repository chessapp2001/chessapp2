import LayoutL from "../components/LayoutL";
import { Segment } from "semantic-ui-react";
import React, { Component, useState } from "react";
import { Button, Progress } from "semantic-ui-react";

import Mainsite from './meta_integrer/mainsite'
/* export const getServerSideProps = async () =>{
    const response = await fetch('https://');
    const {data, success} = await resposne.json();

    if(!success){
        return{
            redirect:{
                destination:'/',
            permament:false,
        }
        }
    }
}
*/

function Sell() {
	return (
		<>
			<div id="my-div" className="sell-container">
				<LayoutL>
					<div class="ui horizontal segments">
						<div class="ui   segment">
							<a class="item " id="L" href="http://localhost:3000/Create_L">
								{" "}
								Dodanie leszego
							</a>
						</div>
						<div class="ui  segment">
							<a class="item " id="L" href="http://localhost:3000/View_L">
								{" "}
								Twoje obligacje
							</a>
						</div>
					</div>
          <Mainsite/>
				</LayoutL>
			</div>
			<link
				async
				rel="stylesheet"
				href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
			/>
		</>
	);
}

export default Sell;

import React, { useEffect, useState } from 'react';

import { Dimmer, Image, Loader, Segment } from 'semantic-ui-react';

import LayoutL from '../components/LayoutL';
import ViewFields from './meta_integrer/view_contract';

function Sell() {
  return (
    <>
      <div id="my-div" className="sell-container">
        <LayoutL>
          <div className="ui horizontal segments">
            <div className="ui   segment">
              <a className="item " id="L" href="http://localhost:3000/nr1">
                {' '}
                Table nr1
              </a>
            </div>
            <div className="ui  green segment">
              <a className="item " id="L" href="http://localhost:3000/nr2">
                {' '}
                Table nr2
              </a>
            </div>
          </div>
          <h1>Tutaj możesz obejrzeć swoje obligacje</h1>
          {/* <ViewFields /> */}
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

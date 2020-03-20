import React from 'react';
import {Route} from 'react-router-dom';

export default (
    <Route>
        <Route path='/'/>
        <Route path='/search/'>
            <Route path=':name'/>
        </Route>
        <Route path='/prevention' />
        <Route path='*'/>
    </Route>
);
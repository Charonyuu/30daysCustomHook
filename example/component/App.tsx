import * as React from 'react';
import LocalStorage from './localStorage';
import FetchData from './fetchData';

export default function App() {


    return (
        <div>
            <LocalStorage />
            <FetchData />
        </div>
    )
}

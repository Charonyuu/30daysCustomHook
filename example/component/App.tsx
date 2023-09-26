import * as React from 'react';
import LocalStorage from './localStorage';
import FetchData from './fetchData';
import OutsideClickSample from './OutsideClickSample'
export default function App() {


    return (
        <div>
            <LocalStorage />
            <FetchData />
            <OutsideClickSample />
        </div>
    )
}

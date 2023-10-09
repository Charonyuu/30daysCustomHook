import * as React from 'react';
import LocalStorage from './localStorage';
import FetchData from './fetchData';
import OutsideClickSample from './OutsideClickSample'
import AxiosProgress from './AxiosProgress';
import IntersectionObserverExample from './IntersectionObserver';

export default function App() {


    return (
        <div>
            {/* <LocalStorage />
            <FetchData />
            <OutsideClickSample />
            <AxiosProgress /> */}
            <IntersectionObserverExample />
        </div>
    )
}

import * as React from 'react';
import { useLocalStorage } from '../../src';


export default function LocalStorage() {
    const [theme, setTheme] = useLocalStorage("theme", "dark")
    return (
        <div>
            {theme}
            <button onClick={() => setTheme("light")}>Change To Light</button>
            <button onClick={() => localStorage.setItem("theme", "light")}>Pure LocalStorage SetItem Change To Light</button>

            <button onClick={() => localStorage.setItem("count", "0")}>Pure LocalStorage SetItem Change To Light</button>
        </div>
    )
}

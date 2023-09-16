import * as React from 'react';
import { useLocalStorage } from '../../src';


export default function LocalStorage() {
    const [theme, setTheme] = useLocalStorage("theme", "dark")
    return (
        <section>
            <h3>useLocalStorage</h3>
            {theme}
            <button onClick={() => setTheme("light")}>Change To Light</button>
            <button onClick={() => localStorage.setItem("theme", "light")}>Pure LocalStorage SetItem Change To Light</button>
            <button onClick={() => localStorage.clear()}>Pure LocalStorage clear</button>
        </section>
    )
}

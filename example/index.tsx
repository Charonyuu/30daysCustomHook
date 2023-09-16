import { createRoot } from 'react-dom/client';
import * as React from 'react';
import App from './component/App';

const root = createRoot(document.getElementById('root')!);

root.render(
    <App />
);
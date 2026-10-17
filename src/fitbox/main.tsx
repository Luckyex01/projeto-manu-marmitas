import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import '../../prototipo/styles.css';
import './styles.css';

const root = document.getElementById('root');
if (!root) throw new Error('Elemento raiz da FITBOX não encontrado.');
createRoot(root).render(<StrictMode><App /></StrictMode>);

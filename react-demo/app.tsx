import * as React from 'react';
import { render } from 'react-dom';
import Hello from './components/Hello';

console.log('Japhy')

render(
  <Hello name="TypeScript" enthusiasmLevel={10} />,
  document.getElementById('app') as HTMLElement
)
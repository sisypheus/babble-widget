import { h, render } from 'preact';
import { App } from './App';
import loader from './loader';

const configuration = {
  debug: false,
  serviceBaseUrl: 'https://help-widget-backend.glitch.me',
  minimized: false,
  disableDarkMode: false,
  text: {},
  styles: {}
}

loader(
  window,
  configuration,
  window.document.currentScript,
  (el, config) => render(h(App, { ...config, element: el }), el)
)

export default App;

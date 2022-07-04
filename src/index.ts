import { h, render } from 'preact';
import { App } from './App';
import loader from './loader';
import { Configurations } from './models';

const defaultConfiguration: Configurations = {
  debug: false,
  apiBaseUrl: process.env.API_URL || 'http://localhost:8001',
  clientId: '',

  widget: {
    initialMessage: 'Welcome to your chat widget, here you can communicate with us.',
    minimized: false,
    title: 'Chat',
    subtitle: '',
    requireEmail: false,
    color: '#2563eb',
    activityIndicator: false,
  }
}

loader(
  window,
  defaultConfiguration,
  window.document.currentScript,
  (el, config) => render(h(App, { ...config, element: el }), el)
)

export default App;

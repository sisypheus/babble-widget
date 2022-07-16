import { h, render } from "preact";
import { App } from "./App";
import loader from "./loader";
import { Configurations } from "./models";

const defaultConfiguration: Configurations = {
  debug: false,
  apiBaseUrl: process.env.API_URL || "http://localhost:8001",
  clientId: "",

  widget: {
    initialMessage:
      "Welcome to your chat widget, here you can communicate with us.",
    minimized: false,
    title: "Welcome to the company",
    subtitle: "Chat with us!",
    requireEmail: false,
    color: "#3b82f6",
    activityIndicator: false,
  },
};

loader(
  window,
  defaultConfiguration,
  window.document.currentScript,
  (el, config) => {
    const widget = {
      minimized: false,
      title: "Welcome to the company",
      subtitle: "Chat with us!",
      color: "#3b82f6",
    };
    config.widget = { ...widget, ...config.widget };
    render(
      h(App, {...config,  element: el }),
      el
    );
  }
);

export default App;

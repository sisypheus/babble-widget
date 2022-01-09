class BabbleShim {
  init = (clientId) => {
    this.mountIframe();
  }

  mountIframe = () => {
    const iframe = document.createElement('iframe');
    iframe.onload = () => {
      this.iframe.contentWindow.postMessage({
        type: 'INIT_IFRAME',
        value: { clientId: this.clientId }
      }, '*');
    };
    // url for the widget
    iframe.src = "http://127.0.0.1:3000";
    iframe.crossorigin = "anonymous";
    this.iframe = iframe;
    window.addEventListener("message", this.receiveMessage, false);
    const wrapper = document.createElement('div');
    wrapper.style.position = 'fixed';
    wrapper.style.bottom = '24px';
    wrapper.style.right = '24px';
    iframe.style.border = 'none';
    iframe.style.backgroundColor = 'transparent';
    wrapper.appendChild(this.iframe);
    document.body.appendChild(wrapper);
  }

  resizeIframe = () => {
    console.log('oho need to resize');
  }

  receiveMessage = (event) => {
    // this is where we handle when our widget sends us a message
    if (!!event && !!event.data && !!event.data.type) {
      console.log('received message', event.data);
      switch (event.data.type) {
        case 'IFRAME_LOAD_DONE':
          this.handleWidgetLoaded();
          break;
        case 'OPEN_CHAT':
          this.resizeIframe();
          break;
      }
    }
  }
}

export default ((window) => {
  const stubSdk = window.babble;

  const initCall = stubSdk._c.filter(call => call[0] === 'init');
  const shim = new BabbleShim();
  stubSdk.init = babble.init;
  initCall && shim.init(initCall[1]);
})(window);
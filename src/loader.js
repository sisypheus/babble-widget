export default (function (win, defaultConfig, scriptElement, render) {
  var _a, _b, _c;
  // get a hold of script tag instance, which has an
  // attribute `id` with unique identifier of the widget instance
  var instanceName = (_b = (_a = scriptElement === null || scriptElement === void 0 ? void 0 : scriptElement.attributes.getNamedItem('id')) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : exports.DEFAULT_NAME;
  var loaderObject = win[instanceName];
  if (!loaderObject || !loaderObject.q) {
    throw new Error("Widget didn't find LoaderObject for instance [" + instanceName + "]. " +
      "The loading script was either modified, no call to 'init' method was done " +
      ("or there is conflicting object defined in `window." + instanceName + "` ."));
  }
  // check that the widget is not loaded twice under the same name
  if (win["loaded-" + instanceName]) {
    throw new Error("Widget with name [" + instanceName + "] was already loaded. "
      + ("This means you have multiple instances with same identifier (e.g. '" + exports.DEFAULT_NAME + "')"));
  }
  // this will an root element of the widget instance
  var targetElement;
  // iterate over all methods that were called up until now
  for (var i = 0; i < loaderObject.q.length; i++) {
    var item = loaderObject.q[i];
    var methodName = item[0];
    if (i === 0 && methodName !== 'init') {
      throw new Error("Failed to start Widget [" + instanceName + "]. 'init' must be called before other methods.");
    }
    else if (i !== 0 && methodName === 'init') {
      continue;
    }
    switch (methodName) {
      case 'init':
        var loadedObject = Object.assign(defaultConfig, item[1]);
        if (loadedObject.debug) {
          console.log("Starting widget [" + instanceName + "]", loadedObject);
        }
        // the actual rendering of the widget
        var wrappingElement = (_c = loadedObject.element) !== null && _c !== void 0 ? _c : win.document.body;
        targetElement = wrappingElement.appendChild(win.document.createElement('div'));
        targetElement.setAttribute('id', "widget-" + instanceName);
        render(targetElement, loadedObject);
        // store indication that widget instance was initialized
        win["loaded-" + instanceName] = true;
        break;
      // TODO: here you can handle additional async interactions
      // with the widget from page (e.q. `_hw('refreshStats')`)
      default:
        console.warn("Unsupported method [" + methodName + "]", item[1]);
    }
  }
  // once finished processing all async calls, we going
  // to convert LoaderObject into sync calls to methods
  win[instanceName] = function (method) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }
    switch (method) {
      case 'event': {
        targetElement === null || targetElement === void 0 ? void 0 : targetElement.dispatchEvent(new CustomEvent('widget-event', { detail: { name: args === null || args === void 0 ? void 0 : args[0] } }));
        break;
      }
      default:
        console.warn("Unsupported method [" + method + "]", args);
    }
  };
});

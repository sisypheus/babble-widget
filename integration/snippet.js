(function (window, document) {
  if (window.babble) {
    console.error('babble embed already included');
    return;
  }
  window.babble = {},
    //   m = ['init'];
    window.babble._c = [];
  m.forEach(methodName => window.babble[methodName] = function () {
    window.babble._c.push([methodName, arguments])
  });
  var elt = document.createElement('script');
  elt.type = "text/javascript";
  elt.async = true;
  elt.src = "https://babble.fr/";
  var before = document.getElementsByTagName('script')[0];
  before.parentNode.insertBefore(elt, before);
})(window, document, undefined);
babble.init('MY CLIENT ID HERE');
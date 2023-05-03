const doEuropaAnalyticsParams = () => {
  const siteID =
    window.env?.RAZZLE_EUROPA_ANALYTICS_SITE_ID;

  const sitePath = [
    window.env?.RAZZLE_EUROPA_ANALYTICS_SITE_PATH
  ];

  const mode =
    window.env?.RAZZLE_EUROPA_ANALYTICS_MODE

  const instance =
    window.env?.RAZZLE_EUROPA_ANALYTICS_INSTANCE

  const utility =
    window.env?.RAZZLE_EUROPA_ANALYTICS_UTILITY
  const result = {
    siteID,
    sitePath,
    instance,
    mode,
    utility,
  };
  return result;
};

const loadEuropaAnalyticsScript = (callback) => {
  const existingScript =
    __CLIENT__ && document.getElementById(`europaAnalyticsJS`);

  //replace script loaded on each version change
  if (existingScript) {
    existingScript.setAttribute('src', `https://europa.eu/webtools/load.js`);
  }

  if (!existingScript && __CLIENT__) {
    const script1 = document.createElement('script');
    script1.type = 'application/json';
    script1.text = JSON.stringify(doEuropaAnalyticsParams());
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = `https://europa.eu/webtools/load.js`;
    script2.id = `europaAnalyticsJS`;
    script2.defer = `defer`;
    document.body.appendChild(script2);

    script2.onload = () => {
      if (callback) callback();
    };
  }

  //callback, if needed
  if (existingScript && callback) {
    callback();
  }
};


const startTrackPageView = (callback) => {
  //check for loaded europaAnalytics script in dom scripts
  var scripts = __CLIENT__ && document.getElementsByTagName('script');
  if (scripts) {
    for (var i = scripts.length; i--; ) {
      // eslint-disable-next-line eqeqeq
      if (scripts[i].src === `https://europa.eu/webtools/load.js`) {
        if (callback) callback();
      }
    }
  } // eslint-disable-next-line eqeqeq
};

export { loadEuropaAnalyticsScript, startTrackPageView };

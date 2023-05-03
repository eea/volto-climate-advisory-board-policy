export const trackPageView = () =>
  window.addEventListener('wtAnalyticsReady', function () {
    console.log('trackPageView')
    if (window.$wt.analytics.isTrackable()) {
      console.log('trackPageView - isTrackable')
      window.$wt.trackPageView();
    }
  });

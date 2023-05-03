export const trackPageView = () =>
  window.addEventListener('wtAnalyticsReady', function () {
    if (window.$wt.analytics.isTrackable()) {
      window.$wt.trackPageView();
    }
  });

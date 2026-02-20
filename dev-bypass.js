// Dev mode bypass - intercept verify API call
const _originalFetch = window.fetch;
window.fetch = function(url, options) {
  if (typeof url === 'string' && url.includes('puppy-subscription-api.zeabur.app/api/verify')) {
    console.log('[DEV] Intercepted verify API call, returning success');
    return Promise.resolve(new Response(JSON.stringify({
      success: true,
      verified: true,
      userId: 'dev_user_001',
      status: 'ok'
    }), { status: 200, headers: { 'Content-Type': 'application/json' } }));
  }
  return _originalFetch.apply(this, arguments);
};

// Also intercept XMLHttpRequest just in case
const _originalXHROpen = XMLHttpRequest.prototype.open;
const _originalXHRSend = XMLHttpRequest.prototype.send;
XMLHttpRequest.prototype.open = function(method, url, ...args) {
  this._url = url;
  return _originalXHROpen.apply(this, [method, url, ...args]);
};
XMLHttpRequest.prototype.send = function(...args) {
  if (this._url && this._url.includes('puppy-subscription-api.zeabur.app/api/verify')) {
    console.log('[DEV] Intercepted XHR verify call, returning success');
    Object.defineProperty(this, 'status', { get: () => 200 });
    Object.defineProperty(this, 'responseText', { get: () => JSON.stringify({ success: true, verified: true, userId: 'dev_user_001' }) });
    setTimeout(() => {
      this.onload && this.onload();
      this.onreadystatechange && this.onreadystatechange();
    }, 50);
    return;
  }
  return _originalXHRSend.apply(this, args);
};

console.log('[DEV] API interceptor active - verify calls will auto-succeed');

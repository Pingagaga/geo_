// Routes legacy relative API calls to the configured backend origin.
const aeroNativeFetch = window.fetch.bind(window);
window.fetch = (input, init = {}) => {
  if (typeof input !== 'string' || !input.startsWith('/api/')) {
    return aeroNativeFetch(input, init);
  }
  const base = String(window.AERO_CONFIG?.apiBaseUrl || '').replace(/\/$/, '');
  const next = { ...init, headers: new Headers(init.headers || {}) };
  if (input.startsWith('/api/admin/')) {
    let token = sessionStorage.getItem('aero_admin_token') || '';
    if (!token) token = window.prompt('Enter the researcher admin token:') || '';
    if (token) {
      sessionStorage.setItem('aero_admin_token', token);
      next.headers.set('X-Admin-Token', token);
    }
  }
  return aeroNativeFetch(`${base}${input}`, next);
};

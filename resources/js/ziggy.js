const Ziggy = {
  url: 'http:\/\/localhost:82',
  port: 82,
  defaults: {},
  routes: {
    home: { uri: '\/', methods: ['GET', 'HEAD'] },
    login: { uri: 'login', methods: ['GET', 'HEAD'] },
    'login.google': { uri: 'login\/google', methods: ['GET', 'HEAD'] },
    'login.google.callback': { uri: 'auth\/google\/callback', methods: ['GET', 'HEAD'] },
    logout: { uri: 'logout', methods: ['DELETE'] }
  }
};
if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
  Object.assign(Ziggy.routes, window.Ziggy.routes);
}
export { Ziggy };

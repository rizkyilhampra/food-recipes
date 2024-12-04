const Ziggy = {
  url: 'http:\/\/localhost:82',
  port: 82,
  defaults: {},
  routes: {
    home: { uri: '\/', methods: ['GET', 'HEAD'] },
    login: { uri: 'login', methods: ['GET', 'HEAD'] },
    'storage.local': {
      uri: 'storage\/{path}',
      methods: ['GET', 'HEAD'],
      wheres: { path: '.*' },
      parameters: ['path']
    }
  }
};
if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
  Object.assign(Ziggy.routes, window.Ziggy.routes);
}
export { Ziggy };

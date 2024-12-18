const Ziggy = {
  url: 'http:\/\/localhost:82',
  port: 82,
  defaults: {},
  routes: {
    home: { uri: '\/', methods: ['GET', 'HEAD'] },
    login: { uri: 'login', methods: ['GET', 'HEAD'] },
    'login.google': { uri: 'login\/google', methods: ['GET', 'HEAD'] },
    'login.google.callback': { uri: 'auth\/google\/callback', methods: ['GET', 'HEAD'] },
    logout: { uri: 'logout', methods: ['DELETE'] },
    'categories.index': { uri: 'categories', methods: ['GET', 'HEAD'] },
    'categories.create': { uri: 'categories\/create', methods: ['GET', 'HEAD'] },
    'categories.store': { uri: 'categories', methods: ['POST'] },
    'categories.show': {
      uri: 'categories\/{category}',
      methods: ['GET', 'HEAD'],
      parameters: ['category'],
      bindings: { category: 'id' }
    },
    'categories.edit': {
      uri: 'categories\/{category}\/edit',
      methods: ['GET', 'HEAD'],
      parameters: ['category'],
      bindings: { category: 'id' }
    },
    'categories.update': {
      uri: 'categories\/{category}',
      methods: ['PUT', 'PATCH'],
      parameters: ['category'],
      bindings: { category: 'id' }
    },
    'categories.destroy': {
      uri: 'categories\/{category}',
      methods: ['DELETE'],
      parameters: ['category'],
      bindings: { category: 'id' }
    },
    'ingredients.index': { uri: 'ingredients', methods: ['GET', 'HEAD'] },
    'ingredients.create': { uri: 'ingredients\/create', methods: ['GET', 'HEAD'] },
    'ingredients.store': { uri: 'ingredients', methods: ['POST'] },
    'ingredients.show': {
      uri: 'ingredients\/{ingredient}',
      methods: ['GET', 'HEAD'],
      parameters: ['ingredient'],
      bindings: { ingredient: 'id' }
    },
    'ingredients.edit': {
      uri: 'ingredients\/{ingredient}\/edit',
      methods: ['GET', 'HEAD'],
      parameters: ['ingredient'],
      bindings: { ingredient: 'id' }
    },
    'ingredients.update': {
      uri: 'ingredients\/{ingredient}',
      methods: ['PUT', 'PATCH'],
      parameters: ['ingredient'],
      bindings: { ingredient: 'id' }
    },
    'ingredients.destroy': {
      uri: 'ingredients\/{ingredient}',
      methods: ['DELETE'],
      parameters: ['ingredient'],
      bindings: { ingredient: 'id' }
    }
  }
};
if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
  Object.assign(Ziggy.routes, window.Ziggy.routes);
}
export { Ziggy };

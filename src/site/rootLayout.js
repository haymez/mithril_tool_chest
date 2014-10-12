var rootLayout = {}

rootLayout.navState = {
  top: null,
}

rootLayout.view = function(content) {
  var header = m('.base-big-banner', [
    m('h1', 'Mithril Tool Chest'),
  ]);
  var nav = m('nav.nav#navbar', [
    m('ul', [
      m('li', [
        m('a.nav-link.big-nav-link', {
          href: '/', 
          config: m.route, 
          class: (m.route() === '/') ? 'active' : ''
        }, 'Overview')
      ]),
      m('li', [
        m('a.nav-link', {
          href: '/features', 
          config: m.route,
          class: (m.route() === '/features') ? 'active' : ''
        }, 'Features')
      ]),
      m('li', [
        m('a.nav-link', {
          href: '/table', 
          config: m.route,
          class: (m.route() === '/table') ? 'active' : ''
        }, 'Table')
      ]),
    ])
  ])

  return [header, nav, m('.content', content)];

}
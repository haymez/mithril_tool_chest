var rootLayout = {}

rootLayout.fixNav = function(evt) {
  console.log(evt);
}

rootLayout.view = function(content) {
  var header = m('.big-header', 'Mithril Widgets');
  var nav = m('nav.nav', [
    m('ul', [
      m('li', [
        m('a.nav-link.big-nav-link', {
          href: '/', 
          config: m.route, 
          class: (m.route() === '/') ? 'active' : ''
        }, 'Mithril Widgets')
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
var rootLayout = {}

rootLayout.navState = {
  top: null,
}

window.addEventListener('scroll', function(evt) {
  var nav                 = document.getElementById('navbar');
  rootLayout.navState.top = rootLayout.navState.top || (rootLayout.navState.top = nav.offsetTop);
  var windowTop           = window.pageYOffset;

  if(windowTop >= rootLayout.navState.top) {
    if(nav.className.indexOf('stuck') < 0) nav.classList.toggle('stuck');
  }
  else {
    if(nav.className.indexOf('stuck') > -1) nav.classList.toggle('stuck');
  }
});

rootLayout.view = function(content) {
  var header = m('.big-header', 'Mithril Widgets');
  var nav = m('nav.nav#navbar', [
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
var rootLayout = {}


rootLayout.controller = function() {
  this.leavePage = function(href) {
    var body = document.getElementById('body');
    body.className = 'fade-out';
    setTimeout(function() { m.route(href); }, 250);
  }


  this.navItem = function(text, href, bigNavLink) {
    var classString = (bigNavLink) ? '.nav-link.big-nav-link' : '.nav-link';
    return m('li', [
      m('span' + classString, {
        href: href, 
        onclick: m.withAttr('href', this.leavePage),
        class: (m.route() === href) ? 'active' : ''
      }, text),
    ])
  }.bind(this);

}


rootLayout.view = function(ctrl, content) {

  var header = m('.base-big-banner', [
    m('h1', 'Mithril Tool Chest'),
  ]);
  var nav = m('nav.nav#navbar', [
    m('ul', [
      ctrl.navItem('Overview', '/', true),
      ctrl.navItem('Features', '/features', false),
      ctrl.navItem('Table', '/table', false),
      ctrl.navItem('Forms', '/forms', false),
    ])
  ]);

  return [header, nav, m('.content', content)];

}
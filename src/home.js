// Code for mithril widgets

var home = {
  controller: function() {

  },

  view: function(ctrl) {
    return m('div', [
      m('h1', 'Mithril Widgets'),
      m('hr'),
      m('p', 'Click on one of the examples below to sample a widget.'),
      m('table.pure-table', [
        m('thead', [
          m('tr', [
            m('th', 'Widget'),
            m('th', 'Link')
          ])
        ]),
        m('tr', [
          m('td', 'Table'),
          m('td', [
            m('a[href="/table"]', {config: m.route}, 'Link')
          ])
        ])
      ])
    ])
  }
  
};
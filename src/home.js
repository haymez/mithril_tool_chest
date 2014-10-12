var home = {
  controller: function() {},

  view: function(ctrl) {
    var intro = m('div', [
      m('.base-well.', [
        m('h1', 'What is Mithril Tool Chest?'),
        m('p.description', [
          m('span', 'Tool Chest is a collection of components to be used with any '),
          m('strong', 'Mithril.js'),
          m('span', ' project. These tools are being built with an effort to make them as minimilistic as \
            possible while still providing helpful functionality.'),
        ]),
        m('a.base-btn.base-btn-success',
          {href: 'https://github.com/haymez/mithril_widgets'},
          [m('strong', 'View on GitHub')])
      ]),
      m('.base-well.base-well-small', [
        m('h2', 'Dependencies'),
        m('p.description', "Because this library was built using pure javascript and Mithril, you \
          don't need to include any other libraries for it to work."),
      ]),
      m('.base-well', [
        m('h3', 'Current Features:'),
        m('ul.mithril-feature', [
          m('li', [
            m('a.base-btn.base-btn-primary', {href: '/table', config: m.route}, 'Table'),
            m('p.small-description', 'Supports pagination, infinite scrolling, row filtering\
              , and column sorting. simply pass in an options hash with the desired settings along with a 2 \
              dimensional array consisting of your header row and data and the table will take care of the rest.')
          ])
        ]),
      ]),
      m('.mithril-footer', 'Mithril Widgets')
    ]);

    var filler = [];
    for(var i = 0; i < 100; i++) {
    }

    return rootLayout.view([intro, m('ul', filler)]);
  }
  
};
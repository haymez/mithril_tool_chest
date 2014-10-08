// Code for mithril widgets

var home = {
  controller: function() {},

  view: function(ctrl) {
    var intro = m('div', [
      m('.medium-header', 'What is it?'),
      m('.medium-section', [
        m('p.description', [
          m('span', 'A collection of components to be used with any '),
          m('strong', 'Mithril.js'),
          m('span', ' project. These tools are being built with an effort to make them as minimilistic as \
            possible while still providing helpful functionality.'),
        ]),
      ]),
      m('.comment', [
        m('.small-header', 'Dependencies'),
        m('p.small-description', "Because this library was built using pure javascript and Mithril, you \
          don't need to include any other libraries for it to work."),
      ]),
      m('.medium-header', 'Current Features:'),
      m('ul.mithril-feature', [
        m('li', [
          m('a.small-header', {href: '/table', config: m.route}, 'Table'),
          m('p.small-description', 'Supports pagination, infinite scrolling, row filtering\
            , and column sorting. simply pass in an options hash with the desired settings along with a 2 \
            dimensional array consisting of your header row and data and the table will take care of the rest.')
        ])
      ]),
      m('.mithril-footer', 'Mithril Widgets')
    ]);

    var filler = [];
    for(var i = 0; i < 100; i++) {
    }

    return rootLayout.view([intro, m('ul', filler)]);
  }
  
};
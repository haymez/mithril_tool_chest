// Code for mithril widgets

var home = {
  controller: function() {},

  view: function(ctrl) {
    var intro = m('div', [
      m('p.description', [
        m('span', 'A collection of components to be used with any '),
        m('strong', 'Mithril.js'),
        m('span', ' project.')
      ]),
      m('.medium-header', 'Current Features:')
    ]);

    var filler = [];
    for(var i = 0; i < 100; i++) {
      filler.push(m('li', 'Filler Stuff!'));
    }

    return rootLayout.view([intro, m('ul', filler)]);
  }
  
};
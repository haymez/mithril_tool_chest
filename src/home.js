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

    return rootLayout.view(intro);
  }
  
};
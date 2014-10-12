var home = {
  controller: function() {},

  view: function(ctrl) {

    var dependancies = "Because this library was built using pure javascript and Mithril, you \
      don't need to include any other libraries for it to work.";

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
          {href: 'https://github.com/haymez/mithril_tool_chest'},
          [m('strong', 'View on GitHub')])
      ]),
      m('.base-well.base-well-small', [
        m('h2', 'Dependencies'),
        m('p.description', dependancies),
      ]),
    ]);

    var filler = [];
    for(var i = 0; i < 100; i++) {
    }

    return rootLayout.view([intro, m('ul', filler)]);
  }
  
};
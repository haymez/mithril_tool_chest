var features = {};

features.controller = function() {

}

features.view = function(ctrl) {

  var tableDescription = 'Supports pagination, infinite scrolling, row filtering\
    , and column sorting. simply pass in an options hash with the desired settings \
    along with a 2 dimensional array consisting of your header row and data and the \
    table will take care of the rest.';

  var content = m('.base-well', [
    m('h1', 'Features Overview:'),
    m('.base-well', [
      m('h2', 'Table'),
      m('p.small-description', tableDescription),
      m('span', 'Check out the example page: '),
      m('a.base-btn.base-btn-primary', {href: '/table', config: m.route}, 'Example'),
    ])
  ]);

  return rootLayout.view(content);
}
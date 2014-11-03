var features = {};

features.controller = function() {
  this.rootCtrl = new rootLayout.controller();
}

features.view = function(ctrl) {

  var tableDescription = 'Supports pagination, infinite scrolling, row filtering\
    , and column sorting. simply pass in an options hash with the desired settings \
    along with a 2 dimensional array consisting of your header row and data and the \
    table will take care of the rest.';

  var formsDescription = 'This tool allows you to easily create a form that has all the normal\
    functionality that you would expect with the following added benefits:';


  var content = m('.base-well', [
    m('h1', 'Features Overview:'),
    m('.base-well.base-well-small', [
      m('h2', 'Table'),
      m('p.small-description', tableDescription),
      m('span', 'Check out the example page: '),
      m('button.base-btn.base-btn-primary', 
      {
        href: '/table',
        onclick: m.withAttr('href', ctrl.rootCtrl.leavePage),
      }, 'Table'),
    ]),
    m('.base-well.base-well-small', [
      m('h2', 'Mithril Forms'),
      m('p.small-description', formsDescription),
      m('ul', [
        m('li', 'Full Undo/Redo support'),
        m('li', 'Ability to pass in functions to each input for custom functionality'),
        m('li', 'You decide what events to listen for')
      ]),
      m('p.small-description', [
        'Check out the example page here: ',
        m('button.base-btn.base-btn-primary', {
        href: '/forms',
        onclick: m.withAttr('href', ctrl.rootCtrl.leavePage),
        }, 'Forms'),
      ]),
    ]),
  ]);

  return rootLayout.view(ctrl.rootCtrl, m('.fade-in#body', [content]));
}
var formsExample = {};

formsExample.controller = function() {
  this.rootCtrl = new rootLayout.controller();
  this.formChanges = m.prop(0);

  this.formChanged = function(data) {
    console.log('form changed: ', data)
  }.bind(this);


  this.buttonCallback = function(data) {
    var str = '';
    for(var key in data) {
      str += key + ': ' + data[key] + '\n';
    }
    alert(str);
  }.bind(this);


  var inputObjects = [
    {
      tagName:     'input',
      placeholder: 'Enter Username',
      label:       'Username: ',
      groupClass:  'field',
      id:          'username',
    },
    {
      tagName:     'input',
      type:        'password',
      placeholder: 'Enter Password',
      label:       'Password: ',
      groupClass:  'field',
      id:          'password',
    },
    {
      tagName:    'select',
      value:      'Value 1',
      options:    ['Value 1', 'Value 2', 'Value 3', 'Value 4'],
      label:      'List:       ',
      groupClass: 'field',
      id:         'selectBox',
    },
    {
      tagName: 'input',
      type:    'checkbox',
      label:   'Finished: ',
      checked: false,
      id:      'checkbox',
    },
    {
      tagName: 'button',
      label: 'Data: ',
      textValue: 'Show Form Data',
      groupClass: 'field',
      class: 'base-btn base-btn-success',
      callback: this.buttonCallback,
    },
  ];
  var fieldSets = [
    {
      legend: 'Example showcasing multiple types of inputs',
      inputs: inputObjects,
    },
  ];

  var formOpts = {
    showUndo: true,
    undoClass:          'base-btn base-btn-primary',
    redoClass:          'base-btn base-btn-secondary',
    cancelChangesClass: 'base-btn base-btn-error',
    undoGroupClass:     'undo-group',
  }

  this.forms = new forms.controller(fieldSets, this.formChanged, formOpts);
}


formsExample.view = function(ctrl) {

  var content = m('.base-well', [
    m('h1', 'Forms'),
    m('h3', "Changes: " + ctrl.forms.undoStack.length),
    forms.view(ctrl.forms),
  ]);
  return rootLayout.view(ctrl.rootCtrl, m('.fade-in#body', content));
}
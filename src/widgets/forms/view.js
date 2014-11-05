forms.view = function(ctrl) {
  var index = 0;
  return m('form', [
    ctrl.inputObjects.map(function(input) {
      var element = m(input.inputType, { id: 'id' + index, value: ctrl.formData['id' + index++]() });
      element.children = (input.options || []).map(function(option) { return m('option', option); })
      element.attrs[input.listener || 'onchange'] = ctrl.inputChanged;
      return element;
    }),
    m('button', {
      onclick: ctrl.undo,
      style: {display: (ctrl.undoStack.length > 0) ? 'block' : 'none'},
    }, 'Undo'),
    m('button', {
      onclick: ctrl.redo,
      style: {display: (ctrl.redoStack.length > 0) ? 'block' : 'none'},
    }, 'Redo'),
    m('button', {
      onclick: ctrl.cancelChanges,
      style: {display: (ctrl.undoStack.length > 0) ? 'block' : 'none'},
    }, 'Cancel All Changes'),
  ]);
}
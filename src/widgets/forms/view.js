forms.view = function(ctrl) {
  return m('form', [
    ctrl.inputObjects.map(function(input) {
      var element = m(input.inputType, {id: input.id, value: ctrl.formData[input.id]()});
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
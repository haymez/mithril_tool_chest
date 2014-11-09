var forms = {}

forms.controller = function(fieldSets, callback, opts) {
  this.fieldSets       = fieldSets;
  this.undoStack       = [];
  this.redoStack       = [];
  this.formData        = {};
  this.prevHash        = {};
  this.buttonCallbacks = {};
  this.opts            = opts;


  this.initForm = function() {
    for(var fieldSet in this.fieldSets) {
      var currFieldSet = this.fieldSets[fieldSet];
      for(var el in currFieldSet.inputs) {
        var itemId = currFieldSet.inputs[el].id || 'id' + fieldSet + el;
        // Initialize value using m.prop
        var itemValue = ''
        if(currFieldSet.inputs[el].checked != undefined) itemValue = currFieldSet.inputs[el].checked
        else if(currFieldSet.inputs[el].value) itemValue = currFieldSet.inputs[el].value;
        if(currFieldSet.inputs[el].tagName !== 'button')
          this.formData[itemId] = m.prop(itemValue);
        // Handle callback if button
        if(currFieldSet.inputs[el].tagName === 'button')
          this.buttonCallbacks[itemId] = currFieldSet.inputs[el].callback;
      }
    }
  }.bind(this);


  this.getFormData = function() {
    var hash = {}
    for(var key in this.formData) {
      hash[key] = this.formData[key]();
    }
    return hash;
  }.bind(this);


  this.buttonCallback = function(evt) {
    this.buttonCallbacks[evt.target.id](this.getFormData());
    return false;
  }.bind(this);


  this.inputChanged = function(evt) {
    this.redoStack = [];
    var target = evt.target
    var setValue = (target.type === 'checkbox') ? target.checked : target.value;
    if(setValue !== this.formData[target.id]()) {
      this.addToUndoStack();
      this.formData[target.id](setValue);
      callback(this.getFormData());
      return target.checked || target.value;
    }
  }.bind(this);


  this.cloneObj = function(obj) {
    var clone = {}
    for(var key in obj) { clone[key] = obj[key]; }
    return clone;
  }


  this.cancelChanges = function(evt) {
    if(confirm('Are you sure you want to revert all Changes?\
     Changes to be reverted: ' + this.undoStack.length)) {
      var obj = this.undoStack[0];
      for(var key in obj) { this.formData[key](obj[key]); }
      this.undoStack = [];
      this.redoStack = [];
    }
    return false;
  }.bind(this);


  this.redo = function(evt) {
    this.addToUndoStack();
    var obj = this.redoStack.pop();
    for(var key in obj) { this.formData[key](obj[key]); }
    return false;
  }.bind(this);


  this.undo = function(evt) {
    var obj = this.undoStack.pop();
    this.addToRedoStack();
    for(var key in obj) {this.formData[key](obj[key]); }
    return false;
  }.bind(this);


  this.addToRedoStack = function() {
    var hash = {};
    for(var key in this.formData) { hash[key] = this.formData[key](); }
    this.redoStack.push(hash);
  }.bind(this);


  this.addToUndoStack = function() {
    var hash = {};
    for(var key in this.formData) { hash[key] = this.formData[key](); }
    this.undoStack.push(hash);
  }.bind(this);

  this.initForm();
}
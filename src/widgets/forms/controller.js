var forms = {}

forms.controller = function(inputObjects, callback) {
  this.inputObjects = inputObjects;
  this.undoStack    = [];
  this.redoStack    = [];
  this.formData     = {};
  this.prevHash     = {};


  this.initForm = function() {
    for(var el in this.inputObjects) {
      this.formData['id' + el] = m.prop(this.inputObjects[el].value);
    }
  }.bind(this);


  this.inputChanged = function(evt) {
    this.redoStack = [];
    this.addToUndoStack();
    var target = evt.target
    this.formData[target.id](target.value);
    var hash = {};
    for(var key in this.formData) { hash[key] = this.formData[key](); }
    callback.call(this, hash);
    // console.log(hash);
    return target.value;
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
    for(var key in obj) { this.formData[key](obj[key]); }
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
var table = {};
table.Table = function(rows, opts) {
  this.header      = rows.splice(0, 1)[0];
  this.body        = rows;
  this.filtered    = this.body;
  this.classNames  = (opts.classNames) ? opts.classNames : {};
  this.paginate    = (opts.paginate) ? m.prop(opts.paginate) : m.prop(this.body.length);
  this.height      = (opts.height) ? m.prop(opts.height) : m.prop();
  this.search      = (opts.search) ? opts.search : false;
  this.currColumn  = m.prop();
  this.reverse     = m.prop(false);
  this.currentPage = m.prop(1);
  this.infinite    = m.prop(opts.infinite);
  this.divY        = m.prop(0);
  this.divHeight   = m.prop(window.innerHeight);
  this.rowHeight   = m.prop(30);
  
  // Listen for scroll 
  this.updateState = function(evt) {
    this.divHeight(evt.target.offsetHeight);
    this.divY(evt.target.scrollTop);
    for(var i = 0; i < evt.target.children.length; i++) {
      if(evt.target.children[i].tagName === 'TABLE') {
        var table = evt.target.children[i]
        this.rowHeight(table.children[table.children.length-1].offsetHeight) // Get row height
      }
    }
  }.bind(this);

  this.sortFunction = function(a, b) {
    var curr = this.header.indexOf(this.currColumn());
    if(a[curr] === b[curr]) return 0;
    else {
      if(this.reverse()) return (a[curr] < b[curr]) ? 1 : -1;
      else return (a[curr] < b[curr]) ? -1 : 1;
    }
  }.bind(this);

  this.sortByColumn = function(value) {
    if(value === this.currColumn()) this.reverse(!this.reverse());
    else this.reverse(false);
    this.currColumn(value);
  }.bind(this);

}

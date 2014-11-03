table.controller = function(rows, opts) {
  this.state = new table.Table(rows, opts);


  this.getArrow = function(th) {
    var columnStyles = this.state.classNames.up && this.state.classNames.down;
    if(th === this.state.currColumn() && columnStyles) {
      var direction = (this.state.reverse()) ? this.state.classNames.down : this.state.classNames.up;
      return m('i' + direction, {style: 'float:right;'});
    }
    return [];
  }.bind(this);

  this.filterTable = function(value) {
    this.state.filtered = [];

    var searchRow = function(row) {
      for(var i = 0; i < row.length; i++) {
        if(String(row[i]).search(new RegExp(value, 'i')) > -1) {
          this.state.filtered.push(row);
          break;
        }
      }
    }.bind(this)
    this.state.body.forEach(searchRow);
  }.bind(this);

  this.goToPage = function(page) {
    var page = Number(page.replace(',', ''));
    if(page != this.state.currentPage()) this.state.currentPage(page);
  }.bind(this);

};
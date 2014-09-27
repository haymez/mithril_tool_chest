var table = {

  controller: function(header, body, opts) {
    this.header = header;
    this.body   = body;
    this.styles = opts;
    this.currColumn = m.prop();
    this.reverse = m.prop(false);

    this.sortFunction = function(a, b) {
      var curr = this.header.indexOf(this.currColumn());
      if(a[curr] === b[curr]) return 0;
      else {
        if(this.reverse())
          return (a[curr] < b[curr]) ? 1 : -1;
        else
          return (a[curr] < b[curr]) ? -1 : 1;
      }
    }.bind(this);

    this.sortByColumn = function(value) {
      if(value === this.currColumn()) this.reverse(!this.reverse());
      else this.reverse(false);
      this.currColumn(value);
    }.bind(this);

    this.getArrow = function(th) {
      if(th === this.currColumn()) {
        var direction = (this.reverse()) ? this.styles.down : this.styles.up;
        return m('i' + direction, {style: 'float:right;'});
      }
      else return [];
    }.bind(this);

  },

  view: function(ctrl) {
    return m('table' + ctrl.styles.table, [
      m('thead', [
        m('tr', {onclick: ctrl.body.sort(ctrl.sortFunction)}, ctrl.header.map(function(item, index) {
          var arrow = ctrl.getArrow(item);
          return m('th', {onclick: m.withAttr('textContent', ctrl.sortByColumn)}, [
            item,
            arrow,
          ]);
        }))
      ]),
      ctrl.body.map(function(row, index) {
        return m('tr', row.map(function(td) {
          return m('td', td);
        }))
      })
    ])
  }
}
var table = {
  controller: function(header, body, opts) {
    this.header     = header;
    this.body       = body;
    this.filtered   = this.body;
    this.styles     = (opts) ? opts : {};
    this.currColumn = m.prop();
    this.reverse    = m.prop(false);
    this.paginate   = m.prop(10);
    this.currentPage = m.prop(1);


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
      var columnStyles = this.styles.up && this.styles.down;
      if(th === this.currColumn() && columnStyles) {
        var direction = (this.reverse()) ? this.styles.down : this.styles.up;
        return m('i' + direction, {style: 'float:right;'});
      }
      return [];
    }.bind(this);

    this.filterTable = function(value) {
      this.filtered = [];

      var searchRow = function(row) {
        for(var i = 0; i < row.length; i++) {
          if(String(row[i]).search(new RegExp(value, 'i')) > -1) {
            this.filtered.push(row);
            break;
          }
        }
      }.bind(this)

      this.body.forEach(searchRow);
    }.bind(this);

    this.goToPage = function(page) {
      var page = Number(page.replace(',', ''));
      if(page != this.currentPage()) this.currentPage(page);
    }.bind(this);

  },

  view: function(ctrl) {
    var sliceStart = (ctrl.currentPage() - 1) * ctrl.paginate();
    var table = m('table' + ctrl.styles.table, [
      m('thead', [
        m('tr', {onclick: ctrl.filtered.sort(ctrl.sortFunction)}, ctrl.header.map(function(item, index) {
          var arrow = ctrl.getArrow(item);
          return m('th', {onclick: m.withAttr('textContent', ctrl.sortByColumn)}, [
            item,
            arrow,
          ]);
        }))
      ]),
      ctrl.filtered.slice(sliceStart, sliceStart + ctrl.paginate()).map(function(row, index) {
        return m('tr', row.map(function(td) {
          return m('td', td);
        }))
      })
    ])

    var inputClass = (ctrl.styles.search) ? ctrl.styles.search : ''
    var search = m('input' + inputClass, {type: 'text', onkeyup: m.withAttr('value', ctrl.filterTable)});

    var paginate = [];
    if(ctrl.paginate() < ctrl.filtered.length) for(var i = 0; i < Math.ceil(ctrl.filtered.length / ctrl.paginate()); i++) {
      var number = i + 1;
      if(i < Math.ceil(ctrl.filtered.length / ctrl.paginate()) - 1) number += ', ';
      paginate.push(
        m('span', {onclick: m.withAttr('textContent', ctrl.goToPage)}, number)
      );
    }

    return [search, table, paginate];
  }
}
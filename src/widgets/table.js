var table = {};

table.Table = function(rows, opts) {
  this.header      = rows.splice(0, 1)[0];
  this.body        = rows;
  this.filtered    = this.body;
  this.styles      = (opts.style) ? opts.style : {};
  this.paginate    = (opts.paginate) ? m.prop(opts.paginate) : m.prop(this.body.length);
  this.height      = (opts.height) ? m.prop(opts.height) : m.prop();
  this.search      = (opts.search) ? opts.search : false;
  this.currColumn  = m.prop();
  this.reverse     = m.prop(false);
  this.currentPage = m.prop(1);
  this.infinite    = m.prop(!!opts.infinite);
  this.divY        = m.prop(0);
  this.divHeight   = m.prop(window.innerHeight);
  this.rowHeight   = m.prop(30);
  
  this.updateState = function(evt) {
    this.divHeight(evt.target.offsetHeight);
    this.divY(evt.target.scrollTop);
    for(var i = 0; i < evt.target.children.length; i++) {
      if(evt.target.children[i].tagName === 'TABLE') {
        var table = evt.target.children[i]
        this.rowHeight(table.children[table.children.length-1].offsetHeight)
      }
    }
    m.redraw();
  }.bind(this);

  this.sortFunction = function(a, b) {
    var curr = this.header.indexOf(this.currColumn());
    if(a[curr] === b[curr]) return 0;
    else {
      if(this.reverse()) return (a[curr] < b[curr]) ? 1 : -1;
      else return (a[curr] < b[curr]) ? -1 : 1;
    }
  }.bind(this);

}

table.controller = function(rows, opts) {
  this.state = new table.Table(rows, opts);

  this.sortByColumn = function(value) {
    if(value === this.state.currColumn()) this.state.reverse(!this.state.reverse());
    else this.state.reverse(false);
    this.state.currColumn(value);
  }.bind(this);

  this.getArrow = function(th) {
    var columnStyles = this.state.styles.up && this.state.styles.down;
    if(th === this.state.currColumn() && columnStyles) {
      var direction = (this.state.reverse()) ? this.state.styles.down : this.state.styles.up;
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

};

table.view = function(ctrl) {
  var table      = [];
  var sliceStart = (ctrl.state.currentPage() - 1) * ctrl.state.paginate();
  var begin      = ctrl.state.divY() / ctrl.state.rowHeight() | 0;
  var end        = begin + (ctrl.state.divHeight() / ctrl.state.rowHeight() | 0 + 2);
  var offset     = ctrl.state.divY() % ctrl.state.rowHeight();

  if(ctrl.state.infinite()) {
    table = m('div', {style: {height: ctrl.state.filtered.length * ctrl.state.rowHeight() + 'px'}}, [
      m('table' + ctrl.state.styles.table,
        {
          style: {
            top: ctrl.state.divY() + 'px',
            position: 'relative',
          }
        },
        [
          m('thead', [
            m('tr', {onclick: ctrl.state.filtered.sort(ctrl.sortFunction)}, ctrl.state.header.map(function(item, index) {
              var arrow = ctrl.getArrow(item);
              return m('th', {onclick: m.withAttr('textContent', ctrl.sortByColumn)}, [item, arrow]);
            }))
          ]),
          ctrl.state.filtered.slice(begin, end).map(function(row, index) {
            return m('tr', row.map(function(td) {
              return m('td', td);
            }))
          })
      ])
    ]);
  } 
  else {
    table = m('table' + ctrl.styles.table, [
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
  }

  var inputClass = (ctrl.state.styles.input) ? ctrl.state.styles.input : ''
  var search     = [];
  if(ctrl.search) {
    search = [];
    if(ctrl.infinite()) 
      search = m('input' + inputClass, {style: {position: 'relative', top: ctrl.divY()+'px'}, type: 'text', onkeyup: m.withAttr('value', ctrl.filterTable)});
    else
      search = m('input' + inputClass, {type: 'text', onkeyup: m.withAttr('value', ctrl.filterTable)});
  }

  var paginate    = [];
  var totalPages  = Math.ceil(ctrl.state.filtered.length / ctrl.state.paginate());
  var startNumber = (ctrl.state.currentPage() - 5 < 0) ? 0 : ctrl.state.currentPage() - 5;
  var endNumber   = (startNumber + 10 > totalPages) ? totalPages : startNumber + 10;
  if(ctrl.state.paginate() < ctrl.state.filtered.length) 
    for(var i = startNumber; i < endNumber; i++) {
      var number = i + 1;
      if(startNumber > 1 && i === startNumber) paginate.push('... ');
      if(i < Math.ceil(ctrl.filtered.length / ctrl.paginate()) - 1) number += ' ';
      if(i+1 !== ctrl.currentPage())
        paginate.push(m('span', {onclick: m.withAttr('textContent', ctrl.goToPage)}, number));
      else {
        paginate.push(
          m('span', {style: 'font-weight: bold;', onclick: m.withAttr('textContent', ctrl.goToPage)}, number)
        );
      }
      if(endNumber < totalPages && i === endNumber - 1) paginate.push('...');
    }

  return [
    m('.mithril-table',
      {
        style: ['height:', ctrl.state.height(), 'px;overflow-y:auto;overflow-x:hidden'].join(''), 
        onscroll: ctrl.state.updateState
      },
      [search, table]
    ),
    paginate,
  ];
}

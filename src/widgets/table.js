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

table.view = function(ctrl) {
  var table      = [];
  var sliceStart = (ctrl.state.currentPage() - 1) * ctrl.state.paginate();
  var divHeight  = ctrl.state.filtered.length * ctrl.state.rowHeight()
  var begin      = ctrl.state.divY() / ctrl.state.rowHeight() | 0;
  var end        = begin + (ctrl.state.divHeight() / ctrl.state.rowHeight() | 0 + 2);
  var offset     = end > ctrl.state.filtered.length ? -(ctrl.state.divY() % ctrl.state.rowHeight()) : 0;

  if(ctrl.state.infinite()) {
    table = m('div', 
    {
      style: {
        height: ctrl.state.filtered.length * ctrl.state.rowHeight() + 'px',
      }
    },
    [
      m('table' + ctrl.state.classNames.table,
        {
          style: {
            top: ctrl.state.divY() + offset + 'px',
            width: '100%',
            position: 'relative',
          }
        },
        [
          m('thead', [
            m('tr', {onclick: ctrl.state.filtered.sort(ctrl.state.sortFunction)}, ctrl.state.header.map(function(item, index) {
              var arrow = ctrl.getArrow(item);
              return m('th', {onclick: m.withAttr('textContent', ctrl.state.sortByColumn)}, [item, arrow]);
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
    table = m('table' + ctrl.state.classNames.table, {style:{width:'100%'}}, [
      m('thead', [
        m('tr', {onclick: ctrl.state.filtered.sort(ctrl.state.sortFunction)}, ctrl.state.header.map(function(item, index) {
          var arrow = ctrl.getArrow(item);
          return m('th', {onclick: m.withAttr('textContent', ctrl.state.sortByColumn)}, [
            item,
            arrow,
          ]);
        }))
      ]),
      ctrl.state.filtered.slice(sliceStart, sliceStart + ctrl.state.paginate()).map(function(row, index) {
        return m('tr', row.map(function(td) {
          return m('td', td);
        }))
      })
    ])
  }

  var inputClass = (ctrl.state.classNames.input) ? ctrl.state.classNames.input : ''
  var search     = [];
  if(ctrl.state.search) {
    search = [];
    if(ctrl.state.infinite()) 
      search = m('input' + inputClass,
      {
        style: {
          width: '99.5%',
          'z-index': 1,
          position: 'relative',
          top: ctrl.state.divY()+'px'
        },
        type: 'text',
        onkeyup: m.withAttr('value', ctrl.filterTable)
      });
    else
      search = m('input' + inputClass,
      {
        style: {
          width: '99.5%',
          'z-index': 1,
        },
        type: 'text',
        onkeyup: m.withAttr('value', ctrl.filterTable)
      });
  }

  var paginate    = [];
  var totalPages  = Math.ceil(ctrl.state.filtered.length / ctrl.state.paginate());
  var startNumber = (ctrl.state.currentPage() - 5 < 0) ? 0 : ctrl.state.currentPage() - 5;
  var endNumber   = (startNumber + 10 > totalPages) ? totalPages : startNumber + 10;
  if(ctrl.state.paginate() < ctrl.state.filtered.length) 
    for(var i = startNumber; i < endNumber; i++) {
      var number = i + 1;
      if(startNumber > 1 && i === startNumber) paginate.push('... ');
      if(i < Math.ceil(ctrl.state.filtered.length / ctrl.state.paginate()) - 1) number += ' ';
      if(i+1 !== ctrl.state.currentPage())
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
        style: {
          height: ctrl.state.height() + 'px',
          'overflow-y': 'auto',
          'overflow-x': 'hidden',
        }, 
        onscroll: ctrl.state.updateState
      },
      [search, table]
    ),
    paginate,
  ];
}

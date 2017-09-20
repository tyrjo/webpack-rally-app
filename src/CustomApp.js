Ext.define('CustomApp', {
  extend: 'Rally.app.App',
  componentCls: 'app',
  items: [
    {
      xtype: 'container',
      itemId: 'pulldown-container',
      layout: {
        type: 'hbox',
        align: 'stretch',
      },
    },
  ],

  launch() {
    this._loadIterations();
  },

  _loadIterations() {
    const iterComboBox = {
      xtype: 'rallyiterationcombobox',
      itemId: 'iteration-combobox',
      fieldLabel: 'Iteration',
      labelAlign: 'right',
      listeners: {
        ready: this._loadUsers,
        select: this._loadData,
        scope: this,
      },
    };
    this.down('#pulldown-container').add(iterComboBox);
  },

  _loadUsers() {
    const usersComboBox = {
      xtype: 'rallyfieldvaluecombobox',
      itemId: 'user-combobox',
      model: 'User Story',
      field: 'Owner',
      fieldLabel: 'Owner',
      labelAlign: 'right',
      listeners: {
        ready: this._loadData,
        select: this._loadData,
        scope: this,
      },
    };
    this.down('#pulldown-container').add(usersComboBox);
  },

  _getFilters(iterationRef, ownerRef) {
    let filters = Ext.create('Rally.data.wsapi.Filter', {
      property: 'Iteration',
      operation: '=',
      value: iterationRef,
    });
    if (ownerRef) {
      const ownerFilter = Ext.create('Rally.data.wsapi.Filter', {
        property: 'Owner',
        operation: '=',
        value: ownerRef,
      });
      filters = filters.and(ownerFilter);
    }
    return filters;
  },

  _loadData() {
    const selectedIterRef = this.down('#iteration-combobox').getRecord().get('_ref');
    const selectedOwnerRef = this.down('#user-combobox').getValue();
    let filters = this._getFilters(selectedIterRef, selectedOwnerRef);

    if (selectedOwnerRef) {
      const ownerFilter = Ext.create('Rally.data.wsapi.Filter', {
        property: 'Owner',
        operation: '=',
        value: selectedOwnerRef,
      });
      filters = filters.and(ownerFilter);
    }
    if (this.userStoryStore) {
      this.userStoryStore.setFilter(filters);
      this.userStoryStore.load();
    } else {
      this.userStoryStore = Ext.create('Rally.data.wsapi.Store', {
        model: 'User Story',
        autoLoad: true,
        pageSize: 25,
        filters,
        listeners: {
          load: this._onStoreLoad,
          scope: this,
        },
        fetch: ['FormattedId', 'Name', 'ScheduleState', 'Iteration', 'Owner'],
      });
    }
  },

  _onStoreLoad(store) {
    if (!this.myGrid) {
      this._createGrid(store);
    }
  },

  _createGrid(store) {
    this.myGrid = {
      xtype: 'rallygrid',
      store,
      columnCfgs: [
        'FormattedID', 'Name', 'ScheduleState', 'Owner',
      ],
    };
    this.add(this.myGrid);
  },
});

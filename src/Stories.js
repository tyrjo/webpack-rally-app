const StoryTree = class {

  init() {
    this.projectPicker = Ext.create('Rally.ui.picker.project.ProjectPicker', {
      listeners: {
        change: (picker, value, opts) => {
          const record = picker.getSelectedRecord();
          this.onProjectChange(record.data.Workspace._ref, value);
        }
      }
    });

    this.container = Ext.create('Ext.container.Container', {
      items: [
        this.projectPicker,
      ]
    });

    return this;
  }

  onProjectChange(workspaceUri, projectUri) {
    const filters = Rally.data.wsapi.Filter.and([
      {
        property: 'Project',
        operation: '=',
        value: projectUri
      }
    ]);

    Ext.create('Rally.data.wsapi.TreeStoreBuilder').build({
      models: ['UserStory'],
      context: {
        workspace: workspaceUri,
        project: null
      },
      autoLoad: true,
      enableHierarchy: true,
      filters
    }).then(store => {
      if (this.treeGrid) {
        // TODO (tj) this is odd...should be able to setStore instead
        this.container.remove(this.treeGrid);
      }
      this.treeGrid = Ext.create('Rally.ui.grid.TreeGrid', {
        store,
        columnCfgs: [
          'Name'
        ]
      });
      this.container.add(this.treeGrid);

    });
  }

  render() {
    return this.container;
  }
};

export default StoryTree;

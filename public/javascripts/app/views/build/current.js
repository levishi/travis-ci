Travis.Views.Build.Current = Travis.Views.Build.Build.extend({
  initialize: function() {
    _.bindAll(this, 'attachTo', 'update', 'setTab');
    Travis.Views.Build.Build.prototype.initialize.apply(this, arguments);
  },
  attachTo: function(repository) {
    this.repository = repository;
    this.setTab();

    var builds = this.repository.builds();
    builds.bind('load', this.update); // TODO
    builds.bind('refresh', this.update);
    builds.bind('add', this.update);
    builds.whenLoaded(this.update);
  },
  update: function() {
    this.build = this.repository.builds().first();
    this.setTab();
    this.el.empty();

    if(this.build) {
      this.renderSummary();
      this.build.matrix ? this.renderMatrix() : this.renderLog();
    }
  },
  setTab: function() {
    $('a', this.el.prev()).attr('href', '#!/' + this.repository.get('name'));
  },
  renderSummary: function() {
    this.el.append(new Travis.Views.Build.Summary({ model: this.build }).render().el);
  },
  renderLog: function() {
    this.el.append(new Travis.Views.Build.Log({ model: this.build }).render().el);
  },
  renderMatrix: function() {
    this.el.append(new Travis.Views.Build.Matrix.Table({ builds: this.build.matrix }).render().el);
  }
});



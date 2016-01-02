BootstrapAlert = class BootstrapAlert {
  constructor(level, message, cat) {
    this.level = level || 'info';
    this.message = message || 'Please set a message when creating an alert';
    this.dismissable = true;
    this.category = cat;
  }

  dismissableClass() {
    return (this.dismissable) ? 'alert-dismissable' : '';
  }

  levelClass() {
    return 'alert-' + this.level;
  }

  show(opt_dismissTimeMS) {

  }

  hide() {

  }
};


var g_cats = new ReactiveVar({});
AlertCategory = class AlertCategory {

  static getOrCreate(name) {
    if (!name) return undefined;

    var cats = g_cats.get();
    var object = cats[name];
    if (!object) { //create
      object = new AlertCategory(name);
      cats[name] = object;
      g_cats.set(cats);
    }

    return object;
  }

  static get(name) {
    if (!name) return undefined;
    return g_cats.get()[name];
  }

  static remove(name) {
    if (!name) return undefined;
    var cats = g_cats.get();
    var obj = cats[name]; //save for return
    delete cats[name];
    g_cats.set(cats);
    return obj;
  }

  static add(name, obj) {
    if (!name) return undefined;
    var cats = g_cats.get();
    cats[name]=obj;
    g_cats.set(cats);
    return obj;
  }

  static update(name, obj) {
    AlertCategory.remove(name);
    AlertCategory.add(name, obj);
  }

  constructor(name) {
    this._name = name;
    this._alerts = new ReactiveVar([]);
  }

  get alerts() {
    return this._alerts.get();
  }

  set alerts(val) {
    return this._alerts.set(val);
  }

  get name() { return this._name; }

  //read only, no setter

  show(level, message, opt_dismissFn, opt_dismissTimeMS) {
    var alert = new BootstrapAlert(level, message, this.name);
    alert.dismissFn = opt_dismissFn;
    var array = this.alerts.concat([alert]);
    this.alerts = array;
    AlertCategory.update(this.name, this);

    if (opt_dismissTimeMS) {
      var that = this;
      new Timer(opt_dismissTimeMS, function(timer) {
          that.hide(alert);
        }
      ).start();
    }
  }

  hide(alertObj) {
    this.alerts = _(this.alerts).without(alertObj);
    AlertCategory.update(this.name, this);
  }
}

AlertCategory.prototype.allAlerts = function() {
  return this.alerts;
};

Template.AlertCategory.helpers({
    alerts: function() {
      var cat = AlertCategory.get(this.name);
      if (cat) {
        var a = cat._alerts.curValue || [];
        return a;
      }

    }
  }
);

Template.BootstrapAlert.helpers({
    levelClass: function() {
      return 'alert-' + this.level;
    },
    dismissableClass: function() {
      return (this.dismissable) ? 'alert-dismissable' : '';
    },
    message: function() {
      return this.message;
    }
  }
);

Template.BootstrapAlert.events({
  'click .close': function() {
    var cat = AlertCategory.get(this.category);
    if (cat) cat.hide(this);
  }
})

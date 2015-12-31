BootstrapAlert = class BootstrapAlert {
  constructor(level, message) {
    this.level = level || 'info';
    this.message = message || 'Please set a message when creating an alert';
    this.dismissable = true;
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


var g_alerts = new ReactiveDict();
AlertCategory = class AlertCategory {

  static getOrCreate(name) {
    if (!name) return undefined;

    var object = g_alerts.get(name);
    if (!object) { //create
      object = new AlertCategory(name);
      g_alerts.set(name, object);
    }

    return object;
  }

  static get(name) {
    if (!name) return undefined;
    return g_alerts.get(name);
  }

  static remove(name) {
    if (!name) return undefined;
    var obj = g_alerts.get(name);
    g_alerts.delete(name);
    return obj;
  }

  static add(name, obj) {
    if (!name) return undefined;
    g_alerts.set(name, obj);
    return obj;
  }

  static update(name, obj){
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

  show(level, message, opt_dismissTimeMS) {
    var alert = new BootstrapAlert(level, message);
    var array = this.alerts.concat([alert]);
    this.alerts = array;
    AlertCategory.update(this.name, this);

    if (opt_dismissTimeMS){
      var that = this;
      new Timer(opt_dismissTimeMS, function(timer){
        that.hide(alert);
      }).start();
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

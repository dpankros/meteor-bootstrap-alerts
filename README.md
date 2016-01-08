Bootstrap-alerts
================

Meteor plugin for easy to use categorized alerts for bootstrap 3.  Categories allow you to have alerts specific to one or more areas of your app, such as one for the top of a page and another for a modal dialog.

The alerts can be customized to auto dismiss after a period, by passing a timeout in milliseconds, or to trigger a callback when the alert is dismissed by passing a function..

Quick Usage
-----------

```javascript
AlertCategory.getOrCreate('myCategory').show('warning', 'My Alert Message', 10000, function(alert){console.log('bye bye alert!')};
```

```html
<template name='someTemplate'>
  {{>AlertCategory name='myCategory'}}
  ... some other stuff...
</template>
```


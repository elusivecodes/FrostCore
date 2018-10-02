# FrostCore

**FrostCore** is a free, open-source DOM manipulation library for *JavaScript*.

It is heavily inspired by jQuery, but supports both functional and OOP style programming, mutable and immutable Query Sets and many unique features.


## Table of contents
- [Core](#core)
    - [DOM](#dom)
        - [Animation](#animation)
        - [Attributes](#attributes)
        - [Events](#events)
        - [Manipulation](#manipulation)
        - [Traversal](#traversal)
        - [Utility](#utility)
    - [AJAX](#ajax)
    - [Cookie](#cookie)
    - [Event Factory](#event-factory)
    - [Parsers](#parsers)
- [Frost](#frost)
    - [Array](#array)
    - [Math](#math)
    - [String](#string)
    - [Tests](#tests)
- [Query Set](#query-set)



## Core

### DOM

#### Animation

##### Animate

Add an animation to each element.

```
const callback = (node, progress) => core.setStyle(node, 'opacity', progress);

core.animate(nodes, callback, duration = 1000);
```

Stop all animations for each element.

```
core.stop(nodes, finish = true);
```

##### Animations

Slide each element in or out from the top over a duration.

```
core.dropIn(nodes, duration = 1000);
core.dropOut(nodes, duration = 1000);
```

Fade the opacity of each element in or out over a duration.

```
core.fadeIn(nodes, duration = 1000);
core.fadeOut(nodes, duration = 1000);
```

Rotate each element in or out on an x y over a duration.

```
core.rotateIn(nodes, x = 0, y = 1, inverse = false, duration = 1000);
core.rotateOut(nodes, x = 0, y = 1, inverse = false, duration = 1000);
```

Slide each element into or out of place from a direction over a duration.

```
core.slideIn(nodes, direction = 'bottom', duration = 1000);
core.slideOut(nodes, direction = 'bottom', duration = 1000);
```

Squeeze each element into or out of palce from a direction over a duration.

```
core.squeezeIn(nodes, direction = 'bottom', duration = 1000);
core.squeezeOut(nodes, direction = 'bottom', duration = 1000);
```

##### Queue

Queue a callback on each element.

```
const callback = node => new Promise(resolve => setTimeout(resolve, 1000));

core.queue(nodes, callback);
```

Clear the queue for each element.

```
core.clearQueue(nodes);
```


#### Attributes

Get an attribute value for the first element.

```
const attr = core.getAttribute(nodes, attribute);
```

Set attributes for each element.

```
core.setAttribute(nodes, attributes);
core.setAttribute(nodes, attribute, value);
```

Remove an attribute from each element.

```
core.removeAttribute(nodes, attribute);
```

Get a dataset value for the first element.

```
const dataset = core.getDataset(nodes);
const keyDataset = core.getDataset(nodes, key);
```

Set dataset values for each element.

```
core.setDataset(nodes, key, value);
```

Get the HTML contents of the first element.

```
const html = core.getHTML(nodes);
```

Set the HTML contents for each element.

```
core.setHTML(nodes, html);
```

Get a property value for the first element.

```
const prop = core.getProperty(nodes, property);
```

Set property values for each element.

```
core.setProperty(nodes, property, value);
```

Remove a property from each element.

```
core.removeProperty(nodes, property);
```

Get the text contents of the first element.

```
const text = core.getText(nodes);
```

Set the text contents for each element.

```
core.setText(nodes, text);
```

Get the value property of the first element.

```
const val = core.getValue(nodes);
```

Set the value property for each element.

```
core.setValue(nodes, value);
```

##### Data

Get custom data for the first node.

```
const data = core.getData(nodes);
const keyData = core.getData(nodes, key);
```

Set custom data for each node.

```
core.setData(nodes, key, value);
```

Remove custom data for each node.

```
core.removeData(nodes, key);
```

##### Position

Get the X,Y co-ordinates for the center of the first element (optionally offset).

```
const center = core.center(nodes, offset);
```

Get the position of the first element relative to the window (optionally offset).

```
const pos = core.position(nodes, offset);
```

Get the computed bounding rectangle of the first element (optionally offset).

```
const rect = core.rect(nodes, offset);
```

Constrain each element to a container element.

```
core.constrain(nodes, container);
```

Get the distance of an element to an X,Y position in the window (optionally offset).

```
const dist = core.distTo(nodes, x, y, offset);
```

Get the distance between two elements.

```
const dist = core.distToNode(nodes, others);
```

Get the nearest element to an X,Y position in the window (optionally offset).

```
const nearest = core.nearestTo(nodes, x, y, offset);
```

Get the nearest element to another element.

```
const nearest = core.nearestToNode(nodes, others);
```

Get the percentage of an X co-ordinate relative to an element.

```
const pX = core.percentX(nodes, x, offset);
```

Get the percentage of a Y co-ordinate relative to an element.

```
const pY = core.percentY(nodes, y, offset);
```

##### Scroll

Scroll each element to an X,Y position.

```
core.scrollTo(nodes, x, y);
```

Scroll each element to an X position.

```
core.scrollToX(nodes, x);
```

Scroll each element to a Y position.

```
core.scrollToY(nodes, y);
```

Get the scroll X position of the first element.

```
const scrollX = core.scrollX(nodes);
```

Get the scroll Y position of the first element.

```
const scrollY = core.scrollY(nodes);
```

##### Size

Get the computed height of the first element (and optionally padding, border or margin).

```
const height = core.height(nodes, padding, border, margin);
```

Get the computed width of the first element (and optionally padding, border or margin).

```
const width = core.width(nodes, padding, border, margin);
```

##### Styles

Add a class or classes to each element.

```
core.addClass(nodes, ...classes);
```

Remove a class or classes from each element.

```
core.removeClass(nodes, ...classes);
```

Toggle a class or classes for each element.

```
core.toggleClass(nodes, ...classes);
```

Get the computed style for the first element.

```
const css = core.css(nodes, style);
```

Get a style property for the first element.

```
const style = core.getStyle(nodes, style);
```

Set style properties for each element.

```
core.setStyle(nodes, styles);
core.setStyle(nodes, style, value, important);
```

Hide each element from display.

```
core.hide(nodes);
```

Display each hidden element.

```
core.show(nodes);
```

Toggle the visibility of each element.

```
core.toggle(nodes);
```


#### Events

Add an event to each element.

```
core.addEvent(nodes, events, callback);
core.addEvent(nodes, events, delegate, callback);
```

Add a self-destructing event to each element.

```
core.addEventOnce(nodes, events, callback);
core.addEventOnce(nodes, events, delegate, callback);
```

Remove an event from each element.

```
core.removeEvent(nodes, events, callback);
core.removeEvent(nodes, events, delegate, callback);
```

Trigger an event on each element.

```
core.triggerEvent(nodes, events, data);
```

Clone all events from each element to other elements.

```
core.cloneEvents(nodes, others);
```

Trigger a blur event on the first element.

```
core.blur(nodes);
```

Trigger a click event on the first element.

```
core.click(nodes);
```

Trigger a focus event on the first element.

```
core.focus(nodes);
```


#### Manipulation

```
core.after(nodes, others);
```

```
core.before(nodes, others);
```

```
core.insertAfter(nodes, others);
```

```
core.insertBefore(nodes, others);
```

```
core.append(nodes, others);
```

```
core.appendTo(nodes, others);
```

```
core.prepend(nodes, others);
```

```
core.prependTo(nodes, others);
```

```
core.detach(nodes);
```

```
core.empty(nodes);
```

```
core.remove(nodes, deep = true);
```

```
core.create(tagName);
```

```
core.clone(nodes, deep = true, eventsData = false);
```

```
core.replaceAll(nodes, others);
```

```
core.replaceWith(nodes, others);
```

```
core.unwrap(nodes, filter);
```

```
core.wrap(nodes, others);
```

```
core.wrapAll(nodes, others);
```

```
core.wrapInner(nodes, others);
```


#### Traversal

##### Filter

```
core.filter(nodes, filter);
```

```
core.filterOne(nodes, filter);
```

```
core.not(nodes, filter);
```

```
core.has(nodes, filter);
```

```
core.hidden(nodes);
```

```
core.visible(nodes);
```

##### Find

```
core.find(nodes, selectors);
```

```
core.findOne(nodes, selectors);
```

```
core.findByClass(nodes, className);
```

```
core.findOneByClass(nodes, className);
```

```
core.findById(nodes, id);
```

```
core.findOneById(nodes, id);
```

```
core.findByTag(nodes, tagName);
```

```
core.findOneByTag(nodes, tagName);
```

##### Traversal

```
core.child(nodes, filter);
```

```
core.children(nodes, filter, first = false, elementsOnly = true);
```

```
core.contents(nodes);
```

```
core.closest(nodes, filter, until);
```

```
core.parent(nodes, filter);
```

```
core.parents(nodes, filter, until, closest = false);
```

```
core.offsetParent(nodes);
```

```
core.next(nodes, filter);
```

```
core.nextAll(nodes, filter, until = false, first = false);
```

```
core.prev(nodes, filter);
```

```
core.prevAll(nodes, filter, until = false, first = false);
```

```
core.siblings(nodes, filter, elementsOnly = true);
```


#### Utility

##### Tests

```
core.hasAttribute(nodes, attribute);
```

```
core.hasClass(nodes, ...classes);
```

```
core.hasData(nodes, key);
```

```
core.hasProperty(nodes, prop);
```

```
core.contains(nodes, filter);
```

```
core.is(filter);
```

```
core.isFixed(nodes);
```

```
core.isHidden(nodes);
```

```
core.isVisible(nodes);
```


#### Utility

```
core.forceShow(nodes, callback);
```

```
core.index(nodes, filter);
```

```
core.indexOf(nodes);
```

```
core.select(nodes);
```

```
core.selectAll(nodes);
```

```
core.serialize(nodes);
```

```
core.serializeArray(nodes);
```

```
core.serializeObject(nodes);
```


### AJAX

```
core.ajax(url, data = null, method = 'GET');
```

```
core.upload(url, data, method = 'POST');
```

```
core.loadScript(script);
```

```
core.loadScripts(scripts);
```

```
core.loadStyle(stylesheet);
```

```
core.loadStyles(stylesheets);
```


### Cookie

```
core.getCookie(name, json = false);
```

```
core.setCookie(name, value, options, json = false);
```

```
core.removeCookie(name, options);
```


### Event Factory

```
core.animationEventFactory(callback);
```

```
core.mouseDragFactory(down, move, up, animated = true);
```


### Parsers

```
core.parseHTML(string);
```

```
core.parseXML(string);
```


## Frost

### Array

```
Frost.flattenArray(array);
```

```
Frost.uniqueArray(array);
```


### Math

```
Frost.clamp(val, min = 0, max = 1);
```

```
Frost.clampPercent(val);
```

```
Frost.dist(x1, y1, x2, y2);
```

```
Frost.len(x, y);
```

```
Frost.lerp(a, b, amount);
```

```
Frost.map(value, fromMin, fromMax, toMin, toMax);
```

```
Frost.toStep(value, step);
```

```
Frost.linearPercent(a, b, value);
```

```
Frost.linearValue(a, b, percent);
```

```
Frost.logPercent(a, b, value);
```

```
Frost.logValue(a, b, percent);
```


### String

```
Frost.camelCase(string);
```

```
Frost.snakeCase(string);
```


### Tests

```
Frost.isArray(value);
```

```
Frost.isBoolean(value);
```

```
Frost.isFunction(value);
```

```
Frost.isNumeric(value);
```

```
Frost.isObject(value);
```

```
Frost.isString(value);
```

```
Frost.isWindow(value);
```


## Query Set

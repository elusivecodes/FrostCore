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
- [Static](#static)
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

Insert each other node after the first node.

```
core.after(nodes, others);
```

Insert each other node before the first node.

```
core.before(nodes, others);
```

Insert each node after the first other node.

```
core.insertAfter(nodes, others);
```

Insert each node before the first other node.

```
core.insertBefore(nodes, others);
```

Append each other node to the first node.

```
core.append(nodes, others);
```

Append each node to the first other node.

```
core.appendTo(nodes, others);
```

Prepend each other node to the first node.

```
core.prepend(nodes, others);
```

Prepend each node to the first other node.

```
core.prependTo(nodes, others);
```

Detach an element from the DOM.

```
core.detach(nodes);
```

Remove all children of each node from the DOM.

```
core.empty(nodes);
```

Remove each node from the DOM.

```
core.remove(nodes, deep = true);
```

Create a new DOM element.

```
const element = core.create(tagName);
```

Clone each node (optionally deep, and with events and data).

```
const clones = core.clone(nodes, deep = true, eventsData = false);
```

Replace each other node with nodes.

```
core.replaceAll(nodes, others);
```

Replace each node with other nodes.

```
core.replaceWith(nodes, others);
```

Unwrap each node (optionally matching a filter).

```
core.unwrap(nodes, filter);
```

Wrap each nodes with other nodes.

```
core.wrap(nodes, others);
```

Wrap all nodes with other nodes.

```
core.wrapAll(nodes, others);
```

Wrap the contents of each node with other nodes.

```
core.wrapInner(nodes, others);
```


#### Traversal

##### Filter

Return all elements matching a filter.

```
const filtered = core.filter(nodes, filter);
```

Return the first element matching a filter.

```
const filtered = core.filterOne(nodes, filter);
```

Return all elements not matching a filter.

```
const filtered = core.not(nodes, filter);
```

Return all elements with a descendent matching a filter.

```
const filtered = core.has(nodes, filter);
```

Return all hidden elements.

```
const filtered = core.hidden(nodes);
```

Return all visible elements.

```
const filtered = core.visible(nodes);
```


##### Find

Find all elements matching a selector.

```
const elements = core.find(selectors);
const descendents = core.find(nodes, selectors);
```

Find a single element matching a selector.

```
const element = core.findOne(selectors);
const descendent = core.findOne(nodes, selectors);
```

Find all elements with a specific class.

```
const elements = core.findByClass(nodes, className);
```

Find the first element with a specific class.

```
const element = core.findOneByClass(nodes, className);
```

Find all elements with a specific ID.

```
const elements = core.findById(nodes, id);
```

Find the first element with a specific ID.

```
const element = core.findOneById(nodes, id);
```

Find all elements with a specific tag.

```
const elements = core.findByTag(nodes, tagName);
```

Find the first element with a specific tag.

```
const element = core.findOneByTag(nodes, tagName);
```


##### Traversal

Find the first child of each element matching a filter.

```
core.child(nodes, filter);
```

Find all children of each element, and optionally matching a filter.

```
core.children(nodes, filter, first = false, elementsOnly = true);
```

Find all child nodes for each element, (including text and comment nodes).

```
core.contents(nodes);
```

Find the closest ancestor to each element matching a filter, and optionally before hitting a limit.

```
core.closest(nodes, filter, until);
```

Find the parent of each element matching a filter.

```
core.parent(nodes, filter);
```

Find all parents of each element matching a filter, and optionally before hitting a limit.

```
core.parents(nodes, filter, until, closest = false);
```

Find the offset parent (relatively positioned) of the first element.

```
core.offsetParent(nodes);
```

Find the next sibling for each element matching a filter.

```
core.next(nodes, filter);
```

Find all next siblings for each element matching a filter, and optionally before hitting a limit.

```
core.nextAll(nodes, filter, until = false, first = false);
```

Find the previous sibling for each element matching a filter, and optionally before hitting a limit.

```
core.prev(nodes, filter);
```

Find all previous siblings for each element matching a filter, and optionally before hitting a limit.

```
core.prevAll(nodes, filter, until = false, first = false);
```

Find all siblings for each element matching a filter.

```
core.siblings(nodes, filter, elementsOnly = true);
```


#### Utility

##### Tests

Returns true if any of the elements has a specified attribute.

```
core.hasAttribute(nodes, attribute);
```

Returns true if any of the elements has any of the specified classes.

```
core.hasClass(nodes, ...classes);
```

Returns true if any of the nodes has custom data.

```
core.hasData(nodes);
core.hasData(nodes, key);
```

Returns true if any of the elements has a specified property.

```
core.hasProperty(nodes, prop);
```

Returns true if any of the elements contains a descendent matching a filter.

```
core.contains(nodes, filter);
```

Returns true if any of the elements matches a filter.

```
core.is(filter);
```

Returns true if any of the elements or a parent of any of the elements is "fixed".

```
core.isFixed(nodes);
```

Returns true if any of the elements is hidden.

```
core.isHidden(nodes);
```

Returns true if any of the elements is visible.

```
core.isVisible(nodes);
```


#### Utility

Force an element to be shown, and then execute a callback.

```
core.forceShow(nodes, callback);
```

Get the index of the first element matching a filter.

```
core.index(nodes, filter);
```

Get the index of the first element relative to it's parent element.

```
core.indexOf(nodes);
```

Create a selection on the first node.

```
core.select(nodes);
```

Create a selection on all nodes.

```
core.selectAll(nodes);
```

Returns a serialized string containing names and values of all form elements.

```
core.serialize(nodes);
```

Returns a serialized array containing names and values of all form elements.

```
core.serializeArray(nodes);
```

Returns an object containing keys and values of all form elements.

```
core.serializeObject(nodes);
```


### AJAX

Perform an XHR request.

```
core.ajax(url, data = null, method = 'GET');
```

Perform an XHR request for a file upload.

```
core.upload(url, data, method = 'POST');
```

Load and executes a JavaScript file.

```
core.loadScript(script);
```

Load and execute multiple JavaScript files (in order).

```
core.loadScripts(scripts);
```

Import A CSS Stylesheet file.

```
core.loadStyle(stylesheet);
```

Import multiple CSS Stylesheet files.

```
core.loadStyles(stylesheets);
```


### Cookie

Get a cookie value (optionally json encoded).

```
const value = core.getCookie(name, json = false);
```

Set a cookie (optionally json encoded).

```
core.setCookie(name, value, options, json = false);
```

Remove a cookie.

```
core.removeCookie(name, options);
```


### Event Factory

Create a self regenerating event that will execute once per animation frame.

```
core.animationEventFactory(callback);
```

Create a mouse drag event (optionally limited by animation frame).

```
core.mouseDragFactory(down, move, up, animated = true);
```


### Parsers

Returns an array containing nodes parsed from a HTML string.

```
const nodes = core.parseHTML(string);
```

Returns a DOM object from an XML string.

```
const xml = core.parseXML(string);
```


## Static

### Array

Create a single-dimensional Array from a multiple-dimensional Array.

```
Core.flattenArray(array);
```

Remove duplicate elements in an array.

```
Core.uniqueArray(array);
```


### Math

Clamp a value between a min and max.

```
Core.clamp(val, min = 0, max = 1);
```

Clamp a value between 0 and 100.

```
Core.clampPercent(val);
```

Get the distance between two vectors.

```
Core.dist(x1, y1, x2, y2);
```

Get the length of an X,Y vector.

```
Core.len(x, y);
```

Linear interpolation from one value to another.

```
Core.lerp(a, b, amount);
```

Map a value from one range to another.

```
Core.map(value, fromMin, fromMax, toMin, toMax);
```

Round a number to a specified precision.

```
Core.toStep(value, step);
```

Get the linear percent of a value in a specified range.

```
Core.linearPercent(a, b, value);
```

Get the linear value of a percent in a specified range.

```
Core.linearValue(a, b, percent);
```

Get the logarithmic percent of a value in a specified range.

```
Core.logPercent(a, b, value);
```

Get the logarithmic value of a percent in a specified range.

```
Core.logValue(a, b, percent);
```


### String

Convert a string to Camel Case.

```
Core.camelCase(string);
```

Convert a string to Snake Case.

```
Core.snakeCase(string);
```


### Tests

Returns true if the value is an Array.

```
Core.isArray(value);
```

Returns true if the value is a Boolean.

```
Core.isBoolean(value);
```

Returns true if the value is a Function.

```
Core.isFunction(value);
```

Returns true if the value is numeric.

```
Core.isNumeric(value);
```

Returns true if the value is an Object.

```
Core.isObject(value);
```

Returns true if the value is a String.

```
Core.isString(value);
```

Returns true if the value is a Window.

```
Core.isWindow(value);
```


## Query Set

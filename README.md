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

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `callback` is a function that accepts `node` and `progress` as arguments, where progress is a value between *0* and *1*.
- `duration` is the number of milliseconds that the animation should last, and will default to *1000*.

This function returns a Promise, that will resolve after the animation has completed.

```
core.animate(nodes, callback, duration);
```

Stop all animations for each element.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `finish` is a boolean indicating whether to immediately finish the animation, and will default to *true*.

```
core.stop(nodes, finish);
```

---

##### Animations

Slide each element in or out from the top over a duration.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `duration` is the number of milliseconds that the animation should last, and will default to *1000*.

This function returns a Promise, that will resolve after the animation has completed.

```
core.dropIn(nodes, duration);
core.dropOut(nodes, duration);
```

Fade the opacity of each element in or out over a duration.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `duration` is the number of milliseconds that the animation should last, and will default to *1000*.

This function returns a Promise, that will resolve after the animation has completed.

```
core.fadeIn(nodes, duration);
core.fadeOut(nodes, duration);
```

Rotate each element in or out on an x y over a duration.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `x` is the amount of rotation to apply to the X axis, and will default to *0*.
- `y` is the amount of rotation to apply to the Y axis, and will default to *1*.
- `inverse` is a boolean indicating whether to rotate in the opposite direction, and will default to *false*.
- `duration` is the number of milliseconds that the animation should last, and will default to *1000*.

This function returns a Promise, that will resolve after the animation has completed.

```
core.rotateIn(nodes, x, y, inverse, duration);
core.rotateOut(nodes, x, y, inverse, duration);
```

Slide each element into or out of place to a direction over a duration.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `direction` is one of: 'top', 'right', 'bottom' or 'left' indicating the direction to slide to, and will default to *bottom*.
- `duration` is the number of milliseconds that the animation should last, and will default to *1000*.

This function returns a Promise, that will resolve after the animation has completed.

```
core.slideIn(nodes, direction, duration);
core.slideOut(nodes, direction, duration);
```

Squeeze each element into or out of place to a direction over a duration.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `direction` is one of: 'top', 'right', 'bottom' or 'left' indicating the direction to squeeze to, and will default to *bottom*.
- `duration` is the number of milliseconds that the animation should last, and will default to *1000*.

This function returns a Promise, that will resolve after the animation has completed.

```
core.squeezeIn(nodes, direction, duration);
core.squeezeOut(nodes, direction, duration);
```

---

##### Queue

Queue a callback on each element.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `callback` is a function that accepts `node` as an argument.

```
core.queue(nodes, callback);
```

Clear the queue for each element.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```
core.clearQueue(nodes);
```

---

#### Attributes

##### Attributes

###### Attributes

Get an attribute value for the first element.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `attribute` is a string indicating the attribute value to return.

```
const attr = core.getAttribute(nodes, attribute);
```

Set attributes for each element.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `attribute` is a string indicating the attribute value to set.
- `value` is the value you want to set the attribute to.

Alternatively, you can set multiple attributes by passing a single `attributes` argument with Key/Value pairs of the attributes to set.

```
core.setAttribute(nodes, attributes);
core.setAttribute(nodes, attribute, value);
```

Remove an attribute from each element.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `attribute` is a string indicating the attribute value to remove.

```
core.removeAttribute(nodes, attribute);
```

###### DataSet

Get a dataset value for the first element.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `key` is a string indicating the dataset value to return.

If the `key` argument is omitted, an object containing all dataset values will be returned instead.

```
const dataset = core.getDataset(nodes);
const keyDataset = core.getDataset(nodes, key);
```

Set dataset values for each element.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `key` is a string indicating the dataset value to set.
- `value` is the value you want to set the dataset to.

```
core.setDataset(nodes, key, value);
```

###### HTML

Get the HTML contents of the first element.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```
const html = core.getHTML(nodes);
```

Set the HTML contents for each element.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `html` is a string that will become the HTML contents of the element.

```
core.setHTML(nodes, html);
```

###### Properties

Get a property value for the first element.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `property` is a string indicating the property value to return.

```
const prop = core.getProperty(nodes, property);
```

Set property values for each element.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `property` is a string indicating the property value to set.
- `value` is the value you want to set the property to.

Alternatively, you can set multiple properties by passing a single `properties` argument with Key/Value pairs of the properties to set.

```
core.setProperty(nodes, properties);
core.setProperty(nodes, property, value);
```

Remove a property from each element.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `property` is a string indicating the property value to remove.

```
core.removeProperty(nodes, property);
```

###### Text

Get the text contents of the first element.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```
const text = core.getText(nodes);
```

Set the text contents for each element.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `text` is a string that will become the text contents of the element.

```
core.setText(nodes, text);
```

###### Value

Get the value property of the first element.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```
const val = core.getValue(nodes);
```

Set the value property for each element.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `value` is a string that will become the value of the element.

```
core.setValue(nodes, value);
```

---

##### Data

Get custom data for the first node.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `key` is a string indicating the custom data value to return.

If the `key` argument is omitted, an object containing all custom data values will be returned instead.

```
const data = core.getData(nodes);
const keyData = core.getData(nodes, key);
```

Set custom data for each node.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `key` is a string indicating the custom data value to set.
- `value` is the value you want to set the attribute to.

```
core.setData(nodes, key, value);
```

Remove custom data for each node.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `key` is a string indicating the custom data value to remove.

```
core.removeData(nodes, key);
```

---

##### Position

Get the X,Y co-ordinates for the center of the first element.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `offset` is a boolean indicating whether the co-ordinates should be offset from the top left of the document, and will default to *false*.

```
const center = core.center(nodes, offset);
```

Get the X,Y position of the first element.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `offset` is a boolean indicating whether the co-ordinates should be offset from the top left of the document, and will default to *false*.

```
const pos = core.position(nodes, offset);
```

Get the computed bounding rectangle of the first element.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `offset` is a boolean indicating whether the rectangle should be offset from the top left of the document, and will default to *false*.

```
const rect = core.rect(nodes, offset);
```

Constrain each element to a container element.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `container` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```
core.constrain(nodes, container);
```

Get the distance of the first element to an X,Y position.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `x` is a distance (in pixels) along the X axis.
- `y` is a distance (in pixels) along the Y axis.
- `offset` is a boolean indicating whether the co-ordinates should be offset from the top left of the document, and will default to *false*.

```
const dist = core.distTo(nodes, x, y, offset);
```

Get the distance between two elements.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `others` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```
const dist = core.distToNode(nodes, others);
```

Get the nearest element to an X,Y position.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `x` is a distance (in pixels) along the X axis.
- `y` is a distance (in pixels) along the Y axis.
- `offset` is a boolean indicating whether the co-ordinates should be offset from the top left of the document, and will default to *false*.

```
const nearest = core.nearestTo(nodes, x, y, offset);
```

Get the nearest element to another element.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `others` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```
const nearest = core.nearestToNode(nodes, others);
```

Get the percentage of an X co-ordinate relative to the first element.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `x` is a distance (in pixels) along the X axis.
- `offset` is a boolean indicating whether the co-ordinates should be offset from the top left of the document, and will default to *false*.

```
const pX = core.percentX(nodes, x, offset);
```

Get the percentage of a Y co-ordinate relative to the first element.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `y` is a distance (in pixels) along the Y axis.
- `offset` is a boolean indicating whether the co-ordinates should be offset from the top left of the document, and will default to *false*.

```
const pY = core.percentY(nodes, y, offset);
```

---

##### Scroll

Scroll each element to an X,Y position.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `x` is a distance (in pixels) along the X axis to scroll to.
- `y` is a distance (in pixels) along the Y axis to scroll to.

```
core.setScroll(nodes, x, y);
```

Scroll each element to an X position.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `x` is a distance (in pixels) along the X axis to scroll to.

```
core.setScrollX(nodes, x);
```

Scroll each element to a Y position.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `y` is a distance (in pixels) along the Y axis to scroll to.

```
core.setScrollY(nodes, y);
```

Get the scroll X position of the first element.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```
const scrollX = core.getScrollX(nodes);
```

Get the scroll Y position of the first element.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```
const scrollY = core.getScrollY(nodes);
```

---

##### Size

Get the computed height of the first element (and optionally padding, border or margin).

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `padding` is a boolean indicating whether to include padding in the calculation, and the default is *false*.
- `border` is a boolean indicating whether to include border width in the calculation, and the default is *false*.
- `margin` is a boolean indicating whether to include the margin in the calculation, and the default is *false*.

```
const height = core.height(nodes, padding, border, margin);
```

Get the computed width of the first element (and optionally padding, border or margin).

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `padding` is a boolean indicating whether to include padding in the calculation, and the default is *false*.
- `border` is a boolean indicating whether to include border width in the calculation, and the default is *false*.
- `margin` is a boolean indicating whether to include the margin in the calculation, and the default is *false*.

```
const width = core.width(nodes, padding, border, margin);
```

##### Styles

###### Classes

Add a class or classes to each element.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `classes` is an Array of classes, or a space seperated string of class names.

```
core.addClass(nodes, ...classes);
```

Remove a class or classes from each element.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `classes` is an Array of classes, or a space seperated string of class names.

```
core.removeClass(nodes, ...classes);
```

Toggle a class or classes for each element.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `classes` is an Array of classes, or a space seperated string of class names.

```
core.toggleClass(nodes, ...classes);
```

###### Styles

Get a style property for the first element.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `style` is a string indicating the style property value to return.

```
const style = core.getStyle(nodes, style);
```

Set style properties for each element.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `style` is a string indicating the style property value to set.
- `value` is the value you wish to set the style property to.
- `important` is a boolean indicating the style should be set as important, and will default to *false*.

```
core.setStyle(nodes, styles);
core.setStyle(nodes, style, value, important);
```

###### CSS

Get the computed style for the first element.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `style` is a string indicating the computed style property value to return.

```
const css = core.css(nodes, style);
```

###### Visibility

Hide each element from display.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```
core.hide(nodes);
```

Display each hidden element.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```
core.show(nodes);
```

Toggle the visibility of each element.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```
core.toggle(nodes);
```

---

#### Events

Add an event to each element.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `events` is a space-separated string of events to attach to the elements.
- `callback` is a function that accepts an event argument, which will be called when the event is triggered.

Additionally, you can also specify a `delegate` argument which will only trigger the event if it is propagated by an element matching the selector.

```
core.addEvent(nodes, events, callback);
core.addEvent(nodes, events, delegate, callback);
```

Add a self-destructing event to each element.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `events` is a space-separated string of events to attach to the elements.
- `callback` is a function that accepts an event argument, which will be called when the event is triggered.

Additionally, you can also specify a `delegate` argument which will only trigger the event if it is propagated by an element matching the selector.

```
core.addEventOnce(nodes, events, callback);
core.addEventOnce(nodes, events, delegate, callback);
```

Remove an event from each element.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `events` is a space-separated string of events to remove from the elements.
- `callback` is a function that accepts an event argument, which will be called when the event is triggered.

Additionally, you can also specify a `delegate` argument which will only trigger the event if it is propagated by an element matching the selector.

```
core.removeEvent(nodes);
core.removeEvent(nodes, events);
core.removeEvent(nodes, events, callback);
core.removeEvent(nodes, events, delegate, callback);
```

Trigger an event on each element.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `events` is a space-separated string of events to trigger on the elements.

```
core.triggerEvent(nodes, events, data);
```

Clone all events from each element to other elements.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `others` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```
core.cloneEvents(nodes, others);
```

Trigger a blur event on the first element.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```
core.blur(nodes);
```

Trigger a click event on the first element.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```
core.click(nodes);
```

Trigger a focus event on the first element.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```
core.focus(nodes);
```

---

#### Manipulation

##### Manipulation

Create a new DOM element.

- `tagName` is a string indicating the type of element you wish to create.

```
const element = core.create(tagName);
```

Clone each node (optionally deep, and with events and data).

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `deep` is a boolean indicating whether you wish to clone all descendent elements, and will default to *true*.
- `eventsDate` is a boolean indicating whether you wish to clone all events and data to the new nodes, and will default to *false*.

```
const clones = core.clone(nodes, deep = true, eventsData = false);
```

Detach an element from the DOM.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```
core.detach(nodes);
```

Remove all children of each node from the DOM.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```
core.empty(nodes);
```

Remove each node from the DOM.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `deep` is a boolean indicating whether to also remove all descendent elements, and will default to *true*.

```
core.remove(nodes, deep = true);
```

Replace each other node with nodes.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `others` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```
core.replaceAll(nodes, others);
```

Replace each node with other nodes.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `others` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```
core.replaceWith(nodes, others);
```

---

##### Move

Insert each other node after the first node.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `others` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```
core.after(nodes, others);
```

Insert each node after the first other node.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `others` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```
core.insertAfter(nodes, others);
```

Insert each other node before the first node.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `others` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```
core.before(nodes, others);
```

Insert each node before the first other node.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `others` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```
core.insertBefore(nodes, others);
```

Append each other node to the first node.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `others` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```
core.append(nodes, others);
```

Append each node to the first other node.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `others` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```
core.appendTo(nodes, others);
```

Prepend each other node to the first node.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `others` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```
core.prepend(nodes, others);
```

Prepend each node to the first other node.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `others` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```
core.prependTo(nodes, others);
```

---

##### Wrap

Unwrap each node.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `filter` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that must match the parent of each node for it to be unwrapped.

```
core.unwrap(nodes, filter);
```

Wrap each nodes with other nodes.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `others` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```
core.wrap(nodes, others);
```

Wrap all nodes with other nodes.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `others` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```
core.wrapAll(nodes, others);
```

Wrap the contents of each node with other nodes.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `others` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```
core.wrapInner(nodes, others);
```

---

#### Traversal

##### Filter

Return all elements matching a filter.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `filter` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that the nodes will be filtered by.

```
const filtered = core.filter(nodes, filter);
```

Return the first element matching a filter.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `filter` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that the nodes will be filtered by.

```
const filtered = core.filterOne(nodes, filter);
```

Return all elements not matching a filter.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `filter` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that the nodes will be filtered by.

```
const filtered = core.not(nodes, filter);
```

Return all elements with a descendent matching a filter.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `filter` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that the nodes will be filtered by.

```
const filtered = core.has(nodes, filter);
```

Return all hidden elements.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```
const filtered = core.hidden(nodes);
```

Return all visible elements.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```
const filtered = core.visible(nodes);
```

---

##### Find

Find all elements matching a selector.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object, and will default to the current context (document).
- `selectors` is an Array or comma-seperated list of standard CSS selectors to search for.

```
const elements = core.find(selectors);
const descendents = core.find(nodes, selectors);
```

Find a single element matching a selector.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object, and will default to the current context (document).
- `selectors` is an Array or comma-seperated list of standard CSS selectors to search for.

```
const element = core.findOne(selectors);
const descendent = core.findOne(nodes, selectors);
```

Find all elements with a specific class.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object, and will default to the current context (document).
- `className` is a string indicating the class name to search for.

```
const elements = core.findByClass(className);
const descendents = core.findByClass(nodes, className);
```

Find the first element with a specific class.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object, and will default to the current context (document).
- `className` is a string indicating the class name to search for.

```
const element = core.findOneByClass(className);
const descendent = core.findOneByClass(nodes, className);
```

Find all elements with a specific ID.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object, and will default to the current context (document).
- `id` is a string indicating the id to search for.

```
const elements = core.findById(id);
const descendents = core.findById(nodes, id);
```

Find the first element with a specific ID.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object, and will default to the current context (document).
- `id` is a string indicating the id to search for.

```
const element = core.findOneById(id);
const descendent = core.findOneById(nodes, id);
```

Find all elements with a specific tag.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object, and will default to the current context (document).
- `tagName` is a string indicating the tag name to search for.

```
const elements = core.findByTag(tagName);
const descendents = core.findByTag(nodes, tagName);
```

Find the first element with a specific tag.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object, and will default to the current context (document).
- `tagName` is a string indicating the tag name to search for.

```
const element = core.findOneByTag(tagName);
const descendent = core.findOneByTag(nodes, tagName);
```


##### Traversal

Find the first child of each element matching a filter.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `filter` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that the nodes will be filtered by.

```
const child = core.child(nodes, filter);
```

Find all children of each element, and optionally matching a filter.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `filter` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that the nodes will be filtered by.
- `first` is a boolean indicating whether to only return the first child matching a filter, and will default to *false*.
- `elementsOnly` is a boolean indicating whether to ignore text and comment nodes, and will default to *true*.

```
const children = core.children(nodes, filter, first = false, elementsOnly = true);
```

Find all child nodes for each element, (including text and comment nodes).

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```
const contents = core.contents(nodes);
```

Find the closest ancestor to each element matching a filter, and optionally before hitting a limit.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `filter` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that the nodes will be filtered by.
- `until` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that when matched will stop the search.

```
const closest = core.closest(nodes, filter, until);
```

Find the parent of each element matching a filter.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `filter` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that the nodes will be filtered by.

```
const parent = core.parent(nodes, filter);
```

Find all parents of each element matching a filter, and optionally before hitting a limit.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `filter` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that the nodes will be filtered by.
- `until` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that when matched will stop the search.
- `closest` is a boolean indicating whether to only return the closest parent matching a filter, and will default to *false*.

```
const parents = core.parents(nodes, filter, until, closest = false);
```

Find the offset parent (relatively positioned) of the first element.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```
const offsetParent = core.offsetParent(nodes);
```

Find the next sibling for each element matching a filter.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `filter` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that the nodes will be filtered by.

```
const next = core.next(nodes, filter);
```

Find all next siblings for each element matching a filter, and optionally before hitting a limit.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `filter` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that the nodes will be filtered by.
- `until` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that when matched will stop the search.
- `first` is a boolean indicating whether to only return the first node matching a filter, and will default to *false*.

```
const nextAll = core.nextAll(nodes, filter, until = false, first = false);
```

Find the previous sibling for each element matching a filter, and optionally before hitting a limit.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `filter` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that the nodes will be filtered by.

```
const prev = core.prev(nodes, filter);
```

Find all previous siblings for each element matching a filter, and optionally before hitting a limit.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `filter` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that the nodes will be filtered by.
- `until` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that when matched will stop the search.
- `first` is a boolean indicating whether to only return the first node matching a filter, and will default to *false*.

```
const prevAll = core.prevAll(nodes, filter, until = false, first = false);
```

Find all siblings for each element matching a filter.

- `nodes` is a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `filter` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that the nodes will be filtered by.
- `elementsOnly` is a boolean indicating whether to ignore text and comment nodes, and will default to *true*.

```
const siblings = core.siblings(nodes, filter, elementsOnly = true);
```

---

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
const index = core.index(nodes, filter);
```

Get the index of the first element relative to it's parent element.

```
const indexOf = core.indexOf(nodes);
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
const serialize = core.serialize(nodes);
```

Returns a serialized array containing names and values of all form elements.

```
const serialArray = core.serializeArray(nodes);
```

Returns an object containing keys and values of all form elements.

```
const serialObject = core.serializeObject(nodes);
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
const flatArray = Core.flattenArray(array);
```

Remove duplicate elements in an array.

```
const uniqueArray = Core.uniqueArray(array);
```


### Math

Clamp a value between a min and max.

```
const clamp = Core.clamp(val, min = 0, max = 1);
```

Clamp a value between 0 and 100.

```
const clampPercent = Core.clampPercent(val);
```

Get the distance between two vectors.

```
const dist = Core.dist(x1, y1, x2, y2);
```

Get the length of an X,Y vector.

```
const len = Core.len(x, y);
```

Linear interpolation from one value to another.

```
const lerp = Core.lerp(a, b, amount);
```

Map a value from one range to another.

```
const map = Core.map(value, fromMin, fromMax, toMin, toMax);
```

Round a number to a specified precision.

```
const toStep = Core.toStep(value, step);
```

Get the linear percent of a value in a specified range.

```
const linearPercent = Core.linearPercent(a, b, value);
```

Get the linear value of a percent in a specified range.

```
const linearValue = Core.linearValue(a, b, percent);
```

Get the logarithmic percent of a value in a specified range.

```
const logPrecent = Core.logPercent(a, b, value);
```

Get the logarithmic value of a percent in a specified range.

```
const logValue = Core.logValue(a, b, percent);
```


### String

Convert a string to Camel Case.

```
const camelCase = Core.camelCase(string);
```

Convert a string to Snake Case.

```
const snakeCase = Core.snakeCase(string);
```


### Tests

Returns true if the value is an Array.

```
const isArray = Core.isArray(value);
```

Returns true if the value is a Boolean.

```
const isBoolean = Core.isBoolean(value);
```

Returns true if the value if a Document.

```
const isDocument = Core.isDocument(value);
```

Returns true if the value is a HTML Element.

```
const isElement = Core.isElement(value);
```

Returns true if the value is a HTML Collection.

```
const isElementList = Core.isElementList(value);
```

Returns true if the value is a Function.

```
const isFunction = Core.isFunction(value);
```

Returns true if the value is a Node.

```
const isNode = Core.isNode(value);
```

Returns true if the value is a Node List.

```
const isNodeList = Core.isNodeList(value);
```

Returns true if the value is numeric.

```
const isNumeric = Core.isNumeric(value);
```

Returns true if the value is an Object.

```
const isObject = Core.isObject(value);
```

Returns true if the value is a Query Set.

```
const isQuerySet = Core.isQuerySet(value);
```

Returns true if the value is a String.

```
const isString = Core.isString(value);
```

Returns true if the value is a Window.

```
const isWindow = Core.isWindow(value);
```


## Query Set

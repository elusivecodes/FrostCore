# FrostCore

**FrostCore** is a free, open-source DOM manipulation library for *JavaScript*.

It is heavily inspired by jQuery, but utilizes ES6 syntax and features including Promises, and supports both functional and OOP style programming, with mutable and immutable Query Sets.


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
- [Static Methods](#static)
    - [Array](#array)
    - [Math](#math)
    - [String](#string)
    - [Tests](#tests)
- [Query Set](#query-set)



## Core

The `Core` class provides all the "core" methods for manipulating the DOM, performing AJAX requests, handling Cookies and more.

By default, a `Core` class is created on the document context, and is assigned to the lowercase `core` variable in the global scope.

However, it is possible to create additional instances of the class on any context.

```javascript
const myCore = new Core(context);
```

### DOM

The DOM methods listed below provide functionality for manipulating the DOM, and typically accept a `nodes` argument as the first parameter.

The `nodes` argument can be one of the following: a Query Selector string, a Window, Document, Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes (such as returned by the `find` method) or a QuerySet object.

The exact type of nodes accepted by each method is listed below.

#### Animation

**Animate**

Add an animation to each element.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `callback` is a function that accepts `node` and `progress` as arguments, where progress is a value between *0* and *1*.
- `duration` is the number of milliseconds that the animation should last, and will default to *1000*.

This function returns a Promise, that will resolve after the animation has completed.

```javascript
core.animate(nodes, callback, duration);
```

**Stop Animations**

Stop all animations for each element.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `finish` is a boolean indicating whether to immediately finish the animation, and will default to *true*.

```javascript
core.stop(nodes, finish);
```

##### Animations

**Drop In/Out**

Slide each element in or out from the top over a duration.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `duration` is the number of milliseconds that the animation should last, and will default to *1000*.

This function returns a Promise, that will resolve after the animation has completed.

```javascript
core.dropIn(nodes, duration);
core.dropOut(nodes, duration);
```

**Fade In/Out**

Fade the opacity of each element in or out over a duration.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `duration` is the number of milliseconds that the animation should last, and will default to *1000*.

This function returns a Promise, that will resolve after the animation has completed.

```javascript
core.fadeIn(nodes, duration);
core.fadeOut(nodes, duration);
```

**Rotate In/Out**

Rotate each element in or out on an x y over a duration.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `x` is the amount of rotation to apply to the X axis, and will default to *0*.
- `y` is the amount of rotation to apply to the Y axis, and will default to *1*.
- `inverse` is a boolean indicating whether to rotate in the opposite direction, and will default to *false*.
- `duration` is the number of milliseconds that the animation should last, and will default to *1000*.

This function returns a Promise, that will resolve after the animation has completed.

```javascript
core.rotateIn(nodes, x, y, inverse, duration);
core.rotateOut(nodes, x, y, inverse, duration);
```

**Slide In/Out**

Slide each element into or out of place to a direction over a duration.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `direction` is one of: 'top', 'right', 'bottom' or 'left' indicating the direction to slide to, and will default to *bottom*.
- `duration` is the number of milliseconds that the animation should last, and will default to *1000*.

This function returns a Promise, that will resolve after the animation has completed.

```javascript
core.slideIn(nodes, direction, duration);
core.slideOut(nodes, direction, duration);
```

**Squeeze In/Out**

Squeeze each element into or out of place to a direction over a duration.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `direction` is one of: 'top', 'right', 'bottom' or 'left' indicating the direction to squeeze to, and will default to *bottom*.
- `duration` is the number of milliseconds that the animation should last, and will default to *1000*.

This function returns a Promise, that will resolve after the animation has completed.

```javascript
core.squeezeIn(nodes, direction, duration);
core.squeezeOut(nodes, direction, duration);
```

##### Queue

**Queue**

Queue a callback on each element.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `callback` is a function that accepts `node` as an argument.

```javascript
core.queue(nodes, callback);
```

**Clear Queue**

Clear the queue for each element.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.

```javascript
core.clearQueue(nodes);
```

#### Attributes

**Get Attribute**

Get an attribute value for the first element.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `attribute` is a string indicating the attribute value to return.

```javascript
const attr = core.getAttribute(nodes, attribute);
```

**Set Attribute**

Set attributes for each element.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `attribute` is a string indicating the attribute value to set.
- `value` is the value you want to set the attribute to.

Alternatively, you can set multiple attributes by passing a single `attributes` argument with Key/Value pairs of the attributes to set.

```javascript
core.setAttribute(nodes, attributes);
core.setAttribute(nodes, attribute, value);
```

**Remove Attribute**

Remove an attribute from each element.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `attribute` is a string indicating the attribute value to remove.

```javascript
core.removeAttribute(nodes, attribute);
```

**Get Dataset**

Get a dataset value for the first element.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `key` is a string indicating the dataset value to return.

If the `key` argument is omitted, an object containing all dataset values will be returned instead.

```javascript
const dataset = core.getDataset(nodes);
const value = core.getDataset(nodes, key);
```

**Set Dataset**

Set dataset values for each element.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `key` is a string indicating the dataset value to set.
- `value` is the value you want to set the dataset to.

```javascript
core.setDataset(nodes, key, value);
```

**Get HTML**

Get the HTML contents of the first element.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.

```javascript
const html = core.getHTML(nodes);
```

**Set HTML**

Set the HTML contents for each element.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `html` is a string that will become the HTML contents of the element.

```javascript
core.setHTML(nodes, html);
```

**Get Property**

Get a property value for the first element.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `property` is a string indicating the property value to return.

```javascript
const prop = core.getProperty(nodes, property);
```

**Set Property**

Set property values for each element.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `property` is a string indicating the property value to set.
- `value` is the value you want to set the property to.

Alternatively, you can set multiple properties by passing a single `properties` argument with Key/Value pairs of the properties to set.

```javascript
core.setProperty(nodes, properties);
core.setProperty(nodes, property, value);
```

**Remove Property**

Remove a property from each element.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `property` is a string indicating the property value to remove.

```javascript
core.removeProperty(nodes, property);
```

**Get Text**

Get the text contents of the first element.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.

```javascript
const text = core.getText(nodes);
```

**Set Text**

Set the text contents for each element.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `text` is a string that will become the text contents of the element.

```javascript
core.setText(nodes, text);
```

**Get Value**

Get the value property of the first element.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.

```javascript
const val = core.getValue(nodes);
```

**Set Value**

Set the value property for each element.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `value` is a string that will become the value of the element.

```javascript
core.setValue(nodes, value);
```

##### Custom Data

**Get Data**

Get custom data for the first node.

- `nodes` is a Query Selector string, a Window, Document, Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `key` is a string indicating the custom data value to return.

If the `key` argument is omitted, an object containing all custom data values will be returned instead.

```javascript
const data = core.getData(nodes);
const value = core.getData(nodes, key);
```

**Set Data**

Set custom data for each node.

- `nodes` is a Query Selector string, a Window, Document, Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `key` is a string indicating the custom data value to set.
- `value` is the value you want to set the attribute to.

```javascript
core.setData(nodes, key, value);
```

**Remove Data**

Remove custom data for each node.

- `nodes` is a Query Selector string, a Window, Document, Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `key` is a string indicating the custom data value to remove.

```javascript
core.removeData(nodes, key);
```

##### Position

**Center**

Get the X,Y co-ordinates for the center of the first element.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `offset` is a boolean indicating whether the co-ordinates should be offset from the top left of the document, and will default to *false*.

```javascript
const center = core.center(nodes, offset);
```

**Position**

Get the X,Y position for the top/left of the first element.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `offset` is a boolean indicating whether the co-ordinates should be offset from the top left of the document, and will default to *false*.

```javascript
const pos = core.position(nodes, offset);
```

**Rectangle**

Get the computed bounding rectangle of the first element.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `offset` is a boolean indicating whether the rectangle should be offset from the top left of the document, and will default to *false*.

```javascript
const rect = core.rect(nodes, offset);
```

**Constrain**

Constrain each element to a container element.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `container` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.

```javascript
core.constrain(nodes, container);
```

**Distance To**

Get the distance of the first element to an X,Y position.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `x` is a distance (in pixels) along the X axis.
- `y` is a distance (in pixels) along the Y axis.
- `offset` is a boolean indicating whether the co-ordinates should be offset from the top left of the document, and will default to *false*.

```javascript
const dist = core.distTo(nodes, x, y, offset);
```

**Distance To Node**

Get the distance between two elements.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `others` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.

```javascript
const dist = core.distToNode(nodes, others);
```

**Nearest To**

Get the nearest element to an X,Y position.

- `nodes` is a Query Selector string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `x` is a distance (in pixels) along the X axis.
- `y` is a distance (in pixels) along the Y axis.
- `offset` is a boolean indicating whether the co-ordinates should be offset from the top left of the document, and will default to *false*.

```javascript
const nearest = core.nearestTo(nodes, x, y, offset);
```

**Nearest To Node**

Get the nearest element to another element.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `others` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.

```javascript
const nearest = core.nearestToNode(nodes, others);
```

**Percent X**

Get the percentage of an X co-ordinate relative to the first element.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `x` is a distance (in pixels) along the X axis.
- `offset` is a boolean indicating whether the co-ordinates should be offset from the top left of the document, and will default to *false*.

```javascript
const pX = core.percentX(nodes, x, offset);
```

**Percent Y**

Get the percentage of a Y co-ordinate relative to the first element.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `y` is a distance (in pixels) along the Y axis.
- `offset` is a boolean indicating whether the co-ordinates should be offset from the top left of the document, and will default to *false*.

```javascript
const pY = core.percentY(nodes, y, offset);
```

##### Scroll

**Set Scroll**

Scroll each element to an X,Y position.

- `nodes` is a Query Selector string, a Window, Document, HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `x` is a distance (in pixels) along the X axis to scroll to.
- `y` is a distance (in pixels) along the Y axis to scroll to.

```javascript
core.setScroll(nodes, x, y);
```

**Set Scroll X**

Scroll each element to an X position.

- `nodes` is a Query Selector string, a Window, Document, HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `x` is a distance (in pixels) along the X axis to scroll to.

```javascript
core.setScrollX(nodes, x);
```

**Set Scroll Y**

Scroll each element to a Y position.

- `nodes` is a Query Selector string, a Window, Document, HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `y` is a distance (in pixels) along the Y axis to scroll to.

```javascript
core.setScrollY(nodes, y);
```

**Get Scroll X**

Get the scroll X position of the first element.

- `nodes` is a Query Selector string, a Window, Document, HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.

```javascript
const scrollX = core.getScrollX(nodes);
```

**Get Scroll Y**

Get the scroll Y position of the first element.

- `nodes` is a Query Selector string, a Window, Document, HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.

```javascript
const scrollY = core.getScrollY(nodes);
```

##### Size

**Height**

Get the computed height of the first element (and optionally padding, border or margin).

- `nodes` is a Query Selector string, a Window, Document, HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `padding` is a boolean indicating whether to include padding in the calculation, and the default is *false*.
- `border` is a boolean indicating whether to include border width in the calculation, and the default is *false*.
- `margin` is a boolean indicating whether to include the margin in the calculation, and the default is *false*.

```javascript
const height = core.height(nodes, padding, border, margin);
```

**Width**

Get the computed width of the first element (and optionally padding, border or margin).

- `nodes` is a Query Selector string, a Window, Document, HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `padding` is a boolean indicating whether to include padding in the calculation, and the default is *false*.
- `border` is a boolean indicating whether to include border width in the calculation, and the default is *false*.
- `margin` is a boolean indicating whether to include the margin in the calculation, and the default is *false*.

```javascript
const width = core.width(nodes, padding, border, margin);
```

##### Styles

**Add Class**

Add a class or classes to each element.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `classes` is an Array of classes, or a space seperated string of class names.

```javascript
core.addClass(nodes, ...classes);
```

**Remove Class**

Remove a class or classes from each element.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `classes` is an Array of classes, or a space seperated string of class names.

```javascript
core.removeClass(nodes, ...classes);
```

**Toggle Class**

Toggle a class or classes for each element.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `classes` is an Array of classes, or a space seperated string of class names.

```javascript
core.toggleClass(nodes, ...classes);
```

**Get Style**

Get a style property for the first element.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `style` is a string indicating the style property value to return.

```javascript
const style = core.getStyle(nodes, style);
```

**Set Style**

Set style properties for each element.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `style` is a string indicating the style property value to set.
- `value` is the value you wish to set the style property to.
- `important` is a boolean indicating the style should be set as important, and will default to *false*.

```javascript
core.setStyle(nodes, styles);
core.setStyle(nodes, style, value, important);
```

**Computed Style**

Get the computed style for the first element.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `style` is a string indicating the computed style property value to return.

```javascript
const css = core.css(nodes, style);
```

**Hide**

Hide each element from display.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.

```javascript
core.hide(nodes);
```

**Show**

Display each hidden element.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.

```javascript
core.show(nodes);
```

**Toggle**

Toggle the visibility of each element.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.

```javascript
core.toggle(nodes);
```

#### Events

**Add Event**

Add an event to each element.

- `nodes` is a Query Selector string, a Window, Document, HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `events` is a space-separated string of events to attach to the elements.
- `callback` is a function that accepts an event argument, which will be called when the event is triggered.

Additionally, you can also specify a `delegate` argument which will only trigger the event if it is propagated by an element matching the selector.

```javascript
core.addEvent(nodes, events, callback);
core.addEvent(nodes, events, delegate, callback);
```

**Add Event Once**

Add a self-destructing event to each element.

- `nodes` is a Query Selector string, a Window, Document, HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `events` is a space-separated string of events to attach to the elements.
- `callback` is a function that accepts an event argument, which will be called when the event is triggered.

Additionally, you can also specify a `delegate` argument which will only trigger the event if it is propagated by an element matching the selector.

```javascript
core.addEventOnce(nodes, events, callback);
core.addEventOnce(nodes, events, delegate, callback);
```

**Remove Event**

Remove an event from each element.

- `nodes` is a Query Selector string, a Window, Document, HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `events` is a space-separated string of events to remove from the elements.
- `callback` is a function that accepts an event argument, which will be called when the event is triggered.

```javascript
core.removeEvent(nodes, events, callback);
core.removeEvent(nodes, events, delegate, callback);
```

**Trigger Event**

Trigger an event on each element.

- `nodes` is a Query Selector string, a Window, Document, HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `events` is a space-separated string of events to trigger on the elements.

```javascript
core.triggerEvent(nodes, events, data);
```

**Clone Events**

Clone all events from each element to other elements.

- `nodes` is a Query Selector string, a Window, Document, HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `others` is a Query Selector string, a Window, Document, HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.

```javascript
core.cloneEvents(nodes, others);
```

**Blur**

Trigger a blur event on the first element.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.

```javascript
core.blur(nodes);
```

**Click**

Trigger a click event on the first element.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.

```javascript
core.click(nodes);
```

**Focus**

Trigger a focus event on the first element.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.

```javascript
core.focus(nodes);
```

#### Manipulation

**Create**

Create a new DOM element.

- `tagName` is a string indicating the type of element you wish to create.

```javascript
const element = core.create(tagName);
```

**Create Comment**

Create a new comment node.

- `comment` is a string indicating the comment.

```javascript
const node = core.createComment(comment);
```

**Create Text**

Create a new text node.

- `text` is a string indicating the text.

```javascript
const node = core.createText(text);
```

**Clone**

Clone each node (optionally deep, and with events and data).

- `nodes` is a Query Selector string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `deep` is a boolean indicating whether you wish to clone all descendent elements, and will default to *true*.
- `eventsDate` is a boolean indicating whether you wish to clone all events and data to the new nodes, and will default to *false*.

```javascript
const clones = core.clone(nodes, deep, eventsData);
```

**Detach**

Detach an element from the DOM.

- `nodes` is a Query Selector string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```javascript
core.detach(nodes);
```

**Empty**

Remove all children of each node from the DOM.

- `nodes` is a Query Selector string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```javascript
core.empty(nodes);
```

**Remove**

Remove each node from the DOM.

- `nodes` is a Query Selector string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `deep` is a boolean indicating whether to also remove all descendent elements, and will default to *true*.

```javascript
core.remove(nodes, deep);
```

**Replace**

Replace each other node with nodes.

- `nodes` is a Query Selector string, a HTML string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `others` is a Query Selector string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```javascript
core.replaceAll(nodes, others);
```

**Replace All**

Replace each node with other nodes.

- `nodes` is a Query Selector string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `others` is a Query Selector string, a HTML string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```javascript
core.replaceWith(nodes, others);
```

##### Move

**After**

Insert each other node after the first node.

- `nodes` is a Query Selector string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `others` is a Query Selector string, a HTML string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```javascript
core.after(nodes, others);
```

**Before**

Insert each other node before the first node.

- `nodes` is a Query Selector string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `others` is a Query Selector string, a HTML string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```javascript
core.before(nodes, others);
```

**Insert After**

Insert each node after the first other node.

- `nodes` is a Query Selector string, a HTML string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `others` is a Query Selector string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```javascript
core.insertAfter(nodes, others);
```

**Insert Before**

Insert each node before the first other node.

- `nodes` is a Query Selector string, a HTML string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `others` is a Query Selector string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```javascript
core.insertBefore(nodes, others);
```

**Append**

Append each other node to the first node.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `others` is a Query Selector string, a HTML string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```javascript
core.append(nodes, others);
```

**Prepend**

Prepend each other node to the first node.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `others` is a Query Selector string, a HTML string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```javascript
core.prepend(nodes, others);
```

**Append To**

Append each node to the first other node.

- `nodes` is a Query Selector string, a HTML string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `others` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.

```javascript
core.appendTo(nodes, others);
```

**Prepend To**

Prepend each node to the first other node.

- `nodes` is a Query Selector string, a HTML string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `others` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.

```javascript
core.prependTo(nodes, others);
```

##### Wrap

**Unwrap**

Unwrap each node.

- `nodes` is a Query Selector string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `filter` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that must match the parent of each node for it to be unwrapped.

```javascript
core.unwrap(nodes, filter);
```

**Wrap**

Wrap each nodes with other nodes.

- `nodes` is a Query Selector string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `others` is a Query Selector string, a HTML string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.

```javascript
core.wrap(nodes, others);
```

**Wrap All**

Wrap all nodes with other nodes.

- `nodes` is a Query Selector string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `others` is a Query Selector string, a HTML string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.

```javascript
core.wrapAll(nodes, others);
```

**Wrap Inner**

Wrap the contents of each node with other nodes.

- `nodes` is a Query Selector string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `others` is a Query Selector string, a HTML string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.

```javascript
core.wrapInner(nodes, others);
```

#### Traversal

##### Filter

**Filter**

Return all elements matching a filter.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `filter` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that the nodes will be filtered by.

```javascript
const filtered = core.filter(nodes, filter);
```

**Filter One**

Return the first element matching a filter.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `filter` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that the nodes will be filtered by.

```javascript
const filtered = core.filterOne(nodes, filter);
```

**Not**

Return all elements not matching a filter.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `filter` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that the nodes will be filtered by.

```javascript
const filtered = core.not(nodes, filter);
```

**Has**

Return all elements with a descendent matching a filter.

- `nodes` is a Query Selector string, a Document, HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `filter` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that the nodes will be filtered by.

```javascript
const filtered = core.has(nodes, filter);
```

**Hidden**

Return all hidden elements.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.

```javascript
const filtered = core.hidden(nodes);
```

**Visible**

Return all visible elements.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.

```javascript
const filtered = core.visible(nodes);
```

##### Find

**Find**

Find all elements matching a selector.

- `nodes` is a Query Selector string, a Document, HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `selectors` is an Array or comma-seperated list of standard CSS selectors to search for.

```javascript
const elements = core.find(selectors);
const descendents = core.find(nodes, selectors);
```

**Find One**

Find a single element matching a selector.

- `nodes` is a Query Selector string, a Document, HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `selectors` is an Array or comma-seperated list of standard CSS selectors to search for.

```javascript
const element = core.findOne(selectors);
const descendent = core.findOne(nodes, selectors);
```

**Find By Class**

Find all elements with a specific class.

- `nodes` is a Query Selector string, a Document, HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `className` is a string indicating the class name to search for.

```javascript
const elements = core.findByClass(className);
const descendents = core.findByClass(nodes, className);
```

**Find One By Class**

Find the first element with a specific class.

- `nodes` is a Query Selector string, a Document, HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `className` is a string indicating the class name to search for.

```javascript
const element = core.findOneByClass(className);
const descendent = core.findOneByClass(nodes, className);
```

**Find By ID**

Find all elements with a specific ID.

- `nodes` is a Query Selector string, a Document, HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `id` is a string indicating the id to search for.

```javascript
const elements = core.findById(id);
const descendents = core.findById(nodes, id);
```

**Find One By ID**

Find the first element with a specific ID.

- `nodes` is a Query Selector string, a Document, HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `id` is a string indicating the id to search for.

```javascript
const element = core.findOneById(id);
const descendent = core.findOneById(nodes, id);
```

**Find By Tag**

Find all elements with a specific tag.

- `nodes` is a Query Selector string, a Document, HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `tagName` is a string indicating the tag name to search for.

```javascript
const elements = core.findByTag(tagName);
const descendents = core.findByTag(nodes, tagName);
```

**Find One By Tag**

Find the first element with a specific tag.

- `nodes` is a Query Selector string, a Document, HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `tagName` is a string indicating the tag name to search for.

```javascript
const element = core.findOneByTag(tagName);
const descendent = core.findOneByTag(nodes, tagName);
```


##### Traversal

**Child**

Find the first child of each element matching a filter.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `filter` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that the nodes will be filtered by.

```javascript
const child = core.child(nodes);
const child = core.child(nodes, filter);
```

**Children**

Find all children of each element, and optionally matching a filter.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `filter` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that the nodes will be filtered by.

```javascript
const children = core.children(nodes);
const children = core.children(nodes, filter);
```

**Contents**

Find all child nodes for each element, (including text and comment nodes).

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.

```javascript
const contents = core.contents(nodes);
```

**Closest**

Find the closest ancestor to each element matching a filter, and optionally before hitting a limit.

- `nodes` is a Query Selector string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `filter` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that the nodes will be filtered by.
- `until` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that when matched will stop the search.

```javascript
const closest = core.closest(nodes, filter, until);
```

**Parent**

Find the parent of each element matching a filter.

- `nodes` is a Query Selector string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `filter` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that the nodes will be filtered by.

```javascript
const parent = core.parent(nodes, filter);
```

**Parents**

Find all parents of each element matching a filter, and optionally before hitting a limit.

- `nodes` is a Query Selector string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `filter` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that the nodes will be filtered by.
- `until` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that when matched will stop the search.

```javascript
const parents = core.parents(nodes, filter, until);
```

**Offset Parent**

Find the offset parent (relatively positioned) of the first element.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.

```javascript
const offsetParent = core.offsetParent(nodes);
```

**Next**

Find the next sibling for each element matching a filter.

- `nodes` is a Query Selector string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `filter` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that the nodes will be filtered by.

```javascript
const next = core.next(nodes, filter);
```

**Next All**

Find all next siblings for each element matching a filter, and optionally before hitting a limit.

- `nodes` is a Query Selector string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `filter` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that the nodes will be filtered by.
- `until` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that when matched will stop the search.

```javascript
const nextAll = core.nextAll(nodes, filter, until);
```

**Previous**

Find the previous sibling for each element matching a filter, and optionally before hitting a limit.

- `nodes` is a Query Selector string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `filter` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that the nodes will be filtered by.

```javascript
const prev = core.prev(nodes, filter);
```

**Previous All**

Find all previous siblings for each element matching a filter, and optionally before hitting a limit.

- `nodes` is a Query Selector string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `filter` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that the nodes will be filtered by.
- `until` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that when matched will stop the search.

```javascript
const prevAll = core.prevAll(nodes, filter, until);
```

**Siblings**

Find all siblings for each element matching a filter.

- `nodes` is a Query Selector string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `filter` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that the nodes will be filtered by.

```javascript
const siblings = core.siblings(nodes, filter);
```


#### Utility

##### Tests

**Has Attribute**

Returns true if any of the elements has a specified attribute.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `attribute` is a string indicating the attribute value to test for.

```javascript
core.hasAttribute(nodes, attribute);
```

**Has Class**

Returns *true* if any of the elements has any of the specified classes.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `classes` is an Array of classes, or a space seperated string of class names to test for.

```javascript
core.hasClass(nodes, ...classes);
```

**Has Data**

Returns *true* if any of the nodes has custom data.

- `nodes` is a Query Selector string, a Window, Document, Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.
- `key` is a string indicating the custom data value to test for.

```javascript
core.hasData(nodes);
core.hasData(nodes, key);
```

**Has Property**

Returns *true* if any of the elements has a specified property.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `property` is a string indicating the property value to test for.

```javascript
core.hasProperty(nodes, property);
```

**Contains**

Returns *true* if any of the elements contains a descendent matching a filter.

- `nodes` is a Query Selector string, a Document, HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `filter` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that the nodes will be tested for.

```javascript
core.contains(nodes, filter);
```

**Is**

Returns *true* if any of the elements matches a filter.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `filter` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that the nodes will be tested for.

```javascript
core.is(nodes, filter);
```

**Is Fixed**

Returns *true* if any of the elements or a parent of any of the elements is "fixed".

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.

```javascript
core.isFixed(nodes);
```

**Is Hidden**

Returns *true* if any of the elements is hidden.

- `nodes` is a Query Selector string, a Document, Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```javascript
core.isHidden(nodes);
```

**Is Visible**

Returns *true* if any of the elements is visible.

- `nodes` is a Query Selector string, a Window, Document, Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```javascript
core.isVisible(nodes);
```


##### Utility

**Execute**

Execute a command in the current context.

- `command` is the command you are executing.
- `showDefaultUI` is a boolean indicating whether the default user interface be shown.
- `value` is the value to use as the input for commands which require an argument.

```javascript
core.exec(command, showDefaultUI, value);
```

**Force Show**

Force an element to be temporarily shown, and then execute a callback.

- `nodes` is a Query Selector string, a Window, Document, HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `callback` is a function that accepts a node as a parameter.

```javascript
core.forceShow(nodes, callback);
```

**Index**

Get the index of the first element matching a filter.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.
- `filter` is either a function that accepts a node argument, a standard CSS selector, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object that the nodes will be filtered by.

```javascript
const index = core.index(nodes, filter);
```

**Index Of**

Get the index of the first element relative to it's parent element.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.

```javascript
const indexOf = core.indexOf(nodes);
```

**Select**

Create a selection on the first node.

- `nodes` is a Query Selector string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```javascript
core.select(nodes);
```

**Select All**

Create a selection on all nodes.

- `nodes` is a Query Selector string, a Node, NodeList, HTMLElement, HTMLCollection, an Array of Nodes or a QuerySet object.

```javascript
core.selectAll(nodes);
```

**Serialize**

Returns a serialized string containing names and values of all form elements.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.

```javascript
const serialize = core.serialize(nodes);
```

**Serialize Array**

Returns a serialized array containing names and values of all form elements.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.

```javascript
const serialArray = core.serializeArray(nodes);
```

**Serialize Object**

Returns an object containing Key/Value pairs of all form elements.

- `nodes` is a Query Selector string, a HTMLElement, HTMLCollection, an Array of Elements or a QuerySet object.

```javascript
const serialObject = core.serializeObject(nodes);
```


### AJAX

**Ajax**

Perform an XHR request.

- `url` is a string containing the destination URL for the request.
- `data` is an object containing Key/Value pairs of configuration for the request.

If the `url` argument is omitted, and the `data` object does not contain a `url` property, the current Window location will be used by default.

```javascript
core.ajax(data);
core.ajax(url, data);
```

**Upload**

Perform an XHR request for a file upload.

- `url` is a string containing the destination URL for the request.
- `data` is an object containing Key/Value pairs of configuration for the request.

If the `url` argument is omitted, and the `data` object does not contain a `url` property, the current Window location will be used by default.

```javascript
core.upload(data);
core.upload(url, data);
```

**Load Script**

Load and executes a JavaScript file.

- `script` is a string containing the destination URL for the script to load.

```javascript
core.loadScript(script);
```

**Load Scripts**

Load and execute multiple JavaScript files (in order).

- `scripts` is a Array of strings containing the destination URLs for the scripts to load.

```javascript
core.loadScripts(scripts);
```

**Load Stylesheet**

Import A CSS Stylesheet file.

- `stylesheet` is a string containing the destination URL for the stylesheet to load.

```javascript
core.loadStyle(stylesheet);
```

**Load Stylesheets**

Import multiple CSS Stylesheet files.

- `stylesheets` is a Array of strings containing the destination URLs for the stylesheets to load.

```javascript
core.loadStyles(stylesheets);
```


### Cookie

**Get Cookie**

Get a cookie value (optionally json encoded).

- `name` is a string containing the name of the cookie value to retrieve.
- `json` is a boolean indicating whether the cookie contains a JSON value, and will default to *false*.

```javascript
const value = core.getCookie(name, json);
```

**Set Cookie**

Set a cookie (optionally json encoded).

- `name` is a string containing the name of the cookie value to set.
- `value` is the value you wish to set the cookie to.
- `options` is an object containing configuration options for the cookie.
- `json` is a boolean indicating whether to JSON encode the cookie value, and will default to *false*.

```javascript
core.setCookie(name, value, options, json);
```

**Remove Cookie**

Remove a cookie.

- `name` is a string containing the name of the cookie value to remove.
- `options` is an object containing configuration options for the cookie.

```javascript
core.removeCookie(name, options);
```


### Event Factory

**Animation Event Factory**

Create a self regenerating event that will execute once per animation frame.

- `callback` is a function that accepts an event argument, which will be called when the event is triggered.

```javascript
const event = core.animationEventFactory(callback);
```

**Mouse Drag Event Factory**

Create a mouse drag event (optionally limited by animation frame).

- `down` is a function that accepts an event argument, which will be called when the event is started.
- `move` is a function that accepts an event argument, which will be called when the mouse is moved during the event.
- `up` is a function that accepts an event argument, which will be called when the event has ended (mouse button has been released).
- `animated` is a boolean indicating whether to limit the move event to once per animation frame, and will default to *true*.

```javascript
const event = core.mouseDragFactory(down, move, up, animated);
```


### Parsers

**Parse HTML**

Returns an array containing nodes parsed from a HTML string.

- `html` is a string containing the HTML data to parse.

```javascript
const nodes = core.parseHTML(html);
```

**Parse XML**

Returns a DOM object from an XML string.

- `xml` is a string containing the XML data to parse.

```javascript
const xml = core.parseXML(xml);
```


## Static Methods

### Array

**Flatten Array**

Create a single-dimensional Array from a multiple-dimensional Array.

- `array` is an Array you wish to flatten.

```javascript
const flatArray = Core.flattenArray(array);
```

**Unique Array**

Remove duplicate elements in an array.

- `array` is an Array you wish to remove duplicates from.

```javascript
const uniqueArray = Core.uniqueArray(array);
```


### Math

**Clamp**

Clamp a value between a min and max.

- `value` is a number you wish to clamp.
- `min` is a number which will be the minimum of the clamped value, and will default to *0*.
- `max` is a number which will be the maximum of the clamped value, and will default to *1*.

```javascript
const clamp = Core.clamp(value, min = 0, max = 1);
```

**Clamp Percent**

Clamp a value between 0 and 100.

- `value` is a number you wish to clamp.

```javascript
const clampPercent = Core.clampPercent(value);
```

**Distance**

Get the distance between two vectors.

- `x1` is a number containing first X co-ordinate.
- `y1` is a number containing first Y co-ordinate.
- `x2` is a number containing second X co-ordinate.
- `y2` is a number containing second Y co-ordinate.

```javascript
const dist = Core.dist(x1, y1, x2, y2);
```

**Length**

Get the length of an X,Y vector.

- `x` is a number containing the X co-ordinate.
- `y` is a number containing the Y co-ordinate.

```javascript
const len = Core.len(x, y);
```

**Linear Interpolation**

Linear interpolation from one value to another.

- `min` is a number to be used as the minimum of the "lerped" amount.
- `max` is a number to be used as the maximum of the "lerped" amount.
- `amount` is the amount to "lerp" (between 0 and 1).

```javascript
const lerp = Core.lerp(min, max, amount);
```

**Map**

Map a value from one range to another.

- `value` is a number you wish to map.
- `fromMin` is a number to be used as the minimum amount of the "from" range.
- `fromMax` is a number to be used as the maximum amount of the "from" range.
- `toMin` is a number to be used as the minimum amount of the "to" range.
- `toMax` is a number to be used as the maximum amount of the "to" range.

```javascript
const map = Core.map(value, fromMin, fromMax, toMin, toMax);
```

**To Step**

Round a number to a specified step-size.

- `value` is a number you wish to constrain to a specified "step".
- `step` is a number to be used as the minimum step-size.

```javascript
const toStep = Core.toStep(value, step);
```

**Linear Percent**

Get the linear percent of a value in a specified range.

- `value` is a number you wish to calculate the linear percent of.
- `min` is a number to be used as the minimum amount of the range.
- `max` is a number to be used as the maximum amount of the range.

```javascript
const linearPercent = Core.linearPercent(value, min, max);
```

**Linear Value**

Get the linear value of a percent in a specified range.

- `percent` is a number you wish to calculate the linear value of.
- `min` is a number to be used as the minimum amount of the range.
- `max` is a number to be used as the maximum amount of the range.

```javascript
const linearValue = Core.linearValue(percent, min, max);
```

**Logarithmic Percent**

Get the logarithmic percent of a value in a specified range.

- `value` is a number you wish to calculate the logarithmic percent of.
- `min` is a number to be used as the minimum amount of the range.
- `max` is a number to be used as the maximum amount of the range.

```javascript
const logPrecent = Core.logPercent(value, min, max);
```

**Logarithmic Value**

Get the logarithmic value of a percent in a specified range.

- `percent` is a number you wish to calculate the logarithmic value of.
- `min` is a number to be used as the minimum amount of the range.
- `max` is a number to be used as the maximum amount of the range.

```javascript
const logValue = Core.logValue(percent, min, max);
```


### String

**Camel Case**

Convert a string to camelCase.

- `string` is a string you wish to transform to camelCase.

```javascript
const camelCase = Core.camelCase(string);
```

**Snake Case**

Convert a string to snake-case.

- `string` is a string you wish to transform to snake-case.

```javascript
const snakeCase = Core.snakeCase(string);
```


### Tests

**Is Array**

Returns *true* if the value is an Array.

- `value` is the value you wish to test.

```javascript
const isArray = Core.isArray(value);
```

**Is Boolean**

Returns *true* if the value is a Boolean.

- `value` is the value you wish to test.

```javascript
const isBoolean = Core.isBoolean(value);
```

**Is Document**

Returns *true* if the value if a Document.

- `value` is the value you wish to test.

```javascript
const isDocument = Core.isDocument(value);
```

**Is Element**

Returns *true* if the value is a HTML Element.

- `value` is the value you wish to test.

```javascript
const isElement = Core.isElement(value);
```

**Is Element List**

Returns *true* if the value is a HTML Collection.

- `value` is the value you wish to test.

```javascript
const isElementList = Core.isElementList(value);
```

**Is Function**

Returns *true* if the value is a function.

- `value` is the value you wish to test.

```javascript
const isFunction = Core.isFunction(value);
```

**Is Node**

Returns *true* if the value is a Node.

- `value` is the value you wish to test.

```javascript
const isNode = Core.isNode(value);
```

**Is Node List**

Returns *true* if the value is a Node List.

- `value` is the value you wish to test.

```javascript
const isNodeList = Core.isNodeList(value);
```

**Is Numeric**

Returns *true* if the value is numeric.

- `value` is the value you wish to test.

```javascript
const isNumeric = Core.isNumeric(value);
```

**Is Object**

Returns *true* if the value is an Object.

- `value` is the value you wish to test.

```javascript
const isObject = Core.isObject(value);
```

**Is Query Set**

Returns *true* if the value is a Query Set.

- `value` is the value you wish to test.

```javascript
const isQuerySet = Core.isQuerySet(value);
```

**Is String**

Returns *true* if the value is a string.

- `value` is the value you wish to test.

```javascript
const isString = Core.isString(value);
```

**Is Window**

Returns *true* if the value is a Window.

- `value` is the value you wish to test.

```javascript
const isWindow = Core.isWindow(value);
```


## Query Set

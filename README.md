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

```core.animate(nodes, callback, duration)```

```core.stop(nodes)```

##### Animations

```core.dropIn(nodes, duration = 1000)```
```core.dropOut(nodes, duration = 1000)```

```core.fadeIn(nodes, duration = 1000)```
```core.fadeOut(nodes, duration = 1000)```

```core.rotateIn(nodes, x = 0, y = 1, inverse = false, duration = 1000)```
```core.rotateOut(nodes, x = 0, y = 1, inverse = false, duration = 1000)```

```core.slideIn(nodes, direction = 'bottom', duration = 1000)```
```core.slideOut(nodes, direction = 'bottom', duration = 1000)```

```core.squeezeIn(nodes, direction = 'bottom', duration = 1000)```
```core.squeezeOut(nodes, direction = 'bottom', duration = 1000)```

##### Queue

```core.queue(nodes, callback)```

```core.clearQueue(nodes)```


#### Attributes

```core.getAttribute(nodes, attribute)```
```core.setAttribute(nodes, attribute, value)```
```core.removeAttribute(nodes, attribute)```

```core.getDataset(nodes, key)```
```core.setDataset(nodes, key, value)```

```core.getHTML(nodes)```
```core.setHTML(nodes, html)```

```core.getProperty(nodes, property)```
```core.setProperty(nodes, property, value)```
```core.removeProperty(nodes, property)```

```core.getText(nodes)```
```core.setText(nodes, text)```

```core.getValue(nodes)```
```core.setValue(nodes, value)```

##### Data

```core.getData(nodes, key)```
```core.setData(nodes, key, value)```
```core.removeData(nodes, key)```

##### Position

```core.center(nodes, offset)```
```core.position(nodes, offset)```
```core.rect(nodes, offset)```

```core.constrain(nodes, container)```

```core.distTo(nodes, x, y)```
```core.distToNode(nodes, others)```

```core.nearestTo(nodes, x, y)```
```core.nearestToNode(nodes, others)```

```core.percentX(nodes, x, offset)```
```core.percentY(nodes, y, offset)```

##### Scroll

```core.scrollTo(nodes, x, y)```
```core.scrollToX(nodes, x)```
```core.scrollToY(nodes, y)```

```core.scrollX(nodes)```
```core.scrollY(nodes)```

##### Size

```core.height(nodes, padding, border, margin)```

```core.width(nodes, padding, border, margin)```

##### Styles

```core.addClass(nodes, ...classes)```
```core.removeClass(nodes, ...classes)```
```core.toggleClass(nodes, ...classes)```

```core.css(nodes, style)```

```core.getStyle(nodes, style)```
```core.setStyle(nodes, style, value, important)```

```core.hide(nodes)```
```core.show(nodes)```
```core.toggle(nodes)```


#### Events

```core.addEvent(nodes, events, delegate, callback, selfDestruct = false)```
```core.addEventOnce(nodes, events, delegate, callback)```
```core.removeEvent(nodes, events, delegate, callback)```
```core.triggerEvent(nodes, events, data)```
```core.cloneEvents(nodes, others)```

```core.blur(nodes)```
```core.click(nodes)```
```core.focus(nodes)```


#### Manipulation

```core.after(nodes, others)```
```core.before(nodes, others)```
```core.insertAfter(nodes, others)```
```core.insertBefore(nodes, others)```

```core.append(nodes, others)```
```core.appendTo(nodes, others)```
```core.prepend(nodes, others)```
```core.prependTo(nodes, others)```

```core.detach(nodes)```
```core.empty(nodes)```
```core.remove(nodes, deep = true)```

```core.create(tagName)```
```core.clone(nodes, deep = true, eventsData = false)```
```core.replaceAll(nodes, others)```
```core.replaceWith(nodes, others)```

```core.unwrap(nodes, filter)```
```core.wrap(nodes, others)```
```core.wrapAll(nodes, others)```
```core.wrapInner(nodes, others)```


#### Traversal

##### Filter

```core.filter(nodes, filter)```
```core.filterOne(nodes, filter)```

```core.not(nodes, filter)```

```core.has(nodes, filter)```

```core.hidden(nodes)```
```core.visible(nodes)```

##### Find

```core.find(nodes, selectors)```
```core.findOne(nodes, selectors)```

```core.findByClass(nodes, className)```
```core.findOneByClass(nodes, className)```

```core.findById(nodes, id)```
```core.findOneById(nodes, id)```

```core.findByTag(nodes, tagName)```
```core.findOneByTag(nodes, tagName)```

##### Traversal

```core.child(nodes, filter)```
```core.children(nodes, filter, first = false, elementsOnly = true)```
```core.contents(nodes)```

```core.closest(nodes, filter, until)```
```core.parent(nodes, filter)```
```core.parents(nodes, filter, until, closest = false)```
```core.offsetParent(nodes)```

```core.next(nodes, filter)```
```core.nextAll(nodes, filter, until = false, first = false)```
```core.prev(nodes, filter)```
```core.prevAll(nodes, filter, until = false, first = false)```
```core.siblings(nodes, filter, elementsOnly = true)```


#### Utility

##### Tests

```core.hasAttribute(nodes, attribute)```
```core.hasClass(nodes, ...classes)```
```core.hasData(nodes, key)```
```core.hasProperty(nodes, prop)```

```core.contains(nodes, filter)```
```core.is(filter)```

```core.isFixed(nodes)```
```core.isHidden(nodes)```
```core.isVisible(nodes)```


#### Utility

```core.forceShow(nodes, callback)```

```core.index(nodes, filter)```
```core.indexOf(nodes)```

```core.select(nodes)```
```core.selectAll(nodes)```

```core.serialize(nodes)```
```core.serializeArray(nodes)```
```core.serializeObject(nodes)```


### AJAX

```core.ajax(url, data = null, method = 'GET')```
```core.upload(url, data, method = 'POST')```

```core.loadScript(script)```
```core.loadScripts(scripts)```

```core.loadStyle(stylesheet)```
```core.loadStyles(stylesheets)```


### Cookie

```core.getCookie(name, json = false)```

```core.setCookie(name, value, options, json = false)```

```core.removeCookie(name, options)```


### Event Factory

```core.animationEventFactory(callback)```

```core.mouseDragFactory(down, move, up, animated = true)```


### Parsers

```core.parseHTML(string)```

```core.parseXML(string)```


## Frost

### Array

```Frost.flattenArray(array)```

```Frost.uniqueArray(array)```


### Math

```Frost.clamp(val, min = 0, max = 1)```
```Frost.clampPercent(val)```

```Frost.dist(x1, y1, x2, y2)```
```Frost.len(x, y)```

```Frost.lerp(a, b, amount)```
```Frost.map(value, fromMin, fromMax, toMin, toMax)```
```Frost.toStep(value, step)```

```Frost.linearPercent(a, b, value)```
```Frost.linearValue(a, b, percent)```

```Frost.logPercent(a, b, value)```
```Frost.logValue(a, b, percent)```


### String

```Frost.camelCase(string)```

```Frost.snakeCase(string)```


### Tests

```Frost.isArray(value)```

```Frost.isBoolean(value)```

```Frost.isFunction(value)```

```Frost.isNumeric(value)```

```Frost.isObject(value)```

```Frost.isString(value)```

```Frost.isWindow(value)```


## Query Set
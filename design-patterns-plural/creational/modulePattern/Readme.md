Module pattern
- A simple way to Encapsulate Methods & create a ‘toolbox’ of functions to use.

To Create it in JS just have to create an Object Literal with, and each one of the methods are Tools.

```jsx
var Module = {
	method: function () {...},
	nextMethod: function () {...}
}
```

We can also return that bunch of tools with private variables, like using closures:

```jsx
var Module = function () {
	var privateVar = 'I am private...';
	return {
		method: function () {...},
		nextMethod: function () {...},
	}
}
```

The big difference with Constructor Pattern is that Module is used to create only one collection of functions, that work fixing stuff, instead of being data to fill.

A module pattern is a collection of tools that work particularly on one topic. It is not like a constructor because is not a data file, is a list of methods that we can use to make our life easier.

In that way, we can use it like a controller. That is a collection of methods that work over a model, and show and transform data about that model, without being part of that data.
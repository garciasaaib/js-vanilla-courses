# Curso de asincronismo con JavaScript
Los lenguajes de programación son por principio síncronos, y el asincronismo es una funcionalidad añadida a los lenguajes

JavaScript es por defecto síncrono y tiene un solo subproceso asíncrono, un solo hilo para trabajar. JavaScript es síncrono y no bloqueante, con un bucle de eventos (concurrencia), implementado como único hilo para sus interfaces.

### JavaScript es single-threaded

Aun con múltiples procesadores, solo se puede ejecutar tareas en un solo hilo, llamado hilo principal

### Bloqueante

Una tarea no devuelve el control hasta que se ha completado.

### No Bloqueante

Una tarea devuelve el control inmediatamente con independencia del resultado. Si se completó, devuelve los datos. Si no, un error.

### Síncrono

Las tareas que se ejecutan de manera secuencial, debe esperar a que se complete para poder continuar con la siguiente tarea.

### Asíncrono

Las tareas pueden ser realizadas más tarde, lo que hace posible que una respuesta sea procesada en diferido.

### Concurrencia en JavaScript

Utiliza un modelo de concurrencia basado en un “loop de eventos”. 

### EventLoop

Patrón de diseño implementado en un bucle de eventos que espera y distribuye eventos o mensajes de un programa.

### Formas en las que JavaScript maneja la asincronía

### Callbacks

Una función que es pasada como argumento de otra función y que será invocada o no.

### Promesas (ES6)

Función no-bloqueante y asíncrona la cual puede retornar un valor ahora , en el futuro o nunca.

### Async-Await (ES2017)

Permite estructurar una función asíncrona sin bloqueo de manera similar a una función síncrona ordinaria.

Las nuevas tecnologías permiten hacer parecer que JavaScript acaba de convertirse en Multi-Threaded con la capacidad de ejecutar múltiples tareas simultáneamente. Pero en realidad no ha dejado de tener un solo hilo.

# EvenLoop

“Bucle de eventos” es un patrón de diseño que espera y distribuye eventos o mensajes en un programa.

### Memory Heap

Los objetos son asignados a un montículo. Un espacio grande en memoria no organizado.

### Call Stack (pila)

Apila de forma organizada las instrucciones de nuestro programa.

### Task Queue

Cola de tareas, se maneja la concurrencia, se agrega las tareas que ya están listas para pasar al Stack (pila). El Stack debe estar vacío.

### MicroTask Queue

Las promesas tienen otra manera de ejecutarse y una prioridad superior.

### Web APIs

JavaScript del lado del cliente: setTimeout, XMLHttpRequest, File Reader, DOM.

Node: fs, https.

[Try async flow](http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)
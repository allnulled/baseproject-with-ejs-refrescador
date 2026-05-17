## API de ModulerV3

Las globales handy son:

```js
// La clase:
ModulerV3
// La instancia global:
ModulerV3.global === Moduler;
```

## Estructuración de la API

```js
ModulerV3.prototype.definitions = {};
ModulerV3.prototype.drivers = [];
ModulerV3.prototype._getDefinition = () => {...};
ModulerV3.prototype._getMeaning = () => {...};
ModulerV3.prototype._getInjection = () => {...};
ModulerV3.prototype.define = () => {...};
ModulerV3.prototype.mean = () => {...};
ModulerV3.prototype.inject = () => {...};
```

## Uso de la API

Estos son algunos ejemplos de uso:

### Definir un módulo con: nombre, ruta y categoría

```js
Moduler.define({
    // $uuid: "path://encyclopedia/science/chemical/elements/carbon.js",
    // $promise: type Promise | null
    // $loaded: type any
    name: "Carbon",
    path: "encyclopedia/science/chemical/elements/carbon.js",
    category: [
        ["Science", "Chemical"],
        ["Another", "Place", "Chemical"],
        "And/Another/Place/Chemical",
    ]
});
```

### Obtener un módulo: por nombre, por ruta, por fichero y por url

```js
// Por nombre:
await Moduler.mean({name: "Carbon"}); // devolverá una lista de módulos
// Por ruta:
await Moduler.mean({path: "encyclopedia/science/chemical/elements/carbon.js"});
// Por fichero:
await Moduler.mean({file: "encyclopedia/science/chemical/elements/carbon.js"});
// Por url:
await Moduler.mean({url: "encyclopedia/science/chemical/elements/carbon.js"});
```

### Obtener un módulo: por valor crudo y por factoría

```js
await Moduler.mean({module: 5000});
await Moduler.mean({factory: async () => 5000});
```
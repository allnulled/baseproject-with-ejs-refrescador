# API de ModulerV3

## Método define

```js
define({
    name: "cached name",
    module: "raw value",
    uses: [
        // a/1. Módulo por nombre:
        { name: "other module name or path" },
        // b/2. Módulo por exportación:
        { module: 5 },
        // c/3. Módulo por fabricación:
        { factory: () => 50 },
        // d/4. Módulo por importación de fichero:
        { file: "relative/path/to/module.js" },
        // e/5. Módulo por importación de url:
        { file: "relative/path/to/module.js" },
        // f/6. Módulo por importación de ruta:
        { path: "relative/path/to/module.js" },
        // g/7. Módulo con dependencias propias:
        { factory: jQuery => {}, uses: ["jCuery"] },
        // h/8. Módulo con getter:
        { module: 700, getter: val => val + 300 },
    ],
    factory: (a,b,c,d,e,f,g) => {
        // aquí se han inyectado los módulos indicados en `uses`
        return "made value",
    }
    getter: val => "altered: " + val,
});
```

### Todos los parámetros del método define

- `name`: (opcional) sirve para los dos:
   - cachear el nombre del módulo, en `define`
   - buscar en la caché el nombre del módulo, en `mean` (diferencia 1)
- Propiedades definidoras de módulo (requerida):
   - `module`: das el módulo tal cual
   - `factory`: das el módulo con una función para fabricarlo (`uses` sirve aquí solamente)
   - `file`: das el módulo con un `readFile`
   - `url`: das el módulo con un `fetch`
   - `path`: das el módulo con un `readFile` o un `fetch`, según el entorno especifique
- `getter`: (opcional) callback para devolver otro valor después del definidor
- `uses`: (opcional, solo con `factory`) lista de parámetros de `mean` para inyectar a la función del `factory`
   - los parámetros que acepta `mean` son los mismos que los de `define` con algunas variaciones
- `category`: (opcional) lista de `Array<String>` con las rutas a los `Submoduler` donde quieres dejar una referencia del valor del módulo

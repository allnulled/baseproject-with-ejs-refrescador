[17/05/2026]

- ✅ ModulerV3.prototype.bundle
   - ✅ Que retorne un BundleWriter
   - ✅ Con el que poder hacer: bundle.write
   - ⏰ 17/05 @ 21:58pm
   - ✅ Que devuelva los módulos con el número de $order en las definitions
   - ⏰ 18/05 @ 17:37pm
- ✅ ModulerV3.BundleWriter.write
   - ✅ Que pueda recuperar los códigos fuente de los módulos con $source
   - ✅ Que pueda recuperar el orden de carga con $order
   - ✅ Que pueda reconstruir con un concat 1 solo código fuente 
      - ✅ Un código fuente que no se invente nada
   - ✅ Que pueda persistirse en un fichero
      - 🔴 O en un directorio
- ⏰ 18/05 @ 20:31pm: POR FIN, tenemos modulos inyectables y remotos (funcionando lo mínimo, pero).
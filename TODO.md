[17/05/2026]

- ✅ ModulerV3.prototype.bundle
   - ✅ Que retorne un BundleWriter
   - ✅ Con el que poder hacer: bundle.write
   - ⏰ 21:58pm
   - 🔴 Que devuelva los módulos con el número de $order en las definitions
   - 🔴 Que guarde los códigos fuente transformados:
      - 🔴 En lugar de evaluar los factories
      - 🔴 En lugar de evaluar los files
      - 🔴 En lugar de evaluar los paths
      - 🔴 En lugar de evaluar los urls
      - 🔴 Solo guarda el código fuente transformado en $source
- 🔴 ModulerV3.BundleWriter.write
   - 🔴 Que pueda recuperar los códigos fuente de los módulos con $source
   - 🔴 Que pueda recuperar el orden de carga con $order
   - 🔴 Que pueda reconstruir con un concat 1 solo código fuente 
      - 🔴 Un código fuente que no se invente nada
   - 🔴 Que pueda persistirse:
      - 🔴 En un fichero
      - 🔴 O en un directorio

[18/05/2026]

- Nuevos:
   - 🔴 Soporte para CSS
   - 🔴 Soporte para TS
- Sources:
   - 🔴 Soporte para HTML con inject.source.string
   - 🔴 Soporte para EJS con inject.source.template
- Files:
   - 🔴 Soporte para ficheros JS explícito con inject.file
   - 🔴 Soporte para ficheros EJS explícito con inject.file.template
   - 🔴 Soporte para ficheros HTML explícito con inject.file.string
- URLs:
   - 🔴 Soporte para urls JS explícito con inject.url
   - 🔴 Soporte para urls EJS explícito con inject.url.template
   - 🔴 Soporte para urls HTML explícito con inject.url.string
# Water Jug (Challenge)
- Por Edwin Castañeda [winedcasta@hotmail.com](mailto:winedcasta@hotmail.com)
- Para: Chicks Gold
- Fecha: Sábado 2 de agosto de 2025

## Información de las herramientas

- Framework: Angular 20.1.4
- Node Version: 20.19.4

![Angular CI](https://github.com/edwincastaneda/water-jug-challenge/actions/workflows/ci.yml/badge.svg)

# Arquitectura

## Sistema de diseño
Utilizamos Bootstrap (No CDN) porque quise cambiar un poco el estilo stack que trae la librería, por esta razón genere una carpeta scss que hospeda toda la personalización de bootstrap.
Es una buena forma de estructura toda la personalización a nivel de diseño.

### /Base
Hospeda para este caso las variables de configuración de bootstrap para modificarlas por los valores nuevos personalizados elegidos. Se dividió en archivo de variables y
globals.

## Aplicación

### /Components
- Wizard: Permite elegir las medidas de los Jarrones y el volumen deseado a encontrar.
- Jug Validator: Muestra el listado de soluciones posibles para encontrar el volumen deseado.

### /Utils
- Wizard Helpers: esta utilidad permite configurar la librería Zangdar, utilizada via CDN y su objetivo es integrar la funcionalidad de Wizard.
- Water Jug Solver: contiene las funciones matemáticas (Maximo Común Divisor) y otras validaciones para recorrer y encontrar las rutas posibles para resolver el acertijo.

### /Interfaces
- Water Jug State: permite definir una estructura para almacenar una lista para los pasos registrados (estados).

# Funciones Matemáticas

## Validaciones Principales

Primero validamos que el volumen deseado sea siempre menor al Jarron más grande de los 2.
```
if (target > Math.max(capX, capY)) ;
```
Luego validamos que el Maximo Común Divisor sea igual a 0
```
if (target % gcd(capX, capY) !== 0) ;
```
Estas 2 condiciones permiten bloquear el proceso, pues estos 2 caminos no tienen solución y son excluyentes.

## Estados posibles

Se llena una estructura con la interface para almacenar todos los posibles siguientes estados. La activación de este loop se realiza con la ejecución del paso 0. Adelante se ejecuta un
ciclo que permite iterar sobre esta estructura y generar los siguientes push. En caso ya no existan push porque ya todos los estados fueron visitados, el loop principal se detiene.
```
    const nextStates: WaterJugState[] = [
      { x: capX, y, explanation: '🚰 Fill Jug X' },
      { x, y: capY, explanation: '🚰 Fill Jug Y' },
      { x: 0, y, explanation: '🫙 Empty Jug X' },
      { x, y: 0, explanation: '🫙 Empty Jug Y' },
      {
        x: Math.max(0, x - (capY - y)),
        y: Math.min(capY, y + x),
        explanation: '🫗 Transfer from Jug X ➡️ to Jug Y',
      },
      {
        x: Math.min(capX, x + y),
        y: Math.max(0, y - (capX - x)),
        explanation: '🫗 Transfer to Jug X ⬅️ from Jug Y',
      },
    ];
```
Disparado el loop este ciclo permite recorrer todos los estados previamente definidos donde no se haya visitado antes en cada una de las iteraciones del mientras.

```
    for (const next of nextStates) {
      const nextKey = `${next.x},${next.y}`;
      if (!visited.has(nextKey)) {
        visited.add(nextKey);
        queue.push({ x: next.x, y: next.y, path: [...path, next] });
      }
    }
```



# ¿Cómo Ejecutar la Aplicación?
Descargue o clone el repositorio en una carpeta conocida.
## Locally Compile

Instalar las dependencias:
Verifique antes que posee la versión adecuada de Node.js para evitar problemas. 
En el inicio de este documento se colocó la versión en la que fue construido, también puede revisar el estado del pipeline que verifica el build y el test de angular.

```bash
npm install
```

Ejecutar para correr el servidor en el equipo local:

```bash
ng serve
```

Para construir la aplicación y empaquetarla para usarla en un nginx o docker:

```bash
ng build
```

Ejecución de test unitarios (se ejecutan con Karma y estan escritas con Jasmine).
```bash
ng test
```

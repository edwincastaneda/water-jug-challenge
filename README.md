# Water Jug (Challenge)


## Información de las herramientas

- Framework: Angular 20.1.4
- Node Version: 20.19.4

![Angular CI](https://github.com/edwincastaneda/water-jug-challenge/actions/workflows/ci.yml/badge.svg)



# ¿Cómo Ejecutar?
Descargue o clone el repositorio en una carpeta conocida.
## Local Compile

Instalar las dependencias:
Verifique antes que posee la versión adecuadas de Node.js para evitar problemas. 
En el inicio de este documento se coloco la versión en la que fue construido, tambien puede revisar el estado del pipeline que verifica el build y el test de angular.

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

Ejecución de test unitarios (se esta usando jasmine)
```bash
ng test
```

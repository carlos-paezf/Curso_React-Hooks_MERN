# Sección 7: Generando el build de producción y despliegues en GitHub Pages

- Aprender cómo realizar backups a repositorios de Git
- Subir nuestro repositorio a GitHub
- Uso de Github Pages
- Desplegar nuestra aplicación de React
- Generar build de producción de nuestra aplicación

## Preparación del proyecto - GitHub Pages

Vamos a usar la aplicación de la última sección, por lo cual instalamos los módulos de node con el comando `npm i`. Nos aseguramos que funcione la aplicación con el comando `npm start` o `yarn start`. Para generar el build de producción de una aplicación de React usamos el comando `npm run build`, esto crea una carpeta dentro del proyecto llamada `build`, la cual vamos a desplegar.

## Desplegando aplicación en GitHub Pages

Podemos configurar nuestro nombre de usuario y password desde nuestro equipo con la siguiente guía: [Setting your username in Git](https://docs.github.com/en/enterprise/2.13/user/articles/setting-your-username-in-git). Nuestro proyecto requiere que le demos seguimiento de versiones para poder subir a GitHub. Los pasos a seguir son:

- `git init`: inicializar el repositorio local
- `git add .`: añadir los cambios
- `git commit -m "nombre del commit"`: fotografía de los cambios
- `git commit remote add origin <url del repo>`: Conectar con el repositorio en la nube
- `git push -u origin <branch de despliegue>`: Subir los cambios al repositorio en la nube.

Luego dentro las configuraciones del repositorio en GitHub, accedemos a las opciones de pages en donde seleccionamos la rama y el directorio a desplegar. Es muy recomendado que el directorio a desplegar tenga el nombre de `docs`. Esperamos que se despliegue la aplicación y accedemos a ella.

Nos vamos a topar con que no reconoce algunos recursos, por lo que debemos ir al archivo `docs/index.html` y en los `href` cambiamos los enlaces de `/elemento` a `./elemento` e igualmente con los `src`. Esto se debe hacer, ya que los servidores de GitHub trabajan con Linux, y una dirección que empieza con `/` redirecciona al root de las carpetas, algo que no deseamos nosotros.

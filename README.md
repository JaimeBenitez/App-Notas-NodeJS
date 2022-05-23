# LM-Trabajo14

Trabajo del modulo de LMGSI consistente en realizar una app en NodeJS capaz de crear,modificar y consultar notas a partir de un XML

ANTES DE EMPEZAR:
Necesitaremos las  siguientes instalaciones antes de empezar:
```
npm i nodejs
npm i fs
npm i readline-sync
npm i xml2js
```

EJECUTAMOS:
Para ejecutar esta app usaremos la terminal de VSCODE. Una vez en dicha terminal introduce:
```
node notas.js
```
NAVEGANDO POR LA APP:
Una vez dentro de la app se despliega un menu de opciones, dependiendo del numero pulsado accedemos a una opcion u otra:

Si pulsamos 1, elegiremos crear una nota nueva, nos pedirán el título, contenido y categoría de nuestra nota.A su vez también introducirá automaticamente la fecha y hora actual y la ID de la nota, que será la ID de la ultima nota creada +1. Al meter todos los datos nos preguntarán si queremos confirmar, escribiremos "si" para confirmar o cualquier otra cosa para cancelar.

Si en el menú principal pulsamos 2, elegiremos mostrar la lista completa de todas las notas existentes en el XML.

Si en el menú principal pulsamos 3, elegiremos buscar una nota concreta, para ello tendremos que introducir la ID de la nota a buscar.

Si en el menú principal pulsamos 4, elegiremos modificar el contenido de una nota, para ello tendremos que, una vez mas, introducir la ID de la nota a modificar y el nuevo contenido que tendrá la nota.

Finalmente si en el menú principal pulsamos 0, elegiremos cerrar el programa.

REALIZADO POR: JAIME BENITEZ ACIEN

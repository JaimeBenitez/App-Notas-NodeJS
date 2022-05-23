const fs = require("fs");
const xml2js = require("xml2js");
const readline = require('readline-sync');


var ARCHIVO = 'notas.xml'

//Empezaremos mostrando un menú

function menuPrincipal(){
    console.log("Elige una opción: \n ")
    const options = ['1. Nueva nota', '2. Listado de notas','3. Busqueda','4. Modificar contenido']
    let eleccion = readline.keyInSelect(options,'- ',{guide:false, cancel: '0. Cerrar'})+1;
    switch(eleccion){
        case 1:
            nuevaNota()
            break;
        case 2:
            lista()
            break;
        case 3:
            busqueda()
            break;
        case 4:
            cambiarContenido()
            break;
    }
}

//Vamos con el caso 1, haremos una función que nos permitirá meter nuevas notas
function nuevaNota(){
    console.log("Has elegido crear una nueva nota")
    console.log("Introduce un titulo: ")
    let titulo = readline.question("- ")
    console.log("Ahora escribe el contenido de la nota: ")
    let contenido = readline.question("- ")
    console.log("¿Que tipo de nota quieres hacer?: ")
    let categoria = readline.question("- ")
    
    while(true){
        console.log(titulo)
        console.log(contenido)
        console.log(categoria)
        console.log("Si desea crear una nota con esta información introduzca: si")
        let afirmacion = "si"
        let input = readline.question("")
        if(input == afirmacion){
            insertar(titulo,contenido,categoria);
            return;
        } else {
            console.log("Cancelaste la operación")
            return;
        }
    }
}

//Para el uso del caso uno necesitamos poder insertar las notas en nuestro archivo XML. Ademas también añadiremos la fecha 
//y hora de hoy. Vamos a ello
function insertar(title,content,category){
    let fechaActual = new Date();
    let fechaAnyo = fechaActual.getFullYear();
    let fechaMes = fechaActual.getMonth();
    let fechaDia = fechaActual.getDate();
    let horas = fechaActual.getHours();
    let mins = fechaActual.getMinutes();
    let fechaFormateada = `${fechaDia}/${fechaMes}/${fechaAnyo} a las ${horas}:${mins}`
    fs.readFile(ARCHIVO,"utf-8", (err, data) => {
        if (err){
            throw err;
        }
        xml2js.parseString(data, (err,result) => {
            if (err){
                throw err;
            }
            const notaAInsertar = {
                id: parseInt(result.notas.nota.at(-1).id) + 1,
                titulo: title,
                contenido: content,
                categoria: category,
                fecha: fechaFormateada                
            };
            result.notas.nota.push(notaAInsertar);
            const constructor = new xml2js.Builder();
            const xml = constructor.buildObject(result);
            fs.writeFile(ARCHIVO,xml,(err) => {
                if (err) {
                    throw err;
                }
                console.log("Inserción completada");
            });
        });
    });
}

//Vamos con el caso 2, imprimir la lista de notas de nuestro XML
function lista(){
    console.log("Has elegido ver la lista de notas")
    console.log("Notas")
    let parser = new xml2js.Parser();
    fs.readFile(ARCHIVO,"utf-8",(err,data) => {
        if(err){
            throw err;
        }
        parser.parseString(data, (err, result) => {
            if (err) {
                throw err;
            }

            result.notas.nota.forEach((elemento) =>{
                console.log("-----");
                console.log(`ID: ${elemento.id}`);
                console.log(`Titulo: ${elemento.titulo}`);
                console.log(`Contenido: ${elemento.contenido}`);
                console.log(`Categoria: ${elemento.categoria}`);
                console.log(`Fecha: ${elemento.fecha}`);
            });
        });
    });
}
//Ahora realizamos el caso 3, buscar una nota a partir de su ID
function busqueda(){
    console.log("Has elegido buscar una nota")
    let parser = new xml2js.Parser();
    let existe = false;
    console.log("Introduce una ID: ");
    let input = readline.question("- ");
    fs.readFile(ARCHIVO,(err,data) => {
        if (err){
            throw err;
        }
        parser.parseString(data,(err,result) => {
            if (err){
                throw err;
            }
            result.notas.nota.forEach((elemento) =>{
                if(input == elemento.id){
                    existe = true;
                    console.log(`ID: ${elemento.id}`);
                    console.log(`Titulo: ${elemento.titulo}`);
                    console.log(`Contenido: ${elemento.contenido}`);
                    console.log(`Categoria: ${elemento.categoria}`);
                    console.log(`Fecha: ${elemento.fecha}`);
                };
            });
        });
        if(existe == false){
            console.log("La nota con el id proporcionado no existe")
        };
    });
}

//Vamos con el ultimo caso, caso 4, función que nos permitirá modificar el contenido de una nota
function cambiarContenido(){
    let parser = new xml2js.Parser();
    let existe = false;
    console.log("ID de la nota a modificar: ");
    let id = readline.question("- ");
    console.log("Introduce el nuevo contenido: ");
    let nuevoContenido = readline.question("- ");

    fs.readFile(ARCHIVO,(err,data) => {
        if (err){
            throw err;
        }
        parser.parseString(data,(err,result) => {
            if(err){
                throw err;
            }

            result.notas.nota.forEach((elemento) =>{
                if(id == elemento.id){
                    existe = true;
                    elemento.contenido = nuevoContenido;
                    };
            });
            const constructor = new xml2js.Builder();
            const xml = constructor.buildObject(result);
            fs.writeFile(ARCHIVO,xml,(err,data) => {
                if(err){
                    throw err;
                }
            });

            if(existe == false){
                console.log("La nota con el ID proporcionado no existe");
            }else{
                console.log("Modificación realizada");
            }

        })
    })

}


menuPrincipal()

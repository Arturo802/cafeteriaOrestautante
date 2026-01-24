import aguaImage from "./assets/agua.jpeg";
import refrescoImage from "./assets/refresco.jpeg";
import croissantImage from "./assets/croissant.jpeg";
import ensaladaImage from "./assets/ensalada.jpeg";
import hamburguesaImage from "./assets/hamburguesa.jpeg";
import perritoImage from "./assets/perrito.jpeg";
import sandwichImage from "./assets/sandwich.jpeg";
import postreImage from "./assets/postre.jpeg";
import paquetepapasImage from "./assets/paquetepapas.jpeg";

const menu = [
  { nombre: "Agua", precio: 1.5, imagen: aguaImage, stock: 50 },
  { nombre: "Refresco", precio: 2, imagen: refrescoImage, stock: 40 },
  { nombre: "Croissant", precio: 2.5, imagen: croissantImage, stock: 30 },
  { nombre: "Ensalada", precio: 3.5, imagen: ensaladaImage, stock: 25 },
  { nombre: "Hamburguesa", precio: 3, imagen: hamburguesaImage, stock: 35 },
  { nombre: "Perrito", precio: 2.5, imagen: perritoImage, stock: 20 },
  { nombre: "Sandwich", precio: 2.5, imagen: sandwichImage, stock: 30 },
  { nombre: "Postre", precio: 3, imagen: postreImage, stock: 15 },
  { nombre: "Paquete de papas", precio: 1, imagen: paquetepapasImage, stock: 60 },
];

export default menu;

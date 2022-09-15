// Constructor de objetos >>
function Producto(id,nombre,precio,img){
  this.id = id;
  this.nombre = nombre;
  this.precio = precio;
  this.img = img;
  this.cant = 0;
};

//construccion de objetos>>
const leche = new Producto('0','Leche',123,'leche.png');
const carne = new Producto('1','Carne',800,'carne.png');
const vino = new Producto('2','Vino tinto',62,'vino.png');
const paty = new Producto('3','Paty',437,'paty.png');
const fernet = new Producto('4','Fernet',1080,'fernet.png');
const pollo = new Producto('5','Pollo',145,'pollo.png');
const shampoo = new Producto('6','Shampoo',350,'shampoo.png');
const queso = new Producto('7','Queso',300,'queso.png');
const tostadas = new Producto('8','Tostaditas',160,'tostadas.png');

// inventario de productos
let ProductosLocalStorage = JSON.parse(localStorage.getItem('carrito'));
let arrayProductos = [carne,leche,vino,paty,fernet,pollo,shampoo,queso,tostadas];
let cantTotal = 0;
let total = 0;



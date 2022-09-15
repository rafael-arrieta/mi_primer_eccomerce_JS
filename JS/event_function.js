// Chequear que localStorage esté vacio, sinó recuperarlo

if(ProductosLocalStorage){
  arrayProductos = ProductosLocalStorage;
};

for (let i = 0; i<arrayProductos.length; i++){
  total += arrayProductos[i].precio*arrayProductos[i].cant;
  cantTotal += arrayProductos[i].cant;
};

imprimirTotales();

function imprimirTotales(){
htmlTotal.textContent="💸 $ "+total;
htmlCarrito.textContent="🥡"+cantTotal+" productos";
}


// Llenar el body con los objetos de arrayProductos

arrayProductos.forEach((elemento)=>{
  contenedor.innerHTML += `
  <div class="carta">
    <div class="producto">
      <figure>
        <img src="media/${elemento.img}" alt="" srcset="">
      </figure>
      <h3>${elemento.nombre}</h3>
        <h4>$ ${elemento.precio}</h4>
        <p class="align-right"> <button class="button btn-llenar" id="${elemento.id}">Comprar</button></p>
      </div>
    </div>
  `;
});


// 
function agregarAlCarrito(event){
  for(let i=0; i<arrayProductos.length;i++){
    if(event.target.id===arrayProductos[i].id) {
      arrayProductos[i].cant++;
      total=total+arrayProductos[i].precio;
      cantTotal=cantTotal+1;
      imprimirTotales();
    };
  };
  localStorage.setItem('carrito',JSON.stringify(arrayProductos));
};

// EVENTO >> suma los objetos al ARRAY CARRITO
for (let i=0; i<todosLosBtn.length; i++){
  todosLosBtn[i].addEventListener('click',agregarAlCarrito);
};

// EVENTO >> muestra el modal de acuerdo al remover/añadir una clase - Tambien lo actualiza
btnMostrarModal.addEventListener('click', ()=>{
  modal.classList.add('modalVisible');
  modal.classList.remove('modalInvisible');
  actualizarModal();
}
);
function cerrarModal(){
  modal.classList.remove('modalVisible');
  modal.classList.add('modalInvisible');
};
btnCerrarModal.addEventListener('click', cerrarModal);

botonPagar.addEventListener('click', ()=>{
  if (total>0){
    //alert('Gracias por su compra');
    Swal.fire(
      'Gracias por su compra!',
      'En 2hs recibirá su pedido!',
      'success'
    )
    cerrarModal();
    cantTotal=0
    total=0;
    for(let i=0; i<arrayProductos.length ;i++){
      arrayProductos[i].cant=0;
    };
    localStorage.setItem('carrito', JSON.stringify(arrayProductos));
    imprimirTotales();
  }else{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No hay productos en tu carrito!',
      footer: '<a href=https://www.planetadelibros.com.ar/autor/pablo-marchetti/000045689>Necesitas ayuda?</a>'
    })
    cerrarModal();  
  };
}
);

function eliminarDelCarrito(event){
    let productoId = event.target.dataset.id;
    let resultado = arrayProductos.find((producto)=>productoId == producto.id)
    total=total-(resultado.cant*resultado.precio);
    cantTotal=cantTotal-resultado.cant
    resultado.cant=0;
    actualizarModal();
    imprimirTotales();
    localStorage.setItem('carrito',JSON.stringify(arrayProductos));
}

const actualizarModal = function() {
  tbodyCarrito.innerText =''; // << Esta instrucción es la que borra todos los produtos del modal antes de abrirlo
//Cuando el modal se inicia evalua comenzando en vacio

  if (cantTotal==0) { // << ESTE BLOQUE SE EJECUTA CUANDO NO HAY PRODUCTOS EN EL CARRITO
      tbodyCarrito.innerHTML = `
        <tr>
            <td class="clase1">
              No hay productos en tu carrito
            </td>
        </tr>
      `;
      totalPagar.innerText =`Total a pagar $ 0`    
  } else {  // << ESTE BLOQUE SE EJECUTA CUANDO HAY PRODUCTOS EN EL CARRITO
    for(let i=0; i<arrayProductos.length; i++){
      if(arrayProductos[i].cant!==0){
        tbodyCarrito.innerHTML += `
        <tr>
          <td class="clase1">
            ${arrayProductos[i].nombre}
          </td>
          <td class="clase2">
            X ${arrayProductos[i].cant}
          </td>
          <td class="clase3">
            <button class="btnBorrarProducto" data-id="${arrayProductos[i].id}">X</button></p> 
          </td>
          <td class="clase2">
            $ ${arrayProductos[i].cant*arrayProductos[i].precio}
          </td>
        </tr>
        `;
      };
    };
    totalPagar.innerText =`Total a pagar $ ${total}`
    btnBorrarProducto = document.getElementsByClassName('btnBorrarProducto');
    for (let i=0; i<btnBorrarProducto.length; i++){
      btnBorrarProducto[i].addEventListener('click', (event)=> eliminarDelCarrito(event));
    };
  };
};

// EVENTO >> muestra el modal REGISTRO de acuerdo al remover/añadir una clase

btnMostrarModalRegistro.addEventListener('click', ()=>{
  modalRegistro.classList.add('modalRegistroVisible');
  modalRegistro.classList.remove('modalRegistroInvisible');
}
);
function cerrarModalRegistro(){
  modalRegistro.classList.remove('modalRegistroVisible');
  modalRegistro.classList.add('modalRegistroInvisible');
};
btnCerrarModalRegistro.addEventListener('click', cerrarModalRegistro);

//GUARDAR Y BORRAR DATOS DEL SESSION STORAGE Y LOCAL STORAGE

function guardarDatos(storage){
  let registroNombreValue = registroNombre.value;
  let registroMailValue = registroMail.value;

  const usuario ={
    'registroNombre': registroNombreValue,
    'registroMail': registroMailValue
  };

  if(storage==='sessionStorage') {
    sessionStorage.setItem('usuario',JSON.stringify(usuario));
  }
  if(storage==='localStorage') {
    localStorage.setItem('usuario',JSON.stringify(usuario));
  }
};

function borrarDatos(){
 localStorage.clear();
 sessionStorage.clear();
 cantTotal=0
    total=0;
    for(let i=0; i<arrayProductos.length ;i++){
      arrayProductos[i].cant=0;
    };
    localStorage.setItem('carrito', JSON.stringify(arrayProductos));
    imprimirTotales();
};

btnGuardarLocal.addEventListener('click',(e)=>{
  //USO DE LA LIBRERIA SWEET ALERT
  Swal.fire(
    'Te inscribiste correctamente!',
    'Es hora de comprar!',
    'success')
  e.preventDefault();
  guardarDatos("localStorage");
  cerrarModalRegistro();
});

btnGuardarSesion.addEventListener('click',(e)=> {
  //USO DE LA LIBRERIA SWEET ALERT
  Swal.fire(
    'Te inscribiste correctamente!',
    'Es hora de comprar!',
    'success'
  );
  e.preventDefault();
  guardarDatos("sessionStorage");
  cerrarModalRegistro();
});

btnRecupLocal.addEventListener('click',(e)=> {
  e.preventDefault();
  let usuario = JSON.parse(localStorage.getItem('usuario'));
  registroNombre.value = usuario.registroNombre;
  registroMail.value = usuario.registroMail;
});

btnRecupSesion.addEventListener('click',(e)=> {
  e.preventDefault();
  let usuario = JSON.parse(sessionStorage.getItem('usuario'));
  registroNombre.value=usuario.registroNombre;
  registroMail.value = usuario.registroMail;
});

btnBorrarTodo.addEventListener('click',(e)=> {
  //USO DE LA LIBRERIA SWEET ALERT
  Swal.fire(
    'Esperamos verte de nuevo!',
    'Borraste tus datos correctamente!',
    'success'
  );
 e.preventDefault()
 borrarDatos();
 cerrarModalRegistro();
});

//Esto imprime un pokemon en el footer (no tiene nada que ver pero usa una API)

fetch("https://fakerapi.it/api/v1/images?_quantity=1&_type=pokemon&_height=300")
  .then((respuesta) => respuesta.json())
  .then((json) => imagenPokemon.setAttribute('src', json.data[0].url))
  .catch((error) => alert('error al cargar el pokemon',error))
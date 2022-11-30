//Función Para agregar Tabs
function Tab(evt, tabSelect) {
  var i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(tabSelect).style.display = "";
  evt.currentTarget.className += " active";
}

document.getElementById("defaultOpen").click();



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Array de productos
let productos = [
  { id: 10, nombre: "Pizza", precio: 150, restaurante: "Restaurante Deguzmán", disponibilidad: true, imageUrl: "../images/pizza2.png" },
  { id: 11, nombre: "Sushi", precio: 120, restaurante: "Restaurante Deguzmán", disponibilidad: true, imageUrl: "../images/sushi.jpg" },
  { id: 12, nombre: "Hamburguesa", precio: 80, restaurante: "Restaurante Deguzmán", disponibilidad: true, imageUrl: "../images/Hamburguesa.jpg" },
  { id: 13, nombre: "Camarones", precio: 150, restaurante: "Restaurante Deguzmán", disponibilidad: true, imageUrl: "../images/Camarones.jpg" },
  { id: 14, nombre: "Pasta", precio: 85, restaurante: "Restaurante Deguzmán", disponibilidad: true, imageUrl: "../images/pasta.jpg" },
  { id: 15, nombre: "Antojitos Mexicanos", precio: 75, restaurante: "Restaurante Deguzmán", disponibilidad: true, imageUrl: "../images/antojitos.jpg" },
  { id: 16, nombre: "Cortes", precio: 200, restaurante: "Restaurante Deguzmán", disponibilidad: true, imageUrl: "../images/carne.jpg" },
  { id: 17, nombre: "Burritos", precio: 70, restaurante: "Restaurante Deguzmán", disponibilidad: true, imageUrl: "../images/burrito.jpg" },
  { id: 18, nombre: "Wings", precio: 95, restaurante: "Restaurante Deguzmán", disponibilidad: true, imageUrl: "../images/wings.jpg" },
]




let carta = document.getElementById("carta")
let carrito = document.getElementById("carrito")
let arrayCarrito = []

if (localStorage.getItem("carrito")) {
  arrayCarrito = JSON.parse(localStorage.getItem("carrito"))
}

renderizarCarrito()
renderizarProductos(productos)

function renderizarProductos(productos) {
  carta.innerHTML = ""
  for (const producto of productos) {
    let platilloCarta = document.createElement("div")

    platilloCarta.innerHTML = `
    <div class="container">
    <div class="p-3 section">
      <div class="card bg-white text-white card-width container-fade">
        <img src="${producto.imageUrl}" class="card-img imagenes-galeria img-fluid image">
        <div class="card-img-overlay reset-padding">
          <h5 class="card-title text-center card-color card-title-size">${producto.nombre} $${producto.precio}</h5>
          <div class="middle">
            <button id ="botonAgregar" class="botonCompra">
            <p class="card-text p-3 text hover-galeria-text" id=${producto.id}>Agregar ${producto.nombre}</p>
            </button>          
      </div>
    </div>
    `
    carta.append(platilloCarta)
  }

  let botones = document.getElementsByClassName("botonCompra")
  for (const boton of botones) {
    boton.addEventListener("click", agregarAlCarrito)
    boton.addEventListener("click", () => {

      Swal.fire({
        title: 'Exito!',
        text: 'Se ha agregado tu producto al carrito!',
        icon: 'success',
        confirmButtonText: 'Continuar'
      })
    })

  }
}

let buscadorPlatillo = document.getElementById("input")
buscadorPlatillo.addEventListener("input", fnInput)

function fnInput(event) {
  console.log(event)
  let productosFiltrados = productos.filter(producto => producto.nombre.includes(buscadorPlatillo.value))
  renderizarProductos(productosFiltrados)
}


function agregarAlCarrito(e) {
  console.dir(e.target.id)
  let productoBuscado = productos.find(producto => producto.id == e.target.id)
  let posicionProducto = arrayCarrito.findIndex(producto => producto.id == e.target.id)

  if (posicionProducto != -1) {
    arrayCarrito[posicionProducto] = {
      id: arrayCarrito[posicionProducto].id, nombre: arrayCarrito[posicionProducto].nombre, precio: arrayCarrito[posicionProducto].precio, unidades: arrayCarrito[posicionProducto].unidades + 1, subtotal: arrayCarrito[posicionProducto].precio * (arrayCarrito[posicionProducto].unidades + 1)
    }
  } else {
    arrayCarrito.push({
      id: productoBuscado.id, nombre: productoBuscado.nombre, precio: productoBuscado.precio, unidades: 1, subtotal: productoBuscado.precio
    })
  }

  let carritoJSON = JSON.stringify(arrayCarrito)
  localStorage.setItem("carrito", carritoJSON)

  renderizarCarrito()
}


function renderizarCarrito() {
  carrito.innerHTML = ""
  for (const itemCarrito of arrayCarrito) {
    carrito.innerHTML += `
      <ul class="itemCarrito">    
        <li class="clean">${itemCarrito.unidades} - ${itemCarrito.nombre}</li>
        <li class="clean">$${itemCarrito.subtotal}</li>
      </ul>
      `
  }
}

let btnComprar = document.getElementById("comprar")
btnComprar.onclick = () => {
  Swal.fire({
    title: '¿Quieres completar tu compra?',
    text: "No será posible volver!",
    icon: 'info',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, finalizar compra!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Complado!',
        'Tu compra ha sido realizada exitosamente.',
        'success'
      )
        .then(() => {
          localStorage.clear()
          carrito.innerHTML = ""
          location.reload()
        })
    }
  })
}










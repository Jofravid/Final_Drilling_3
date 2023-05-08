//FUNCION CONSTRUCTORA PARA LOS PRODUCTOS QUE EL USUARIO INGRESE//
function Producto(nombre,valor,id){
    this.nombre = nombre;
    this.valor = Number(valor);
    this.id = id;
}
let productos = [];
let contadorid =0;
let totalPresupuesto =0;

//FUNCION PARA MOSTRAR EL PRESUPUESTO INGRESADO POR EL USUARIO//
let buttonCalcular = document.getElementById("btn-calcular");
buttonCalcular.addEventListener("click", function(){
    let inputPresupuesto = document.getElementById("presupuesto");
    let presupuesto = inputPresupuesto.value.replace(/\D/g,"").replace(/\B(?=(\d{3})+(?!\d))/g,".");
    totalPresupuesto = inputPresupuesto.value;
    //FUNCION PARA SUMAR PRESUPUESTO//
    document.getElementById("totalPresupuesto").innerHTML = "$ "+(presupuesto);
    inputPresupuesto.value = "";
})

//FUNCION PARA MOSTRAR GASTOS EN LA TABLA//
function actualizarLista() {
    let html ="";
    let totalGastos = 0;
    productos.forEach(producto => {
    totalGastos += producto.valor;
    let cantidadGasto = producto.valor.toString().replace(/\D/g,"").replace(/\B(?=(\d{3})+(?!\d))/g,".");
    html +=`
        <tr>
            <td>${producto.nombre}</td>
            <td>$ ${cantidadGasto}</td>
            <td><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" onclick="eliminar(${producto.id})" class="bi bi-trash3" style="cursor:pointer;" viewBox="0 0 16 16">
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
          </svg></td>
        </tr>
        `;  
    })  
    document.getElementById("listaTotal").innerHTML = html;
    let saldo = totalPresupuesto-totalGastos;
    let saldoString = saldo.toString().replace(/\D/g,"").replace(/\B(?=(\d{3})+(?!\d))/g,".");
    let saldoTotal = saldo >= 0 ? "$ "+saldoString : "-$ "+saldoString;
    //FALTA AGREGAR ALERT PARA INFORMAR TERMINO DE PRESUPUESTO//
    document.getElementById("totalSaldo").innerHTML = saldoTotal;
    document.getElementById("totalGastos").innerHTML = "$ "+ totalGastos.toString().replace(/\D/g,"").replace(/\B(?=(\d{3})+(?!\d))/g,".");
}

//FUNCION PARA AÑADIR A LA TABLA LOS PRODUCTOS QUE INGRESE EL USUARIO//
let buttonGasto = document.getElementById("btn-gasto-cantidad");
buttonGasto.addEventListener("click", function(){
    let inputGasto = document.getElementById("inputGasto");
    let inputCantidad = document.getElementById("inputCantidad");
    let nombreGasto = inputGasto.value;
    let valorcantidadGasto = inputCantidad.value;
    let id = contadorid;
    contadorid +=1;
    let productoAgregado = new Producto(nombreGasto,valorcantidadGasto,id);
    productos.push(productoAgregado);  
    actualizarLista();
    inputGasto.value = "";
    inputCantidad.value = "";
})

//FUNCION PARA ELIMINAR PRODUCTOS DE LA TABLA//
function eliminar(id) {
    let indice = productos.findIndex(producto => {
        return producto.id === id;
    })
    productos.splice(indice,1);
    actualizarLista();
}

window.onload=()=>{

    var contador=1;
    var prueba=1
    intervaloAnimaciones=setInterval(()=>{
        if (contador==6){
            contador=1
        }
        document.querySelector('.carrusel__container_ing:nth-child('+ contador +')').classList.add('movimiento');
        prueba=contador - 1

        contador++;
    },10000);
    setTimeout(eliminar_intervalos,10000);
    function eliminar_intervalos(){
        setInterval(()=>{
            if (prueba==0){
                prueba=5
            }
            hola=document.querySelector('.carrusel__container_ing:nth-child('+ prueba +')').classList.remove('movimiento');
        },10000)
    }

    const {createApp}=Vue;
    createApp({
        data(){
            return{
                arrayProductos:"",
                arrayCategorias:[],
                categoria:"men's clothing",
                rate:"--rating: 2.2",
                cantidad:[],
                cesta:null,
                numerototalProductos:0,
                mostrarDetalles:[0,false],
                mostrarCesta:false,
                mostrarInicio:true,
                mostrarCategoria:false,
                mostrarRecarga:false,
                precioApagar:0,
            }
        },
        methods:{
            productos(categoria){
                this.mostrarDetalles[1]=false
                this.mostrarInicio=false
                this.mostrarCesta=false
                this.mostrarCategoria=false
                this.mostrarRecarga=true;
                fetch('https://fakestoreapi.com/products/category/'+categoria)
                .then(res=>res.json())
                .then(json=>{console.log(json)
                    this.arrayProductos=json;
                    for (let i = 0; i < this.arrayProductos.length; i++) {
                        this.cantidad[i]=1
                    }
                    this.mostrarCategoria=true
                    this.mostrarRecarga=false;
                    console.log(this.cantidad)
                })
            },
            categorias(){
                fetch('https://fakestoreapi.com/products/categories')
                .then(res=>res.json())
                .then(json=>{console.log(json)
                    this.arrayCategorias=json;
                })

            },
            unProducto(id){
                fetch('https://fakestoreapi.com/products/'+id)
            .then(res=>res.json())
            .then(json=>console.log(json))
            },
            calculoCantidadProductos(){
                resultado=0
                this.cesta.forEach(element => {
                    resultado+=element.cantidad
                });
                this.numerototalProductos=resultado
                
            },
            CambiarCategoria(id){
                this.mostrarDetalles[1]=false
                this.mostrarInicio=false
                this.mostrarCesta=false
                this.categoria=this.arrayCategorias[id]
                
            },
            detalles(id,param){
                console.log(param)
                this.rate="--rating: "+param
                if (this.mostrarDetalles[1] && id== this.mostrarDetalles[0]) {
                    this.mostrarDetalles=[id,false]
                }else{
                    this.mostrarDetalles[1]=false;
                    this.mostrarDetalles=[id,true]
                }
                
            },
            sumarOrestar(suma_resta,pos){
                if (suma_resta) {
                    this.cantidad[pos]++;
                }else{
                    if (this.cantidad[pos]>1) {
                        this.cantidad[pos]--;
                    }
                }
            },
            anadirCesta(id,cantidad,precio,title,image){
                existe=false
                console.log(id+" "+cantidad)
                if (this.cesta!=null) {
                    this.cesta.forEach(element => {
                        if (element.id==id) {
                            existe=true
                            for (let i = 0; i < cantidad; i++) {
                                element.cantidad++;
                            }
                        }
                    });
                }else{
                    this.cesta=[]
                }
                if (!existe) {
                    this.cesta.push({
                        "id":id,
                        "cantidad":cantidad,
                        "precio":precio,
                        "title":title,
                        "image":image
                    });
                }
                console.log("cesta")
                console.log(this.cesta)
            },
            eliminarProductoCesta(id){
                console.log("hola")
                for (let i = 0; i < this.cesta.length; i++) {
                    if (this.cesta[i].id==id) {
                        this.cesta.splice(i,1)
                        console.log("Cesta Modificada")
                        console.log(this.cesta)
                    }
                }
                
                
            },
            verCesta(){
                this.mostrarDetalles[1]=false
                this.mostrarInicio=false
                this.mostrarCesta=true
                this.mostrarCategoria=false
                
            },
            verInicio(){
                this.mostrarDetalles[1]=false
                this.mostrarInicio=true
                this.mostrarCesta=false
                this.mostrarCategoria=false
                
            },
            calcularCesta(){
                this.precioApagar=0;
                this.cesta.forEach(element => {
                    for (let i = 0; i < element.cantidad; i++) {
                        this.precioApagar+=element.precio
                    }
                });
                return this.precioApagar;
            },
            sumarOrestarCesta(id,operacion){
                for (let i = 0; i < this.cesta.length; i++) {
                    element=this.cesta[i]
                    if (element.id==id) {
                        if (operacion) {
                            element.cantidad++;
                        }else{
                            element.cantidad--;
                            if (element.cantidad==0) {
                                this.cesta.splice(i,1)
                            }
                        }
                    }
                }
                this.cesta.forEach(element => {
                    
                });
                
            },
            mostrar(){
                console.log(this.arrayProductos)
            }
        },
        computed:{
            
        },
        mounted(){
            this.categorias();
        }
    }).mount('#app')
}
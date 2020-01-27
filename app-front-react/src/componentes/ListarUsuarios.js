import React, { Component, useDebugValue } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import EditarUsuario from "./EditarUsuario";


class ListarUsuarios extends /*React.*/ Component{
    // equivalente al ngOnInit

    constructor(props){
        super(props) 


        this.botonEliminar = this.botonEliminar.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount(){
        this.setState (null);
        let promesaHTTP = window.fetch(`http://127.0.0.1:4000/api/usuarios/`)
        promesaHTTP.then((resHTTP)=>{    
            let promesaJSON = resHTTP.json()
            promesaJSON.then((objColeccionUsu)=>{
                console.log(JSON.stringify(objColeccionUsu))
                // Cuando por fin recibimos la colección y ha sido convertida en JSON
                this.setState({
                    listaUsuarios: objColeccionUsu
                })
            })
        })
    }

    componentWillUnmount(){
        // Aquí se ejectua cuando se desmonte el componente
    }


    botonEliminar(evt) {
        let usuId = evt.target.dataset.id
        console.log(usuId);

        fetch(`http://127.0.0.1:4000/api/usuarios/${usuId}`, {
            method: 'delete',

        }).then((res) => {
            res.json().then((obj) => {
                if(obj.mensaje === 'OK'){
                    alert('El usuario se ha borrado con éxito')
                    this.componentDidMount();
            } else {
                alert('No se ha podido borrar el usuario')
            }
            })
        })
      }



    // Si this.state no existe, mostramos "Cargando..."
    render(){
        let clickEliminar = this.botonEliminar
        let objViDomJSX;
        if(this.state === null){
            objViDomJSX = (<p>Cargando...</p>)
        } else{
              
            let filasTr = this.state.listaUsuarios.map((usu)=>{
                
                let opcionEditar = <div>
                <h2>Modificar datos</h2>
                <form onSubmit={ this.botonEditar }>
                    <div>
                        <label>Nombre: </label>
                        <input type="text" placeholder="" 
                                value={ this.state.nombre } 
                                onChange={ this.onChangeNombre }/>
                    </div>
                    <div>
                        <label>Email: </label>
                        <input type="email" placeholder="" 
                                value={ this.state.email } 
                                onChange={ this.onChangeEmail }/>
                    </div>
                    <div>
                        <label>Edad: </label>
                        <input type="text" placeholder="3" 
                                value={ this.state.edad }
                                onChange={ this.onChangeEdad }/>
                    </div>
                    <div>
                        <input type="submit" value="Enviar"/>
                    </div>
                </form>
            </div>
                
                let botonEditar = function handleClick(e) {
                    e.preventDefault();
                    console.log(usu._id);
                    fetch('http://127.0.0.1:4000/api/usuarios/', {
                        method: 'put',
                        body: JSON.stringify({
                            "nombre": usu.nombre,
                            "email": usu.email,
                            "edad": usu.edad
                        }),
                        headers:{
                            'Content-Type': 'application/json'
                        }
                    }).then((res)=> alert('Bien modificado')).catch((vacas)=> "MAL MAL MAL MAL MAL")
                  }
                
                return( <tr key={ usu._id }>
                            <td>{usu.nombre}</td>
                            <td>{usu.email}</td>
                            <td>{ usu.edad }</td>
                            {/*<td>{usu.password}</td>*/}
                            {/*<td>{botonEditar}</td>*/}
                            <td><button onClick={botonEditar} data-id={usu._id}>Edit</button>
                                <button onClick= {clickEliminar} data-id= {usu._id}>Borrar</button>
                            </td>
                        </tr>)
            })

            objViDomJSX = (
                <div>
                    <h2>Lista de usuarios</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Edad</th>
                                {/*<th>Password</th>*/}
                            </tr>
                        </thead>
                        <tbody>
                            {filasTr}
                        </tbody>
                    </table>
                </div>
            )
        }
    
        return objViDomJSX
    }
}
export default ListarUsuarios;
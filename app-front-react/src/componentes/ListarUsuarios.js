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
                if(obj.mensaje === 'Usuario ELIMINADO'){
                    console.log('El usuario se ha borrado con éxito')
                    this.componentDidMount();
            } else {
                alert('No se ha podido borrar el usuario')
            }
            })
        })
      }



    // Si this.state no existe, mostramos "Cargando..."
    render(){
        let objViDomJSX;
        if(this.state === null){
            objViDomJSX = (<p>Cargando...</p>)
        } else{
              
            let filasTr = this.state.listaUsuarios.map((usu)=>{
                
                return( <tr key={ usu._id }>
                            <td>{usu.nombre}</td>
                            <td>{usu.email}</td>
                            <td>{ usu.edad }</td>
                            {/*<td>{usu.password}</td>*/}
                            {/*<td>{botonEditar}</td>*/}
                            <td><Link to={`/editar/${usu._id}`}>
                                <button>Edit</button>
                                </Link>
                                <button onClick= {this.botonEliminar} data-id= {usu._id}>Borrar</button>
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
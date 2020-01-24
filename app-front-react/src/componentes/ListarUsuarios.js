import React, { Component } from 'react'

class ListarUsuarios extends /*React.*/ Component{
    // equivalente al ngOnInit
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
                            <td>{usu.password}</td>
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
                                <th>Password</th>
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
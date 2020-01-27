import React from 'react'

class EditarUsuario extends React.Component{
    constructor(props){
        super(props) 
        this.state = {
            nombre: '',
            email: '',
            edad: ''
        }
        this.onChangeNombre = this.onChangeNombre.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangeEdad = this.onChangeEdad.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    
    onChangeNombre(evt){
        this.setState({
            nombre: evt.target.value
        })
    }
    onChangeEdad(evt){
        this.setState({
            edad: evt.target.value
        })
    }
    onChangeEmail(evt){
        this.setState({
            email: evt.target.value
        })
    }
    onChangePassword(evt){
        this.setState({
            password: evt.target.value
        })
    }
    onSubmit(evt){
        evt.preventDefault();

        // invocaríamos al servicio cliente HTTP, Ajax, fetch...
        console.log(`Datos: ${ this.state.nombre }, ${this.state.email}, ${this.state.password}, ${this.state.edad}`);
        window.fetch('http://127.0.0.1:4000/api/usuarios/editar', {
            method: 'put',
            body: JSON.stringify({
                "nombre": this.state.nombre,
                "email": this.state.email,
                "edad": this.state.edad
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then((res)=> alert("Bien modificado")).catch((vacas)=> "MAL MAL MAL MAL MAL")
    }
    render(){
        return(
            <div>
                <h2>Modificar datos</h2>
                <form onSubmit={ this.onSubmit }>
                    <div>
                        <label>Nombre: </label>
                        <input type="text" placeholder="Gilberto" 
                                value={ this.state.nombre } 
                                onChange={ this.onChangeNombre }/>
                    </div>
                    <div>
                        <label>Email: </label>
                        <input type="email" placeholder="ejemplo@gmail.com" 
                                value={ this.state.email } 
                                onChange={ this.onChangeEmail }/>
                    </div>

                    <div>
                        <label>Edad: </label>
                        <input type="text" placeholder="33" 
                                value={ this.state.edad }
                                onChange={ this.onChangeEdad }/>
                    </div>
                    <div>
                        <input type="submit" value="Enviar"/>
                    </div>
                </form>
            </div>
        )}
}
export default EditarUsuario
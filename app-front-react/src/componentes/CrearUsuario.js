import React, { Component } from 'react'

class CrearUsuario extends /*React.*/ Component{
    // this.props es objeto con datos públicos de REACT
    // this.state es objeto con datos privados: el estado interno del componente de REACT
    // Como en Angular, las variables miembro de la clase privada
    constructor(props){
        super(props) // Invocamos al constructor del padre pasándole las propiedades públicas

        // para evitar el problema del this con el JS
        // Con bind() hacemos que, cuando se invoque el método, this sea realmente this:
        // el objeto instanciado basado en la clase

        this.state = {
            nombre: 'Pepe Guardiola',
            email: 'aaa@aa.com',
            password: 'hola'
        }
        this.onChangeNombre = this.onChangeNombre.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    
    // Método invocado por React cada vez que se cambia el valor del <input>
    // Se envía un objeto con la información del evento
    onChangeNombre(evt){
        this.setState({
            nombre: evt.target.value
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
        console.log(`Datos: ${ this.state.nombre }, ${this.state.email}, ${this.state.password}`);
        window.fetch('http://127.0.0.1:4000/api/usuarios/registro', {
            method: 'post',
            body: JSON.stringify({
                "nombre": this.state.nombre,
                "email": this.state.email,
                "password": this.state.password
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then((res)=> alert("Pues habrá ido chachipirulichi")).catch((vacas)=> "MAL MAL MAL MAL MAL")
    }
    render(){
        return(
            <div>
                <h2>Formulario crear usuario</h2>
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
                        <label>Password: </label>
                        <input type="password" placeholder="l3tr4s y números" 
                                value={ this.state.password }
                                onChange={ this.onChangePassword }/>
                    </div>
                    <div>
                        <input type="submit" value="Enviar"/>
                    </div>
                </form>
            </div>
        )
    }
}
export default CrearUsuario;
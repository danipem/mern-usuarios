import React from 'react'

class EditarUsuario extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nombre: '',
            email: '',
            password: '',
            edad: ''
        }
        this.onChangeNombre = this.onChangeNombre.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangeEdad = this.onChangeEdad.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onEdit = this.onEdit.bind(this)
        this.usuarioEdit = this.usuarioEdit.bind(this)

    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.usuarioEdit(id);
    }

    onChangeNombre(evt) {
        this.setState({
            nombre: evt.target.value
        })
    }
    onChangeEdad(evt) {
        this.setState({
            edad: evt.target.value
        })
    }
    onChangeEmail(evt) {
        this.setState({
            email: evt.target.value
        })
    }
    onChangePassword(evt) {
        this.setState({
            password: evt.target.value
        })
    }

    usuarioEdit(id) {

        window.fetch(`http://localhost:4000/api/usuarios/${id}`).then((res) => {
            res.json().then((obj) => {
                this.setState({
                    nombre: obj.nombre,
                    email: obj.email,
                    password: obj.password,
                    edad: obj.edad,
                    id: obj._id
                })
            })
        }).then((res => res))
    }

    onEdit(evt) {
        let id = evt.target.dataset.id

        window.fetch(`http://127.0.0.1:4000/api/usuarios/editar/${id}`, {
            method: 'put',
            body: JSON.stringify({
                nombre: this.state.nombre,
                email: this.state.email,
                edad: this.state.edad
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            res.json().then((obj) => { 
                if(obj.mensaje === "FUE EDITADO"){
                    alert('El usuario se ha modificado con éxito')
                   window.location.href = "http://localhost:3000/"
            } else {
                alert('No se ha podido modificar el usuario')
            }
            })
        })
    }


    render() {
        return (
            <div>
                <h2>Modificar datos</h2>
                <form onSubmit={this.onEdit} data-id={this.state.id}>
                    <div>
                        <label>Nombre: </label>
                        <input type="text" placeholder=""
                            value={this.state.nombre}
                            onChange={this.onChangeNombre} />
                    </div>
                    <div>
                        <label>Email: </label>
                        <input type="email" placeholder=""
                            value={this.state.email}
                            onChange={this.onChangeEmail} />
                    </div>

                    <div>
                        <label>Edad: </label>
                        <input type="text" placeholder=""
                            value={this.state.edad}
                            onChange={this.onChangeEdad} />
                    </div>
                    <div>
                        <input type="submit" value="Enviar" />
                    </div>
                </form>
            </div>
        )
    }
}
export default EditarUsuario
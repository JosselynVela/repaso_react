import React,{Component} from "react";
import axios from 'axios';

export default class Task extends Component{
    //estados para usar en las funciones
    state={
        input:'',
        name: '',
        description:'',
        relation:''
    }
    //funciones para realizar las acciones
    darClic=(evento)=>{
        evento.preventDefault();
        //console.log(evento.target.value);
        axios.delete('http://127.0.0.1:8000/api/tasks/'+evento.target.value).then(
            respuesta=>(console.log(respuesta))
        )
    }
    detectarCambios=(evento)=>{
        evento.preventDefault();
        this.setState(
            {
                [evento.target.name]:evento.target.value
            }
        )
    }

    crearTarea=(e)=>{
        e.preventDefault();
        //crear objeto que se va a generar
        const tarea ={
            name: this.state.name,
            description: this.state.description,
            relaciontask: "/api/users/"+this.state.relation
        }
        //funcion para crear el objeto
        axios.post('http://127.0.0.1:8000/api/tasks',tarea).then(
            respuesta=>{console.log(respuesta)}
        )
    }

//
    render(){
        //console.log(this.props.tarea)
        return <div>

            <h3>LISTA DE TAREAS</h3>
            {
                this.props.tarea.map(tarea=><p key={tarea.id}>
                    {tarea.name+" "}
                    {tarea.description}

                    <button value={tarea.id} onClick={this.darClic }>Borrar tareas</button>
                </p>)
            }


            <h3> Crear tareas</h3>

            <form onSubmit={this.crearTarea}>

                Name:
                <input
                    onChange={this.detectarCambios}
                            type="text"
                            name="name"
                            value={this.state.name}
                /><br/>

                description:
                <input
                    onChange={this.detectarCambios}
                    type="text"
                    name="description"
                    value={this.state.description}
                /><br/>

                Relation:
                <input
                    onChange={this.detectarCambios}
                    type="text"
                    name="relation"
                    value={this.state.relation}
                /><br/>


                <button> Enviar </button>

            </form>

        </div>
    }

}
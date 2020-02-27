import React,{Component} from 'react';
import './App.css';
import axios from 'axios';
import Usuario from "./Componentes/Usuario";
import Task from "./Componentes/Task";


class App extends Component{

    state={
        usuarios:[],
        tareas:[]
    }


    //Funcion para llamar mi api
    async componentDidMount() {
        //llamar a url de la base
        const respuesta = await axios.get('http://127.0.0.1:8000/api/users');
        const datausuario = respuesta['data'];
        this.setState({usuarios:datausuario['hydra:member']})


        //llamar tareas
        const llamartarea = await  axios.get('http://localhost:8000/api/tasks');
        const  datatarea = llamartarea['data'];
        this.setState({tareas:datatarea['hydra:member']})

        //mostrar en consola loque me envian
        //console.log(respuesta)
        //console.log(datausuario)
        //console.log(this.state.tareas)

    }



    render (){
        //console.log(this.state.usuarios);
    return (
        <div className="App">

            <Usuario usuario={this.state.usuarios}/>
            <Task  tarea={this.state.tareas}/>


        </div>
    );
  }

}

export default App;

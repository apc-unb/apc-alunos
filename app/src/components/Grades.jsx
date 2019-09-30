import React, { Component } from 'react';
// Grades component renders Grades list.
// TODO: Link each grade to a submission page, so students can review their submission
class Grades extends React.Component {
    constructor(props){
        super(props);
        try{
            this.state = {
                provas: props.exams,
                trabs: props.projects,
                listas: props.lists
            }
        } catch (error) {
            console.log("Error parsing grades:", error);
            this.state = {
                parseerror: true
            }
        }
    }

    render() {
        if(this.state.parseerror !== true){
            let prova_items = null;
            let trab_items = null;
            let list_items = null;
            if(this.state.provas){
                prova_items = this.state.provas.map((g, idx) => {
                    return (
                        <li key={idx} className="list-group-item">
                        <span className="list-item">Prova {idx+1} </span>{g}
                        </li>
                    )
                });
            }
            if(this.state.trabs){
                trab_items = this.state.trabs.map((g, idx) => {
                    return (
                        <li key={idx} className="list-group-item">
                    <span className="list-item">Trabalho (parte {idx+1}) </span>{g}
                        </li>
                    )
                });
            }
            if(this.state.listas){
                list_items = this.state.listas.map((g, idx) => {
                    return (
                        <li key={idx} className="list-group-item">
                    <span className="list-item">Lista {idx+1}</span>{g}
                        </li>
                    )
                });
            }
            return (
                // Cria card com as informações corretas
                <div className="panel panel-default panel-blue">
                    <h4 className="panel-header">
                        Notas
                    </h4>
                    {prova_items || trab_items || list_items ?
                        <ul className="list-group">
                            {prova_items ? prova_items : ''}
                            {list_items ? list_items : ''}
                            {trab_items ? trab_items : ''}
                        </ul> :
                        <p>Nenhuma nota ainda...</p>
                    }
                </div>
            )
        } else {
            // Cria um card que indica que algo de errado aconteceu
            <div className="panel panel-default panel-blue">
                    <h4 className="panel-header">Notas</h4>
                <div className="container">
                    <div className="alert alert-danger">
                        <p>Ooops! Algo deu errado.</p>
                    </div>
                </div>
            </div>
        }
    }
}

export default Grades;
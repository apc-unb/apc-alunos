import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import Header from './components/Header.js';
import {Progress} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';

const FilePicker = (props) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [loaded, setLoaded] = useState(0);
    const [envio, setEnvio] = useState("");

    const onChangeHandler = (event) => {
        if(checkMimeType(event.target.files[0]) && checkFileSize(event.target.files[0])){
            setSelectedFile(event.target.files[0]);
        } else {
            event.target.value = null;
        }
    }

    const checkMimeType = (file) => {
        //define message container
        let err = '';
        // list allow mime type
        const types = ['application/x-compressed', 'application/x-gzip', 'application/zip']
        // compare file type find doesn't matach
        if (types.every(type => file.type !== type)) {
            // create error message and assign to container   
            err = file.type + ' is not a supported format';
        };
        
        if (err !== '') {
            toast.error(err);
            return false; 
        }
        return true;
    }

    const checkFileSize = (file) => {
        let maxSize = 3145728; // 3MiB 
        let err = '';
        if (file.size > maxSize) {
            err = file.name + 'is too large, please pick a smaller file';
        }
        if (err !== '') {
            toast.error(err);
            return false;
        }
        return true;
    }

    const onClickHandler = (event) => {
        // Cria o formulario com todas as infos do aluno
        // E o trabalho
        if(selectedFile === null){
            toast.error("Selecione um arquivo para enviar.");
            return;
        }
        const data = new FormData();
        const connInfo = JSON.parse(sessionStorage.connInfo);
        data.append('studentID', connInfo.student.ID);
        data.append('studentName', (connInfo.student.firstname + " " + connInfo.student.lastname));
        data.append('file', selectedFile);
        data.append('envio', envio);
        // Envia o formulario
        axios.post('/envioDeTrabalho', data, {
            onUploadProgress: ProgressEvent => setLoaded((ProgressEvent.loaded / ProgressEvent.total)*100),
        }).then( res => {
            toast.success('Trabalho recebido com sucesso :D');
        }).catch( err => {
            toast.error('Ocorreu um erro: ' + err.message);
        });
    }

    return (
        <form method="post" action="#" id="#">
            <div>
                <ToastContainer />
            </div>
            <div className="form-group files">
            <label>Envie seu trabalho</label>
            <input
                type="file"
                className="form-control"
                multiple=""
                onChange={(event) => onChangeHandler(event)}
            />
            <Progress
                max="100"
                color="success"
                value={loaded}>
            {Math.round(loaded,2)}%
            </Progress>

            <button
                type="button"
                className="btn btn-success btn-block"
                onClick={(event) => onClickHandler(event)}
                disabled={selectedFile === null}
            >Enviar</button>
            </div>
        </form>
    );
};

// Header bar
ReactDOM.render(<Header/>, document.getElementById('header-bar'));
// Verifies if page can be leaded
if(!sessionStorage.connInfo){
    console.log("Error: you are not logged in.");
    let nogo = document.createElement('div');
    nogo.classList.add("alert", "alert-danger");
    nogo.innerHTML = '<p><strong>Atenção!</strong>&nbsp;Você deve fazer o <a href="alunos.html" class="alert-link">login</a> para ver as provas da sua turma.</p>';
    document.getElementById('page-root').appendChild(nogo);
} else {
    ReactDOM.render(<FilePicker/>, document.getElementById('page-root'));
}

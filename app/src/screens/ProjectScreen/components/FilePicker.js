import React, {useState, useRef} from 'react';
import ReactDOM from 'react-dom';

import {Progress} from 'reactstrap';
import ProjectReceivedModal from './ProjectModal';

import Cookies from 'universal-cookie';
const cookies = new Cookies();
const jwt = cookies.get('jwt');
import axios from 'axios';

export default function FilePicker(props) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [loaded, setLoaded] = useState(0);
    const input = useRef(null);

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
            alert(err);
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
            alert(err);
            return false;
        }
        return true;
    }

    const onClickHandler = (event) => {
        event.preventDefault();
        // Cria o formulario com todas as infos do aluno
        // E o trabalho
        if(selectedFile === null){
            alert("Selecione um arquivo para enviar.");
            return;
        }
        const data = new FormData();
        data.append('StudentID', props.StudentID);
        data.append('studentName', props.studentName);
        data.append('file', selectedFile);
        data.append('ProjectTypeID', props.ProjectTypeID);
        data.append('ClassID', props.ClassID);
        data.append('monitorName', props.monitorName);
        data.append('monitorEmail', props.monitorEmail);
        data.append('resend', props.askResend)
        data.append('auth', jwt);
        data.append('projectID', props.projectID);

        if(!props.askResend || confirm("Quer mesmo fazer um novo envio do trabalho?\n\nO anterior não será mais considerado"))
        // Envia o formulario
        axios.post('/envioDeTrabalho', data, {
            onUploadProgress: ProgressEvent => setLoaded((ProgressEvent.loaded / ProgressEvent.total)*100),
        }).then( res => {
            alert("Trabalho enviado com sucesso");
            setSelectedFile(null);
            input.current.value = null;
        }).catch( err => {
            alert('Ocorreu um erro: ' + err.message);
            setLoaded(0);
        });
    }

    return (
        <form method="post" action="#" id="#">
            <div className="form-group files">
            <label>Envie seu trabalho</label>
            <input
                ref={input}
                type="file"
                className="form-control"
                onChange={(event) => onChangeHandler(event)}
            />

            {
                loaded < 100 
                ?
                <Progress
                    max="100"
                    color="success"
                    value={loaded}
                    animated
                    bar
                >
                {Math.round(loaded,2)}%
                </Progress>
                :
                <Progress
                    max="100"
                    value="100"
                    color="success"
                    bar
                >
                    Upload Completed :D
                </Progress>
            }

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
import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import {Progress} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import ProjectReceivedModal from './ProjectModal';

import axios from 'axios';

export default function FilePicker(props) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [loaded, setLoaded] = useState(0);

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
        data.append('StudentID', props.StudentID);
        data.append('studentName', props.studentName);
        data.append('file', selectedFile);
        data.append('ProjectTypeID', props.ProjectTypeID);
        data.append('ClassID', props.ClassID);
        // Envia o formulario
        axios.post('/envioDeTrabalho', data, {
            onUploadProgress: ProgressEvent => setLoaded((ProgressEvent.loaded / ProgressEvent.total)*100),
        }).then( res => {
            ReactDOM.render(<ProjectReceivedModal/>, document.getElementById("submissionModalRoot"));
        }).catch( err => {
            toast.error('Ocorreu um erro: ' + err.message);
            setLoaded(0);
        });
    }

    return (
        <form method="post" action="#" id="#">
            <ProjectReceivedModal/>
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
import React from 'react';

const moment = require('moment');

export default function Submission(props) {

    return (
        <div>
            <p>Data de envio: {moment(props.createdat).format("dddd, DD/MM/YYYY, hh:mm:ss")} </p>
            <p>Arquivo: {props.filename}</p>
            <p>Status: {props.status}</p>
        </div>
    );
}
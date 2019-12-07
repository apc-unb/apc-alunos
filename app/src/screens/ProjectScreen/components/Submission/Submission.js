import React from 'react';
const moment = require('moment');

export default function Submission(props) {

    return (
        <tr key={props.createdat}>
            <td>
                {moment(props.createdat).format("LLLL")}
            </td>
            <td>{props.filename}</td>
            <td>{props.status}</td>
        </tr>
    )
}
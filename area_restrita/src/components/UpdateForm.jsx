import React, { Component } from 'react';

function UpdateForm(props) {
    const fieldValues = Object.values(props.fields);
    const fields = fieldValues.map((f, idx) => {
        return (
        <div className="form-group" key={idx}>
            <label className="control-label col-sm-4" htmlFor={f.id}>{f.label}</label>
            <div className="col-sm-6">
            <input type={f.type} className="form-control" id={f.id} placeholder={f.placeholder} title={f.title}/>
            </div>
        </div>
        );
    });
    return (
        <div id={props.element_id} className="modal fade" role="dialog">
        <div className="modal-dialog">
    
            <div className="modal-content">
            <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">{props.title}</h4>
            </div>
            <div className="modal-body">
                <div className="form-horizontal">
                    {fields}
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                        <button 
                            className="btn btn-default btn-blue"
                            onClick={props.onClick}>
                            Submit
                        </button>
                        </div>
                    </div>
                </div> 
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-default btn-blue" data-dismiss="modal">Close</button>
            </div>
            </div>
    
        </div>
        </div> 
    );
};

export default UpdateForm;
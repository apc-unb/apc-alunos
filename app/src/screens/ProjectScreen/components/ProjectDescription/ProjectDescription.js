import React from 'react'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import PropTypes from 'prop-types';

import Markdown from 'react-markdown';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    descriptionText: {
        fontSize: '14px'
    },
    descriptionTitle: {
        fontSize: '18px',
        fontWeight: 700
    }
})

const ProjectDescription = ({projectName, projectDescription, open, onClose}) => {
    const classes = useStyles();

    return (
        <Dialog
            onClose={onClose}
            aria-labelledby="project-description"
            open={open}
            maxWidth="xl"
        >
            <DialogTitle id="project-description" classes={{root: classes.descriptionTitle}} disableTypography={true}>
                {projectName}
            </DialogTitle>
            <DialogContent>
                <DialogContentText classes={{root: classes.descriptionText}}>
                    <Markdown source={projectDescription.replace(/\\n/gi, '\n')} />
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
};

ProjectDescription.propTypes = {
    projectName: PropTypes.string,
    projectDescription: PropTypes.string.isRequired,
    open: PropTypes.bool,
    onClose: PropTypes.func.isRequired
};

export default ProjectDescription;
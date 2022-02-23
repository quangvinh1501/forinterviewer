import React,{useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Modal, Button} from 'react-bootstrap';

const Confirm = props => {
const [isOpened,setIsOpened] = useState(props.visible);
useEffect(()=>{

},[isOpened])
   const onButtonClick = () => {
        if (!isOpened) {
            setIsOpened(true);
        }
    }

    const onClose = (event) => {
        if (event) {
            event.stopPropagation();
        }
        setIsOpened(false);

        if (typeof props.onClose === 'function') {
            props.onClose();
        }
    }

    const onConfirm = (event) => {
        event.stopPropagation();
        setIsOpened(true);
        props.onConfirm();
    }


        var cancelButton = props.showCancelButton ? (
            <Button bsstyle="default" onClick={onClose}>
                {props.cancelText}
            </Button>
        ) : null;
        var modal = (
            <Modal show={isOpened} onHide={onClose}
                   className={props.className} dialogClassName={props.dialogClassName}
                   keyboard={props.keyboard} backdrop={props.backdrop}
                   enforceFocus={props.enforceFocus}
                >
                <Modal.Header>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.body}</Modal.Body>
                <Modal.Footer>
                    {cancelButton}
                    <Button className='btn btn-danger' onClick={onConfirm}>
                        {props.confirmText}
                    </Button>
                </Modal.Footer>
            </Modal>
        );
        var content;
        if (props.children) {
            var btn = React.Children.only(props.children);
            content = React.cloneElement(
                btn,
                {
                    onClick: onButtonClick,
                    style: props.style
                },
                btn.props.children,
                modal
            );
        } else {
            content = (
                <Button onClick={onButtonClick} style={props.style}>
                    {props.buttonText}
                    {modal}
                </Button>
            );
        }
        return content;
    }

Confirm.propTypes = {
    body: PropTypes.node.isRequired,
    buttonText: PropTypes.node,
    cancelText: PropTypes.node,
    className: PropTypes.string,
    confirmbsstyle: PropTypes.string,
    confirmText: PropTypes.node,
    dialogClassName: PropTypes.string,
    keyboard: PropTypes.bool,
    backdrop: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    enforceFocus: PropTypes.bool,
    onConfirm: PropTypes.func.isRequired,
    onClose: PropTypes.func,
    showCancelButton: PropTypes.bool.isRequired,
    title: PropTypes.node.isRequired,
    visible: PropTypes.bool
};

Confirm.defaultProps = {
    cancelText: 'Cancel',
    confirmText: 'Confirm',
    confirmbsstyle: 'danger',
    showCancelButton: true
};

export { Confirm };
export default Confirm;

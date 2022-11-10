import React, {useState} from 'react';
import { useNavigate } from 'react-router';
import LoginForm from './LoginForm';
import { Modal, Button } from 'react-daisyui';
import ErrorAlert from './ErrorAlert';

function LoginModal({ open, toggle }){

    const [errors, setErrors] = useState('');

    function toggleErrors(content){
        setErrors(content);
    }

    return (
        <Modal open={open}>
            <Button
                size="sm"
                shape="circle"
                className="absolute right-2 top-2"
                onClick={toggle}
            >
                ✕
            </Button>
            <Modal.Header className="font-bold">
                Jump right back into the pages! &#128214;
            </Modal.Header>

            <Modal.Body>
                Your books are waiting for you. Let's get reading! &#128522;
                {errors && errors.length && errors.length > 0 ? 
                                    <ErrorAlert errors={errors} />
                                    // <p className="py-4" style={{color:"red"}}>{errors}</p>
                                :
                                null}
                <LoginForm handleError={toggleErrors}/>
            </Modal.Body>
        </Modal>
    );
}

export default LoginModal;
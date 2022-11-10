import React, {useState} from 'react';
import { useNavigate } from 'react-router';
import SignupForm from './SignupForm';
import SignupFormNavBar from './SignupFormNavBar';
import { Modal, Button } from 'react-daisyui';
import ErrorAlert from './ErrorAlert';

function SignupModalNavBar({ open, toggle }) {

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
                &#128218; Start your reading journey with us today!
            </Modal.Header>
            <Modal.Body>
                Join BOOCO and enter a community full of fellow readers with a wide range of books to choose from.
                {errors && errors.length && errors.length > 0 ? 
                                    <ErrorAlert errors={errors}/>
                                    // <p className="py-4" style={{color:"red"}}>{errors}</p>
                                :
                                null}
                <SignupFormNavBar handleError={toggleErrors}/>
            </Modal.Body>
        </Modal>
    );
}

export default SignupModalNavBar;
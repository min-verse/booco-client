import React, { useState } from 'react';
import SignupForm from './SignupForm';
import { Modal, Button } from 'react-daisyui';
import ErrorAlert from '../../ErrorAlert';

function SignupModal({ open, toggle }) {

    const [errors, setErrors] = useState('');

    function toggleErrors(content) {
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
                    <ErrorAlert errors={errors} />
                    :
                    null}
                <SignupForm handleError={toggleErrors} />
            </Modal.Body>
        </Modal>
    );
}

export default SignupModal;
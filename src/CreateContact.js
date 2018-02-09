import React from 'react'
import {Link} from "react-router-dom"
import ImageInput from "./ImageInput"
import serializeForm from 'form-serialize'

import reframe from './reframe-hack'

const CreateContactUi = reframe.ui('CreateContact', (props) => {

    const _handleSubmit = (e) => {
        e.preventDefault();
        const values = serializeForm(e.target, {hash: true})

        reframe.dispatch(['contacts/create', values])
        // TODO try with event handler
        props.history.push('/')
    }

    return (
        <div>
            <Link className='close-create-contact' to='/'>Close</Link>
            <form className='create-contact-form' onSubmit={(event) => _handleSubmit(event)}>
                <ImageInput
                    className='create-contact-avatar-input'
                    name='avatarURL'
                    maxHeight={64}
                />
                <div className='create-contact-details'>
                    <input type="text" name='name' placeholder='Name'/>
                    <input type="text" name='email' placeholder='Email'/>
                    <button>Add contact</button>
                </div>
            </form>
        </div>
    )
});

export default CreateContactUi
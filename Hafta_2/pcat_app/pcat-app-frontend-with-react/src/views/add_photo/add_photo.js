import React, { useState } from 'react';
import { history } from '../../history';
import postPhoto from '../../services/post_photo';
import './add_photo.css';
class AddPhoto extends React.Component {
    state = {
        title: "",
        description: "",

    }
    render() {
        const uploadImage = (image) => {
            let data = new FormData()
            data.append("title", this.state.title)
            data.append("description", this.state.description)
            data.append("image", image, image.name)
            postPhoto(data).then(() => history.push('/'));
        }
        return (
            <div>
                <div className='my_inputs'>
                    <input type="text" placeholder='title' onChange={(e) => this.setState({ title: e.target.value })} />
                    <input type="text" placeholder='description' onChange={(e) => this.setState({ description: e.target.value })} />
                    <button onClick={() => this.inputElement.click()}>Add Photo</button>
                    <button onClick={() => history.push('/')}>Go back</button>
                </div>

                <input ref={input => this.inputElement = input} type="file" name="newsImage" id="exampleFile" style={{ opacity: "inherit", position: "inherit", display: "none" }}
                    onChange={(e) => {
                        uploadImage(e.target.files[0]);
                    }}
                />
            </div>
        );
    }
}

export default AddPhoto;
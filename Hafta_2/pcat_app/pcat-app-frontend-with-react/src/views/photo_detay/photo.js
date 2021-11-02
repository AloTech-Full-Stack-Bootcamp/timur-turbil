import React from 'react';
import { publicUrl } from '../../helpers/url';
import { history } from '../../history';
import updatePhoto from '../../services/update_photo';

class Photo extends React.Component {

    state = {
        title: this.props.location.state.title,
        description: this.props.location.state.description,
        image: this.props.location.state.image

    }
    render() {
        const updateImage = (image, id) => {
            let data = new FormData()
            data.append("title", this.state.title)
            data.append("description", this.state.description)
            data.append("image", image, image.name)
            updatePhoto(data, id).then(() => history.push('/'));
        }
        return (
            <div>
                <div className='my_inputs'>
                    <div className="myContainer" >
                        <input type="text" placeholder='title' value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} />
                        <input type="text" placeholder='description' value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })} />
                        <img style={{ width: '300px', height: '300px' }} src={publicUrl + this.state.image} alt="" />
                    </div>
                    <button onClick={() => this.inputElement.click()}>Add Photo and Update</button>
                    <button onClick={() => history.push('/')}>Go back</button>
                </div>

                <input ref={input => this.inputElement = input} type="file" name="newsImage" id="exampleFile" style={{ opacity: "inherit", position: "inherit", display: "none" }}
                    onChange={(e) => {
                        updateImage(e.target.files[0], this.props.location.state._id);
                    }}
                />
            </div>
        );
    }
}

export default Photo;
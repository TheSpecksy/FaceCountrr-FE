import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
    return (
        <div>
            <h1 className='f1 '>CountTheFaces</h1> 
            <p className='f3'>
                {'This prototype will save your time by counting number of people in a group photo. '}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-4'>
                    <input 
                        className='f4 pa2 w-70 grey center' type='tex' placeholder='Copy and paste the image url' onChange={onInputChange}/>
                        <button className='w-30 grow f4 link ph3 pv2 dib drak-green b bg-washed-yellow'
                            onClick={onPictureSubmit}
                            >Detect </button>
                </div>
            </div>
        </div>
    );
}
export default ImageLinkForm;
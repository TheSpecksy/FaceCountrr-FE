import React from 'react';

const FacesDetected = ( {numFaces} ) => {
    return (
        <div className='pa3 dark-green b f3'>
            {`Number of Faces Detected: `}
            <div className='dark-green b pa3 f1'>
            {numFaces}
            </div>
        </div>
    );
}
export default FacesDetected;
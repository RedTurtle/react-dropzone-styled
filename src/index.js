import React from 'react';
import Dropzone from 'react-dropzone';
import './styles.css';
import MdCloudUpload from 'react-icons/lib/md/cloud-upload';

const DropzoneStyled = ({ className = '', children, ...otherProps }) => (
  <Dropzone className={`react-dropzone-styled ${className}`} {...otherProps}>
    {children || (
      <div className="dropzone-content">
        <span className="icon-line">
          <MdCloudUpload />
        </span>
        <p className="main-line">Drag&amp;Drop files here</p>
        <p className="or-line">or</p>
        <p>
          <button type="button" className="browse-button">
            Browse files
          </button>
        </p>
      </div>
    )}
  </Dropzone>
);

DropzoneStyled.propTypes = {
  ...Dropzone.propTypes,
};

export default DropzoneStyled;

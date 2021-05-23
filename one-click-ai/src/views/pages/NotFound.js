import React from 'react';
import NotFoundImg from '../../assets/404.svg';

const NotFound = () => {
  return (
    <div className="not__found">
      <img src={NotFoundImg} alt="Not Found" />
    </div>
  );
};

export default NotFound;

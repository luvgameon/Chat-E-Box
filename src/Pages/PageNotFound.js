import React from 'react';
import './PageNotFound.css'; // Create a CSS file for styling
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
    const navigate = useNavigate();
    const home = ()=>{
 navigate('/');
    }
  return (
    <div className="page-not-found">
      <h1>404</h1>
      <p>Page Not Found</p>
      <p>The page you're looking for doesn't exist.</p>
      <Button onClick={home}>Home</Button>
    </div>
  );
};

export default PageNotFound;
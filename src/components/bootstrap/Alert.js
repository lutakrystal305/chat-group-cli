import React, { useState } from 'react';
import { Alert } from 'reactstrap';
import './Alert.css';

const AlertExample = (props) => {
  const [visible, setVisible] = useState(true);
  
  const onDismiss = () => setVisible(false);
 
  return (
    <Alert color="danger" isOpen={visible} >
      {props.children}
    </Alert>
  );
}

export default AlertExample;
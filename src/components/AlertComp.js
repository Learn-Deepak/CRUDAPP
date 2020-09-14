import React from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'

function AlertComp(props){

    //const[visible, setVisibility] = useState(false);

    return(
        <Alert variant="danger"> 
            <Alert.Heading>DELETE !!</Alert.Heading>
            <p>Are you sure you want to delete the log.</p>
            <hr/>
            <div className="d-flex justify-content-end">
                <Button onClick={() => props.confirmOrNot(false)}  size="sm" >NO</Button>
                &nbsp;&nbsp;
                <Button onClick={() => props.confirmOrNot(true)}  size="sm" >OK</Button>
            </div>
        </Alert>
    )
}

export default AlertComp;
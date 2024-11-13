import React ,{useContext} from 'react'
import noteContext from "../Context/noteContext";


const Alert = () => {
    
  const context = useContext(noteContext);
  const {alert} = context;

    return (
        alert &&
        <div className={`alert alert-${alert.type}`} role="alert">
            {alert.message}
        </div>
    )
}

export default Alert

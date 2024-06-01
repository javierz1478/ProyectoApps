

import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import axios from "axios"
import React, { useState } from 'react';

function Usuarios(){
    const us = async ()=>{
        await axios.get('http://localhost:3000/usuarios').then(res => setCount(res.data[0].nombre))
    }
    const [count, setCount] = useState('');
return(<>
    <div>hola mundo {count}</div>
    <Link to="/us" className="text-black-50 fw-bold" onClick={us}>Inicia Sesión</Link>
</>
)

}

export default Usuarios
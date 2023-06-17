import './App.css';
import ListePatients from './composants/ListePatients';
import Forme from './composants/Forme';

import {useState, useEffect} from 'react';

function App() {

  const [patients, setPatients] = useState([])
  const [editedPatient, setEditedPatient] = useState(null)


  useEffect(() => {
    fetch('http://127.0.0.1:5000/get', {
      'method': 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(resp =>resp.json())
    .then(resp => setPatients(resp))
    .catch(error => console.log(error))
  }, [])

  const editPatient = (patient) => {
    setEditedPatient(patient)

  }

  const updatedData = (patient) => {
    const new_patient = patients.map(mon_patient => {
      if(mon_patient.id ===  patient.id) {
        return patient
      } else {
        return mon_patient
      }
    })

    setPatients(new_patient)
  }


  const openForm = () => {
    setEditedPatient({nom_prenoms:'',  date_naissance:'', consultations:''})
  }

  const insertedPatient = (patient) => {
    const new_patients =[...patients, patient]
    setPatients(new_patients)
  }

  const  deletePatient = (patient) => {
    const new_patients = patients.filter(mon_patient => {
      if(mon_patient.id === patient.id){
        return false;
      }
      return true
    })

    setPatients(new_patients)
  }


  return (
    <div className="App">
      <div className='row'>
        <div className='col' id='titre'>
        <h1><img src="disp.png" alt='Logo du dispensaire'/>Disp'antsika</h1>
          
        </div>
        <div className='col' id='bout'>
          <button
          className='btn btn-success'
          onClick ={openForm}
          >Ajouter patient</button>
        </div>

      </div>
      <br/>
      <br/>
      <br/>

      <div className='row align-items-center' id= 'ligne'>
        <div className='col-3' id='quart' >
                <h3>Nom et prénoms</h3>
        </div>
        <div className='col-3' id='quart' >
                <h3>Date de naissance</h3>
        </div>
        <div className='col-3' id='quart' >
                <h3>Consultations</h3>
        </div>

      </div>
      <br/>
      

      <ListePatients patients = {patients}  editPatient = {editPatient} deletePatient = {deletePatient}/>

      {editedPatient ? <Forme patient = {editedPatient} updatedData= {updatedData} insertedPatient ={insertedPatient} /> : null}
      
    </div>
  );
}

export default App;

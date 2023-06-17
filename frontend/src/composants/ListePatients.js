
import React from 'react'
import APIService from './APIService'

function ListePatients(props) {

const editPatient = (patient) => {
    props.editPatient(patient)
}

const deletePatient = (patient) => {
    APIService.DeletePatient(patient.id)
    .then(() => props.deletePatient(patient))

}

  return (
    <div>
        {props.patients && props.patients.map(patient => {
        return (
          <div key = {patient.id} className='row align-items-center' id= 'ligne'>
            <div className='col-3' id='quart' >
              <p>{patient.nom_prenoms}</p>
            </div>
            <div className='col-3' id='quart' >
              <p>{patient.date_naissance} </p>
            </div>
            <div className = 'col-3' id='quart'>
              <p>{patient.consultations}</p>
            </div>

            <div className = 'col-3'>
              <div className='row'>
                  <div className='col'>
                      <button className='btn btn-primary'
                      onClick = {() => editPatient(patient)}
                      >Modifier</button>
                  </div>
                  <div className='col'>
                      <button className='btn btn-danger'
                      onClick = {() => deletePatient(patient)}
                      >Supprimer</button>
                  </div>
              </div>
            </div>
        
        <hr/>

          </div>
        )
      })}
      
    </div>
  )
}

export default ListePatients

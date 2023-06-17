

import React, {useState, useEffect} from 'react'
import APIService from './APIService'

function Forme(props) {
    const [nom_prenoms, setNomPrenoms] = useState('')
    const [date_naissance, setDateNaissance] = useState('')
    const [consultations, setConsultations] = useState('')

    useEffect(() => {
        setNomPrenoms(props.patient.nom_prenoms)
        setDateNaissance(props.patient.date_naissance)
        setConsultations(props.patient.consultations)
    }, [props.patient])

    const updatePatient = () => {
        APIService.UpdatePatient(props.patient.id, {nom_prenoms, date_naissance, consultations})
        .then(resp => props.updatedData(resp))
        .catch(error => console.log(error))

    }
    const insertPatient = () => {
        APIService.InsertPatient({nom_prenoms, date_naissance, consultations})
        .then(resp => props.insertedPatient(resp))
        .catch(error => console.log(error))
    }

    return (
        <div>
            {props.patient ? (

                <div className= "mb-3">

                    <label htmlFor='nom_prenoms' className='form-label'>Nom et prénoms </label>
                    <input type= "text" className='form-control'
                    value={nom_prenoms}
                    placeholder='Entrer le nom et les prénoms :)'
                    onChange = {(e) => setNomPrenoms(e.target.value)}
                    ></input>

                    <label htmlFor='date_naissance' className='form-label'>Date de naissance </label>
                    <input type= "text" className='form-control'
                    value= {date_naissance}
                    onChange = {(e) => setDateNaissance(e.target.value)}
                    placeholder='Entrer le nom et les prénoms :)'
                    ></input>

                    <label htmlFor='consultations' className='form-label'>Consultations </label>
                    <textarea
                    rows ="3"
                    value={consultations}
                    onChange = {(e) => setConsultations(e.target.value)}
                    className='form-control'
                    placeholder='Entrer les consultations'
                    />

                    {
                        props.patient.id ? <button
                        onClick={updatePatient}
                        className = "btn btn-success mt-3"
                        >Modifier</button>
                        :
                        <button
                        onClick={insertPatient}
                        className = "btn btn-success mt-3"
                        >Ajouter</button>
                            
                    }

                    
                </div>
            
            ):null}
        
        </div>
    )
    }

export default Forme

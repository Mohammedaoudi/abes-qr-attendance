/* eslint-disable prettier/prettier */
import SemestreCard from "ui-component/cards/SemestreCard/SemestreCard"
import React from "react"
const FiliereComponent = ({dataFiliere }) => {
    console.log(dataFiliere.semestres)
    return (
        <div style={{}}>
            {dataFiliere && dataFiliere.semestres && dataFiliere.semestres.map((semestre, index) => (
                <React.Fragment key={index}>
                    <SemestreCard title={semestre.nomSemestre} id={semestre._id} />
                    <br />
                </React.Fragment>
            ))}
           
        </div>
    )
}

export default FiliereComponent

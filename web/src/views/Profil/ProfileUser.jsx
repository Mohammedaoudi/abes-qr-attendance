/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { useFetch } from 'hooks/useFetch';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


import User1 from 'assets/images/users/user-round.svg';


function ProfileUser() {
    const { id } = useParams();


    const [user, setuser] = useState({});
    const { data, loading, error } = useFetch(`http://localhost:3001/api1/v1/auth/${id}`);

    useEffect(() => {
        if (data && data.success) {
            setuser(data.user);
            console.log(error)
        }
    }, [data]);
  return (
    <>
    {loading ? (
        "Loading ..."
    ) : (
        <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
            {/* Cover Header */}
            <div style={{ backgroundColor: '#2d71a1', color: '#fff', padding: '20px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', display: 'flex', alignItems: 'center' }}>
                {/* Image */}
                <div style={{ marginRight: '20px' }}>
                    <img src={User1} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%', border: '5px solid white', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)' }} />
                </div>
                {/* Professor's Name */}
                <div>
                    <h1 style={{ color: "white" }}>{user.nom} {user.prenom}</h1>
                    <h3 style={{ color: "white" }}>Profil</h3>
                </div>
            </div>
            {/* Information */}
            <div style={{ marginTop: '20px', color: '#333' }}>
                <div style={{ marginBottom: '20px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                        <div>
                            <h4 style={{ fontWeight: 'bold' }}>Email :</h4>
                            <p>{user.email}</p>
                        </div>
                        <div>
                            <h4 style={{ fontWeight: 'bold' }}>Role:</h4>
                            <p>{user.role}</p>
                        </div>
                        <div>
                        <Link to={`/update-password/${user.nom}`} style={{ fontWeight: 'bold' }}>Modifier le mot de passe</Link>
                        </div>
                       
                    </div>
                </div>
            </div>

        </div>
    )}
</>
  )
}

export default ProfileUser
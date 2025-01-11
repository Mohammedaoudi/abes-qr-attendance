/* eslint-disable prettier/prettier */
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useParams } from "react-router-dom";

const UpdatePassword = () => {
  const { nom } = useParams();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('TOKEN');
  const userID = localStorage.getItem('USER_ID');

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlUpdate = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    try {
      const response = await fetch(`http://localhost:3001/api1/v1/auth/${userID}/update-password`, {
        method: 'PUT',
        body: JSON.stringify({ newPassword }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Votre ancien mot de passe est incorrect. Veuillez vérifier et réessayer');
        } else {
          throw new Error('Échec de la mise à jour du mot de passe');
        }
      }

      // Redirect based on user role
      navigate('/');
    } catch (error) {
      console.error('Update Password Error:', error);
      setError('Une erreur s\'est produite lors de la mise à jour du mot de passe');
    }
  };

  return (
    <section style={{ backgroundColor: 'hsl(0, 0%, 96%)', minHeight: '100vh' }}>
      <div className="px-4 py-5 px-md-5 text-center text-lg-start">
        <div className="container">
          <div className="row gx-lg-5 align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h1 className="my-2 display-3 fw-bold ls-tight text-primary" style={{ marginTop: '-20px' }}>
                Bonjour <br /> <small>{nom}</small> <br />
              </h1>
              <span className="text" style={{ color: 'Black', fontSize: '1.2rem' }}>
                Merci de mettre à jour votre mot de passe pour des raisons de sécurité.
              </span>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="card">
                <div className="card-body py-5 px-md-5">
                  <form onSubmit={handlUpdate}>
                    <div className="form-outline mb-4">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="form-control"
                        placeholder="Nouveau mot de passe"
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                      />
                    </div>
                    <div className="form-outline position-relative mb-4">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="form-control"
                        placeholder="Confirmer le nouveau mot de passe"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                      />
                      <span
                        onClick={togglePasswordVisibility}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            togglePasswordVisibility();
                          }
                        }}
                        role="button"
                        tabIndex={0}
                        className="position-absolute top-50 translate-middle-y eye-icon"
                        style={{ cursor: 'pointer', right: '10px' }}
                      >
                        {showPassword ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                      </span>
                    </div>
                    {error && (
                      <div
                        className="error-message"
                        style={{
                          backgroundColor: '#ffcccc',
                          padding: '10px',
                          borderRadius: '5px',
                          marginTop: '10px',
                          opacity: '1',
                          transition: 'opacity 0.5s ease',
                        }}
                      >
                        {error}
                      </div>
                    )}

                    <div className="text-center">
                      <button type="submit" className="btn btn-primary btn-block mb-4">
                        Valider
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdatePassword;

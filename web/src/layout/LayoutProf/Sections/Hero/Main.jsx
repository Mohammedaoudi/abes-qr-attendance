/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable prettier/prettier */
import React from 'react'
import phone_1 from '../../../../assets/img/phone_1.png'
import phone_2 from '../../../../assets/img/phone_2.png'
import Gps from '../../../../assets/img/Gps.png'
import Managemnt from '../../../../assets/img/management.png'



const Main = () => {
    return (
        <main id="main">
            <div className="hero-section">
                <div className="wave">
                    <svg width="100%" height="355px" viewBox="0 0 1920 355" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                        <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                            <g id="Apple-TV" transform="translate(0.000000, -402.000000)" fill="#FFFFFF">
                                <path d="M0,439.134243 C175.04074,464.89273 327.944386,477.771974 458.710937,477.771974 C654.860765,477.771974 870.645295,442.632362 1205.9828,410.192501 C1429.54114,388.565926 1667.54687,411.092417 1920,477.771974 L1920,757 L1017.15166,757 L0,757 L0,439.134243 Z" id="Path" />
                            </g>
                        </g>
                    </svg>
                </div>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-12 hero-text-image">
                            <div className="row">
                                <div className="col-lg-7 text-center text-lg-left">
                                    <h1 data-aos="fade-right">Présence régulière, succès assuré! </h1>
                                    <p className="mb-5" data-aos="fade-right" data-aos-delay={100}> téléchargez notre app maintenant!.</p>
                                    <p data-aos="fade-right" data-aos-delay={200} data-aos-offset={-500}><a href="#" className="btn btn-outline-white">téléchargez</a></p>
                                </div>
                                <div className="col-lg-5 iphone-wrap">
                                    <img src={phone_1} alt="Image" className="phone-1" data-aos="fade-right" />
                                    <img src={phone_2} alt="Image" className="phone-2" data-aos="fade-right" data-aos-delay={200} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="site-section" id='propre'>
                <div className="container">
                    <div className="row justify-content-center text-center mb-5">
                        <div className="col-md-5" data-aos="fade-up">
                            <h2 className="section-heading">à propos de</h2>
                        </div>

                        <p>Le système comprend une plateforme web pour les professeurs de l'École Nationale des Sciences Appliquées d'El Jadida,  <br />où ils génèrent des QR codes pour leurs cours. Les étudiants utilisent l'application mobile AbesSystem pour scanner ces codes et enregistrer leur présence</p>
                    </div>

                    <div className="row">
                        <div className="col-md-4" data-aos="fade-up" data-aos-delay>
                            <div className="feature-1 text-center">
                                <div className="wrap-icon icon-1">
                                    <span className="icon icofont-key" />
                                </div>
                                <h3 className="mb-3">Niveau de sécurité plus élevé</h3>
                                <p>
                                    Ce système assure la sécurité des données et simplifie la gestion des absences. Les professeurs génèrent des codes QR sécurisés, permettant aux étudiants de marquer leur présence de manière fiable via l'application mobile.</p>
                            </div>
                        </div>
                        <div className="col-md-4" data-aos="fade-up" data-aos-delay={100}>
                            <div className="feature-1 text-center">
                                <div className="wrap-icon icon-1">
                                    <span className="icon icofont-calendar" />
                                </div>
                                <h3 className="mb-3">Gestion efficace des emplois du temps</h3>
                                <p>
                                    Ce système simplifie la gestion de l'emploi du temps et des séances pour les professeurs et les étudiants. Les professeurs peuvent facilement planifier leurs cours et les étudiants ont un accès rapide aux informations sur les séances.</p>
                            </div>
                        </div>
                        <div className="col-md-4" data-aos="fade-up" data-aos-delay={200}>
                            <div className="feature-1 text-center">
                                <div className="wrap-icon icon-1">
                                    <span className="icon icofont-star" />
                                </div>
                                <h3 className="mb-3">Bonne performance</h3>
                                <p>Ce système offre des performances optimales, assurant une expérience fluide et efficace pour les utilisateurs, avec une navigation rapide et réactive sur la plateforme web et l'application mobile.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> {/* .site-section */}

            <div className="site-section pb-0" id="services">
                <div className="container">
                    <div className="row justify-content-center text-center mb-5">
                        <div className="col-md-5" data-aos="fade-up">
                            <h2 className="section-heading">Services</h2>
                        </div>

                        <p>Notre Services</p>
                    </div>

                    <div className="row align-items-center">
                        <div className="col-md-4 mr-auto">
                            <h2 className="mb-4">Géolocalisation et Enregistrement des Présences Simplifiés </h2>
                            <p className="mb-4">Ce système utilise la géolocalisation GPS pour sécuriser les scans de QR codes en vérifiant qu'ils sont effectués dans l'enceinte de l'école. Cela renforce la sécurité en empêchant les scans frauduleux ou non autorisés.</p>
                        </div>
                        <div className="col-md-6" data-aos="fade-left">
                            <img src={Gps} alt="Image" className="img-fluid" style={{ maxWidth: '230px', height: 'auto' }} />

                        </div>
                    </div>
                </div>
            </div> {/* .site-section */}
            <div className="site-section">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-4 ml-auto order-2">
                            <h2 className="mb-4">Solution Intégrée pour la Gestion Scolaire et le Suivi de Présence</h2>
                            <p className="mb-4">
                                Ce système complet intègre la gestion de l'emploi du temps des séances et des évolutions, en plus du suivi de la présence des étudiants. Il offre une solution tout-en-un pour la gestion efficace de l'école, de la planification des cours à la gestion administrative..</p>
                        </div>
                        <div className="col-md-6" data-aos="fade-right">
                            <img src={Managemnt} alt="Image" className="img-fluid" style={{ maxWidth: '300px', height: 'auto' }} />
                        </div>
                    </div>
                </div>
            </div> {/* .site-section */}

            <div className="site-section cta-section">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6 mr-auto text-center text-md-left mb-5 mb-md-0">
                            <h2>Commencez</h2>
                        </div>
                        <div className="col-md-5 text-center text-md-right">
                            <p><a href="#" className="btn"><span className="icofont-brand-apple mr-3" />App store</a> <a href="#" className="btn"><span className="icofont-ui-play mr-3" />Google play</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Main
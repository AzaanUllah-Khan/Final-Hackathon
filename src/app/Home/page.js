'use client'
import React, { useState } from 'react';
import '@fontsource/montserrat'
import Swal from 'sweetalert2'

const ContactSection = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    function loginAdmin() {
        if (email == "admin@gmail.com" && password == "admin123") {
            Swal.fire({
                title: 'Admin!',
                text: 'Admin logged in successfully',
                icon: 'success',
                confirmButtonText: 'Next'
            }).then(() => {
                window.location.href = "Dashboard"
            })
        }
        else{
            Swal.fire({
                title: 'Error',
                text: 'Enter correct email or password',
                icon: 'error',
                confirmButtonText: 'Okay'
            })
        }
    }
    return (
        <section className="text-gray-600 body-font relative height-auto" style={{ fontFamily: "Montserrat", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundImage: 'linear-gradient(to right, #8fabdf, #ffffff)', paddingRight: "180px", paddingLeft: "180px" }}>
            <div className="container px-20 py-24 mx-auto" style={{ boxShadow: "0px 0px 20px rgba(0,0,0,0.15)", backgroundColor: "#fff", borderRadius: "20px" }}>
                <div className="flex flex-col text-center w-full mb-2">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-10 text-gray-900" style={{ fontWeight: "bold" }}>Login</h1>
                </div>
                <div className="w-full mx-auto">
                    <div className="flex flex-wrap -m-2 justify-center flex-col items-center">
                        <div className="p-3 w-2/4 mb-1">
                            <div className="relative">
                                <input
                                    onChange={(e) => { setEmail(e.target.value) }}
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder='Email'
                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    style={{ borderLeftWidth: "7px", borderLeftColor: "#5C93FA", borderRadius: "10px" }} />
                            </div>
                        </div>
                        <div className="p-3 w-2/4">
                            <div className="relative">
                                <input
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    type="password"
                                    id="password"
                                    placeholder='Password'
                                    name="password"
                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    style={{ borderLeftWidth: "7px", borderLeftColor: "#5C93FA", borderRadius: "10px" }} />
                            </div>
                        </div>
                        <div className="p-2 w-full mt-10">
                            <button onClick={() => { loginAdmin() }} className="flex mx-auto text-white border-0 py-2 px-8 focus:outline-none rounded text-lg" style={{ backgroundColor: "#7497d9" }}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;

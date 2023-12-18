"use client"
import React from "react";
import '@fontsource/montserrat'

const Attendance = () => {
    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900 antialiased" style={{ fontFamily: "Montserrat", display: "flex", height: "100vh" }}>
                <aside id="default-sidebar" aria-label="Sidebar" style={{ width: "300px" }}>
                    <div className="h-full px-3 py-4 overflow-y-auto w-300" style={{ backgroundColor: "white" }}>
                        <ul className="space-y-2 font-medium">
                            <li>
                                <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <span style={{ textAlign: "center", width: "100%", fontWeight: "bolder", fontSize: "18px" }}>Attendance</span>
                                </a>
                            </li>
                            <li>
                                <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <img src="https://www.freeiconspng.com/uploads/school-student-icon-18.png" width={25} />
                                    <span className="flex-1 ms-3 whitespace-nowrap" style={{ color: "grey" }} onClick={() => { window.location.href = "Dashboard" }}>Students</span>
                                </a>
                            </li>
                            <li>
                                <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <img className="rounded-full" src="https://w1.pngwing.com/pngs/902/328/png-transparent-timetracking-software-text-computer-software-timesheet-management-system-human-resource-management-payroll-time-and-attendance-human-resource-management-system-thumbnail.png" width={25} />
                                    <span className="flex-1 ms-3 whitespace-nowrap" style={{ color: "black", fontWeight: "bold", cursor: "pointer" }}>Attendance</span>
                                </a>
                            </li>
                        </ul>
                        <button
                            className="bg-red-500 text-white p-2 rounded-lg ml-3"
                            style={{ position: "absolute", bottom: "10px", width: "200px" }}
                            onClick={() => {
                                localStorage.setItem("adminLogged", false);
                                window.location.href = "Home";
                            }}
                        >
                            Logout
                        </button>

                    </div>
                </aside>
                <div className="p-10 w-full">
                    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden w-full">
                        <div className="w-full flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <div className="w-full flex">
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center gap-3">
                                        <img src="https://i.imgur.com/zyxf5OP.png" style={{ width: "35px", height: "35px", borderRadius: "50%" }} />
                                        <h1 style={{ fontWeight: "bold", fontSize: "18px" }}>Attendance</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">Id</th>
                                        <th scope="col" className="px-4 py-3">Details</th>
                                        <th scope="col" className="px-4 py-3">Check in Time</th>
                                        <th scope="col" className="px-4 py-3">Check out Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b dark:border-gray-700">
                                        <td className="px-4 py-3">1.</td>
                                        <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <div className="flex items-center mr-3">
                                                <img src="https://avatars.githubusercontent.com/u/121516991?v=4" alt="iMac Front Image" className="h-8 w-auto mr-3 rounded-lg" />
                                                AzaanUllah Khan
                                            </div>
                                        </th>
                                        <td className="px-4 py-3">12:00 pm</td>
                                        <td className="px-4 py-3">11:57 am</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Attendance
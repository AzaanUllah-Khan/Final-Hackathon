"use client"
import React, { useState, useEffect } from "react";
import '@fontsource/montserrat'
import { FaPlus, FaCamera } from 'react-icons/fa'
import { Drawer, Space, Button, Form, Row, Col, Input } from "antd";
import { createUserWithEmailAndPassword, doc, setDoc, db, auth, ref, uploadBytes, storage, collection, onSnapshot, getDownloadURL, updateDoc, getAuth, onAuthStateChanged } from '../../Firebase/config'
import Swal from "sweetalert2";
import LoadingScreen from "../Home/loader";

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const [open, setOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [course, setCourse] = useState('')
    const [number, setNumber] = useState('')
    const [data, setData] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("adminLogged") == "false") {
            window.location.href = "/"
        }
        const fetchData = async () => {
            const q = collection(db, "User");
            const unsubscribe = onSnapshot(q, (snapshot) => {
                snapshot.docChanges().forEach(async (change) => {
                    if (change.type === "added") {
                        const userData = change.doc.data();
                        try {
                            const url = await getDownloadURL(ref(storage, userData.email));
                            userData.imageUrl = url;
                        } catch (error) {
                            console.log(error);
                        }

                        setData((prevData) => [...prevData, userData]);
                    }
                });
                setLoading(false)
            });

            return () => unsubscribe();
        };

        fetchData();
    }, []);


    const showUpdateDrawer = (userData) => {
        setSelectedUser(userData);
        setUpdateOpen(true);
        setFirstName((userData?.name).split(' ')[0])
        setLastName((userData?.name).split(' ')[1])
        setCourse(userData?.course)
        setNumber(userData?.phone)
    };

    const onUpdateClose = () => {
        setUpdateOpen(false);
    };
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    function handleFileChange(e) {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        const reader = new FileReader();

        reader.onload = function (e) {
            document.getElementById("img").style.backgroundImage = `url('${e.target.result}')`
            document.getElementById("img").style.backgroundSize = 'cover'
        };

        reader.readAsDataURL(selectedFile);
    }


    async function handleSignUp() {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await setDoc(doc(db, "User", user.uid), {
                name: `${firstName} ${lastName}`,
                email,
                phone: number,
                course,
                password,
                uid: user.uid
            });

            const storageRef = ref(storage, email);

            await uploadBytes(storageRef, file).then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'User Created Successfully.',
                }).then(() => {
                    location.reload();
                });
            })
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            Swal.fire({
                icon: 'error',
                title: errorMessage,
            });
        }
    }
    console.log(data);
    async function handleUpdate(uid) {
        const washingtonRef = doc(db, "User", uid);
        await updateDoc(washingtonRef, {
            name: `${firstName} ${lastName}`,
            phone: number,
            course: course,
        }).then(() => {
            Swal.fire({
                icon: "success",
                text: "User Updated"
            }).then(() => {
                location.reload()
            })
        })
    }

    return (
        <>
            {/* Drawer Update Start */}
            <Drawer
                title="Update The Student"
                width={550}
                onClose={onUpdateClose}
                open={updateOpen}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
                extra={
                    <Space>
                        <Button onClick={() => { handleUpdate(selectedUser?.uid) }} style={{ backgroundColor: "#5C92F7", color: "white", width: "100px" }}>Update</Button>
                    </Space>
                }
            >
                <Form layout="vertical">
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="firstName"
                                label="First Name"
                                initialValue={(selectedUser?.name)?.split(' ')[0]}
                            >
                                <Input onChange={(e) => { setFirstName(e.target.value) }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="lastName"
                                label="Last Name"
                                initialValue={(selectedUser?.name)?.split(' ')[1]}
                            >
                                <Input onChange={(e) => { setLastName(e.target.value) }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="course"
                                label="Course"
                                initialValue={selectedUser?.course}
                            >
                                <Input onChange={(e) => { setCourse(e.target.value) }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="number"
                                label="Phone Number"
                                initialValue={selectedUser?.phone}
                            >
                                <Input onChange={(e) => { setNumber(e.target.value) }} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
            {/* Drawer Update End */}
            {/* Drawer Start */}
            <Drawer
                title="Create A New Student"
                width={550}
                onClose={onClose}
                open={open}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
                extra={
                    <Space>
                        <Button onClick={() => { handleSignUp() }} style={{ backgroundColor: "#5C92F7", color: "white", width: "100px" }}>Add</Button>
                    </Space>
                }
            >
                <Form layout="vertical">
                    <Row gutter={16}>
                        <Col style={{ width: "100%", marginBottom: "30px" }}>
                            <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <div id="img" style={{ position: "relative", backgroundColor: "#5c92f7", width: "110px", height: "110px", borderRadius: "50%" }}>
                                    <div style={{ position: "absolute", bottom: "0", right: "0", backgroundColor: "#D9D9D9", padding: "9px", borderRadius: "50%" }}>
                                        <label htmlFor="fileInput">
                                            <FaCamera style={{ fontSize: "15px" }} />
                                            <Input type="file" id="fileInput" onChange={handleFileChange} style={{ display: "none" }} />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="firstName"
                                label="First Name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter user name',
                                    },
                                ]}
                            >
                                <Input onChange={(e) => { setFirstName(e.target.value) }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="lastName"
                                label="Last Name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter user name',
                                    },
                                ]}
                            >
                                <Input onChange={(e) => { setLastName(e.target.value) }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="course"
                                label="Course"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter the course name',
                                    },
                                ]}
                            >
                                <Input onChange={(e) => { setCourse(e.target.value) }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="password"
                                label="Password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Password is Required',
                                    },
                                ]}
                            >
                                <Input onChange={(e) => { setPassword(e.target.value) }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter email of the student',
                                    },
                                ]}
                            >
                                <Input onChange={(e) => { setEmail(e.target.value) }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="number"
                                label="Phone Number"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please the Phone Number',
                                    },
                                ]}
                            >
                                <Input onChange={(e) => { setNumber(e.target.value) }} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
            {/* Drawer End */}
            <section className="bg-gray-50 dark:bg-gray-900 antialiased" style={{ fontFamily: "Montserrat", display: "flex", height: "100vh" }}>
                <aside id="default-sidebar" aria-label="Sidebar" style={{ width: "300px", position: "relative" }}>
                    <div className="h-full px-3 py-4 overflow-y-auto w-300" style={{ backgroundColor: "white" }}>
                        <ul className="space-y-2 font-medium">
                            <li>
                                <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <span style={{ textAlign: "center", width: "100%", fontWeight: "bolder", fontSize: "18px" }}>Dashboard</span>
                                </a>
                            </li>
                            <li>
                                <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <img src="https://www.freeiconspng.com/uploads/school-student-icon-18.png" width={25} />
                                    <span className="flex-1 ms-3 whitespace-nowrap" style={{ color: "black", fontWeight: "bold", cursor: "pointer" }}>Students</span>
                                </a>
                            </li>
                            <li>
                                <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <img className="rounded-full" src="https://w1.pngwing.com/pngs/902/328/png-transparent-timetracking-software-text-computer-software-timesheet-management-system-human-resource-management-payroll-time-and-attendance-human-resource-management-system-thumbnail.png" width={25} />
                                    <span className="flex-1 ms-3 whitespace-nowrap" style={{ color: "grey", cursor: "pointer" }} onClick={() => { window.location.href = "Attendance" }}>Attendance</span>
                                </a>
                            </li>
                        </ul>
                        <button
                            className="bg-red-500 text-white p-2 rounded-lg ml-3"
                            style={{ position: "absolute", bottom: "10px", width: "200px" }}
                            onClick={() => {
                                localStorage.setItem("adminLogged", false);
                                window.location.href = "/";
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
                                        <h1 style={{ fontWeight: "bold", fontSize: "18px" }}>Students</h1>
                                    </div>
                                    <button style={{ backgroundColor: "#3699BF" }} id="actionsDropdownButton" className="w-full md:w-auto flex items-center justify-center py-2 px-3 text-sm font-medium text-white rounded-lg border gap-3" type="button" onClick={showDrawer}>
                                        <FaPlus />
                                        Add Students
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">Id</th>
                                        <th scope="col" className="px-4 py-3">Details</th>
                                        <th scope="col" className="px-4 py-3">Email</th>
                                        <th scope="col" className="px-4 py-3">Course Name</th>
                                        <th scope="col" className="px-4 py-3">Password</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item, index) => (
                                        <tr key={index} className="border-b dark:border-gray-700">
                                            <td className="px-4 py-3">{index + 1}.</td>
                                            <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <div className="flex items-center mr-3">
                                                    <img onClick={() => { showUpdateDrawer(item) }} src={item.imageUrl} className="mr-3 rounded-lg" style={{ width: "30px", height: "30px" }} />
                                                    {item.name}
                                                </div>
                                            </th>
                                            <td className="px-4 py-3">{item.email}</td>
                                            <td className="px-4 py-3">{item.course}</td>
                                            <td className="px-4 py-3">{item.password}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {loading &&
                                <div style={{ position: "relative", padding: "30px" }}>
                                    <LoadingScreen />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Dashboard
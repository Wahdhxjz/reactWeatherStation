import './App.css';
import {
    MDBCard,
    MDBInput,
    MDBBtn,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";

import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';



function App() {
    const [search, setSearch] = useState('')
    const [allData, setAllData] = useState({
        city: 'Paris',
        temperature: '',
        humidity: '',
        temp_min: '',
        weather_icon: '',
        weather: '',
        wind: '',
        country: ''
    })

    useEffect(() => {
        fetchData('paris');
    }, [])

    const fetchData = async (city) => {
        try {
            const APIKey = '';
            const results = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`)
            await setAllData({
                city: results.data.name,
                temperature: results.data.main.temp,
                humidity: results.data.main.humidity,
                temp_min: results.data.main.temp_min,
                weather_icon: 'https://openweathermap.org/img/w/' + results.data.weather[0].icon + '.png',
                weather: results.data.weather[0].main,
                wind: results.data.wind.speed,
                country: results.data.sys.country
            });
        } catch (error) {
            console.log('api not loaded correctly ')
        }
    }
    const handleChange = event => {
        setSearch(event.target.value);
    };

    const handleSumbit = event => {
        event.preventDefault();

        // 👇️ value of input field
        console.log('handleSumbit 👉️', search);
        fetchData(search);
    };
    return (
        <main>
            <div className="App">
                <section className="vh-100" style={{ backgroundColor: "#4B515D" }}>
                    <MDBContainer className="h-100">
                        <MDBRow className="justify-content-center align-items-center h-100">
                            <MDBCol md="10" lg="6" xl="5">
                                <MDBRow tag='form' className='ml-20 gy-5 gx-8 align-items-center margin-left: 7%' onSubmit={handleSumbit}>
                                    <MDBCol size='auto'>
                                        <MDBInput
                                            type="text"
                                            id="city"
                                            name="City"
                                            placeholder="Location"
                                            onChange={handleChange}
                                            className="form-control"
                                            required="required"
                                            value={search}
                                            autoComplete="off"
                                        />
                                    </MDBCol>
                                    <MDBCol size='auto'>
                                        <MDBBtn name="submit" type="submit" className="btn btn-primary">Search</MDBBtn>
                                    </MDBCol>
                                </MDBRow>
                                <MDBCard style={{ color: "#4B515D", borderRadius: "35px" }}>
                                    <MDBCardBody className="p-4">
                                        <div className="d-flex">
                                            <MDBTypography tag="h6" className="flex-grow-1">
                                                {allData.city}
                                            </MDBTypography>
                                            <MDBTypography tag="h6">{allData.country}</MDBTypography>
                                        </div>

                                        <div className="d-flex flex-column text-center mt-5 mb-4">
                                            <MDBTypography
                                                tag="h6"
                                                className="display-4 mb-0 font-weight-bold"
                                                style={{ color: "#1C2331" }}
                                            >
                                                {" "}
                                                {allData.temperature}°C{" "}
                                            </MDBTypography>
                                            <span className="small" style={{ color: "#868B94" }}>
                                                {allData.weather}
                                            </span>
                                        </div>

                                        <div className="d-flex align-items-center">
                                            <div className="flex-grow-1" style={{ fontSize: '1rem' }}>
                                                <div>
                                                    <MDBIcon
                                                        fas
                                                        icon="thermometer-three-quarters fa-fw"
                                                        style={{ color: "#868B94" }}
                                                    />{" "}
                                                    <span className="ms-1"> {allData.temp_min}°C{" "}</span>
                                                </div>
                                                <div>
                                                    <MDBIcon
                                                        fas
                                                        icon="wind fa-fw"
                                                        style={{ color: "#868B94" }}
                                                    />{" "}
                                                    <span className="ms-1"> {allData.wind}{" m/s"}</span>
                                                </div>

                                                <div>
                                                    <MDBIcon
                                                        fas
                                                        icon="tint fa-fw"
                                                        style={{ color: "#868B94" }}
                                                    />{" "}
                                                    <span className="ms-1"> {allData.humidity}% </span>
                                                </div>
                                            </div>
                                            <div>
                                                <img
                                                    src={allData.weather_icon}
                                                    width="x2"
                                                />
                                            </div>
                                        </div>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </section>




            </div >
        </main >
    );
}
export default App;
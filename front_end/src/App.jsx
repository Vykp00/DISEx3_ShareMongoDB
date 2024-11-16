import React, { useState } from "react";
import axios from "axios";

const App = () => {
    const [location, setLocation] = useState("karjaani");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [endpoint, setEndpoint] = useState("patients");

    const fetchData = async () => {
        setLoading(true);
        try {
            // Adjust the backend URL as needed
            const response = await axios.get(`http://localhost:3000/${endpoint}`, {
                params: { location },
            });
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>iTerveys Dashboard</h1>

            {/* Dropdown to select endpoint */}
            <label>
                Select Endpoint:
                <select value={endpoint} onChange={(e) => setEndpoint(e.target.value)}>
                    <option value="patients">Patients</option>
                    <option value="physiotherapists">Physiotherapists</option>
                    <option value="appointments">Appointments</option>
                    <option value="programs">Rehabilitation Programs</option>
                </select>
            </label>

            {/* Dropdown for location selection */}
            {endpoint !== "programs" && (
                <div style={{ marginTop: "10px" }}>
                    <label>
                        Select Location:
                        <select
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        >
                            <option value="karjaani">Karjaani</option>
                            <option value="london">London</option>
                            <option value="munich">Munich</option>
                        </select>
                    </label>
                </div>
            )}

            {/* Fetch Button */}
            <button
                style={{marginTop: "10px", padding: "5px 10px"}}
                onClick={fetchData}
                disabled={loading}
            >
                {loading ? "Loading..." : "Fetch Data"}
            </button>

            {/* Display Data in a Table */}
            <div style={{ marginTop: "20px" }}>
                {data.length > 0 ? (
                    <table border="1" cellPadding="10" cellSpacing="0">
                        <thead>
                        <tr>
                            {Object.keys(data[0]).map((key) => (
                                <th key={key}>{key}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                {Object.values(item).map((value, i) => (
                                    <td key={i}>{value}</td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No data available</p>
                )}
            </div>
        </div>
    );
};

export default App;

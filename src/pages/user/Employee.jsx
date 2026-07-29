import React from "react";

import { useState } from "react";
// function Employee(props) {

//     return (
//         <div>
//             <h2>{props.name}</h2>
//             <h2>{props.salary}</h2>
//         </div>
//     )
// }

function Employee({name, salary}) {

    const showMessage = () => {
        alert("Button Clicked");
    };

    return (
        <div>
            <h2>{name}</h2>
            <h2>{salary}</h2>

            <button onClick={showMessage}>
                Click
            </button>
        </div>
    )
}

export default Employee;


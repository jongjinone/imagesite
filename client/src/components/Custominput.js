import React from "react";

const CustomInput = ({label, value, setValue, type = "text"}) => {
    return (
        <div style={{marginTop: "10px"}}>
            <label>{label}</label><br />
            <input type={type} value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
    )
}

export default CustomInput
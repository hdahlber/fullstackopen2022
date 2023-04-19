import React from "react";
const Notification = ({ message,isSuccess }) => {
    console.log("-------------------")
    console.log(message)
    if (message === null) {
        return null
    }
    else if(isSuccess===true){
        return (
            <div className='success'>
                {message}
            </div>
        )
    }
    else {
        return (
            <div className='error'>
                {message}
            </div>
        )
    }
}

export default Notification
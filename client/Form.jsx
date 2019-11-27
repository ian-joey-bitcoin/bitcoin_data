import React from 'react'

export default function Form(props) {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <label>
                    start from : 
                    <input type='date' name='startDate' onChange={props.handleChange}/>
                </label>
                <input type='submit' value='Show Closing Prices'/>
            </form>
        </div>
    )
}


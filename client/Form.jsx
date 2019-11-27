import React from 'react'

export default function Form() {
    return (
        <div>
            <form>
                <input type='date' name='startDate'/>
                <input type='date' name='endDate'/>
                <input type='submit'/>
            </form>
        </div>
    )
}


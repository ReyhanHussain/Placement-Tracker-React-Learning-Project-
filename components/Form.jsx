import React from 'react'

function Form({ setAllInfos, error,errorHandler, form, clearAllFormInputs, setList }) {
    console.log(error)
    return (
        <div className='form-container'>

            <div className='test'>
                <input onChange={setAllInfos} value={form.company} type="text" name='company' placeholder='Company Name' />
                <span className='errorField'>{error.company}</span>
            </div>
            <div className='test'>
                <input onChange={setAllInfos} value={form.role} type="text" name='role' placeholder='Role' />
                <span className='errorField'>{error.role}</span>
            </div>


            <select onChange={setAllInfos} value={form.status} name='status'>
                <option value="Applied">Applied</option>
                <option value="Rejected">Rejected</option>
                <option value="Interview">Interview</option>
                <option value="No Confirmation">No Confirmation</option>
            </select>

            <div className='test'>
                <input onChange={setAllInfos} value={form.date} type="date" name='date' placeholder='Date' />
                <span className='errorField'>{error.date}</span>
            </div>
            <div className='test'>
                <input onChange={setAllInfos} value={form.ref} type="text" name='ref' placeholder='Any Reference (url...)' />
                <span className='errorField'>{error.ref}</span>
            </div>
            <button onClick={() => setList((prev) => {
                errorHandler(form);
                clearAllFormInputs();
                return [...prev, { ...form }]
            })}>Add</button>
        </div>
    )
}

export default Form
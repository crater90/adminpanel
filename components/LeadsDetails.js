import React from 'react'
import { useState } from 'react'

function LeadsDetails({ name, phone, email, location, query }) {
    const [open, setOpen] = useState(false)
    return (
        <>
            <tr className={`${open ? '' : 'border-b border-gray-100'} last:!border-0 font-Roboto`}>
                <td className="p-2">
                    <div onClick={(e) => setOpen(!open)} className='text-left cursor-pointer'>{name}</div>
                </td>
                <td className="p-2">
                    <div className="text-center">{email}</div>
                </td>
                <td className="p-2">
                    <div className="text-center text-green-500">{location}</div>
                </td>
                <td className="p-2">
                    <div className="text-center">{phone}</div>
                </td>
            </tr>
            {
                open &&
                <tr className='border-b'>
                    <td colSpan={4} className='p-2'>
                        <p className='text-gray-700'>{query}</p>
                    </td>
                </tr>
            }
        </>
    )
}

export default LeadsDetails
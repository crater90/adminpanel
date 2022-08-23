import { TrashIcon } from '@heroicons/react/outline'
import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from "../firebase"

function LeadsDetails({ id, name, phone, email, location, query }) {
    const [open, setOpen] = useState(false)

    const deleteLeads = async (e) => {
        try {
            await deleteDoc(doc(db, "leads", id))
            toast.success('Lead deleted successfully')
        } catch (err) {
            toast.error('Action failed. Please try again.')
            console.log(err)
        }
    }
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
                <td className="p-2">
                    <TrashIcon onClick={deleteLeads} className='h-6 w-6 text-red-400 cursor-pointer' />
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
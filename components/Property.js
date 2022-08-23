import React from 'react'
import { useState } from 'react'
import { TrashIcon, PencilAltIcon } from '@heroicons/react/outline'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from "../firebase"
import { toast } from 'react-toastify'
import Link from 'next/link'

function Property({ id, data }) {

    const [show, setShow] = useState(false);

    const deleteProperty = async (e) => {
        try {
            await deleteDoc(doc(db, "property", id))
            toast.success('Property deleted successfully')
        } catch (e) {
            toast.error('Action failed. Please try again.')
        }
    }
    return (
        <>
            <tr className='font-Roboto'>
                <td className="p-2 whitespace-nowrap">
                    <div onClick={(e) => setShow(!show)} className="text-left cursor-pointer">{data.uniqueId}</div>
                </td>
                <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center">
                        <div className="font-medium text-gray-800">{data.venueName}</div>
                    </div>
                </td>
                <td className="p-2 whitespace-nowrap">
                    <div className="text-left">{data.address.city}</div>
                </td>
                <td className="p-2 whitespace-nowrap">
                    <div className="text-left font-medium text-green-500">{data.name}</div>
                </td>
                <td className="p-2 whitespace-nowrap">
                    <div className="text-lg text-center">{data.phone}</div>
                </td>
                <td className="p-2 whitespace-nowrap">
                    <Link href={{ pathname: `editProperties`, query: { id: data.uniqueId } }}>
                        <div>
                            <PencilAltIcon className='h-6 w-6 text-blue-400 cursor-pointer' />
                        </div>

                    </Link>
                </td>
                <td className="p-2 whitespace-nowrap">
                    <TrashIcon onClick={deleteProperty} className='h-6 w-6 text-red-400 cursor-pointer' />
                </td>
            </tr>
            {
                show && (
                    <tr>
                        <td colSpan={6} className='p-2'>
                            <div>
                                <div>
                                    {data.veneuType}
                                </div>
                                <div className='flex'>
                                    <li></li>

                                </div>
                            </div>
                        </td>

                    </tr>
                )
            }
        </>
    )
}

export default Property
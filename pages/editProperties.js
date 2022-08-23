import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import AddEditForm from '../components/AddEditForm'
import { db } from "../firebase"
import { doc, getDoc } from 'firebase/firestore';

function EditPage() {
    const router = useRouter();
    const id = router.query.id;
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(async () => {
        const docRef = doc(db, "property", id)
        const docSnap = await getDoc(docRef);
        const propertyData = docSnap.data();
        setData(propertyData);
        setLoading(false);
    }, [])

    return (
        <div>
            {loading ? (
                <div className='min-h-screen flex justify-center align-middle'>
                    <h1>Loading data</h1>
                </div>
            ) : (
                <div className='p-2 md:p-5 bg-gray-50'>
                    <AddEditForm data={data} edit={true} />
                </div>
            )}
        </div>

    )
}

export default EditPage
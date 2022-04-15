import React from 'react'
import LeadsDetails from '../components/LeadsDetails'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Login from "../components/Login";
import { onSnapshot, collection, query } from "firebase/firestore"
import { db } from "../firebase";

function leads() {
    const [data, setData] = useState([]);

    useEffect(
        () =>
            onSnapshot(
                query(collection(db, "leads")),
                (snapshot) => {
                    setData(snapshot.docs.map((doc) => {
                        return {
                            id: doc.id,
                            data: doc.data()
                        }
                    }));
                }
            ),
        [db]
    );
    console.log(data);
    const { data: session } = useSession();
    if (!session) {
        return <Login />
    }

    return (
        <div className='px-5 bg-gray-50'>
            <h1 className='py-5 font-bold text-gray-700 font-Montserrat text-3xl'>Leads</h1>
            <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-lg border border-gray-200">
                <div className="p-3">
                    <div className="overflow-x-auto">
                        <table className="table-fixed w-full">
                            <thead className="text-sm font-Roboto tracking-wider uppercase text-gray-400 bg-gray-50 rounded-sm">
                                <tr>
                                    <th className="p-2">
                                        <div className="font-semibold text-left">Name</div>
                                    </th>
                                    <th className="p-2">
                                        <div className="font-semibold text-center">Email</div>
                                    </th>
                                    <th className="p-2">
                                        <div className="font-semibold text-center">Location</div>
                                    </th>
                                    <th className="p-2">
                                        <div className="font-semibold text-center">Phone</div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-sm font-medium">
                                {
                                    data.map((lead) => {
                                        return (
                                            <LeadsDetails key={lead.id} name={lead.data.name} phone={lead.data.phone} email={lead.data.email} location={lead.data.location} query={lead.data.query} />
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default leads
import { useEffect, useState } from "react"
import { onSnapshot, collection, orderBy, query } from "firebase/firestore"
import { db } from "../firebase";
import { useSession } from 'next-auth/react'
import Login from "../components/Login";

function viewProperties() {
    const [properties, setProperties] = useState([]);
    useEffect(
        () =>
          onSnapshot(
            query(collection(db, "property")),
            (snapshot) => {
              setProperties(snapshot.docs);
            }
          ),
          [db]
        );
    console.log(properties);
    const {data: session} = useSession();
    if(!session){
        return <Login/>
    }
    return (
      <div className="grid grid-cols-6">
    <div className="col-span-4 col-start-2 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Properties</h2>
      </header>
      <div className="p-3">

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-400 bg-slate-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">UID</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Venue Name</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Address</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Manager's name</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Phone no</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-100">
              {
                properties.map(property => {
                  return (
                    <tr key={property.id}>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{property.data().uniqueId}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="font-medium text-slate-800">{property.data().venueName}</div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{property.data().address}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left font-medium text-green-500">{property.data().name}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-lg text-center">{property.data().phone}</div>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

        </div>
        {
          properties.map((property) => {
            console.log(property.name);
          })
        }

      </div>
    </div>
    </div>
    )
}

export default viewProperties

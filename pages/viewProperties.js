import { useEffect, useState } from "react"
import { onSnapshot, collection, query } from "firebase/firestore"
import { db } from "../firebase";
import { useSession } from 'next-auth/react'
import Login from "../components/Login";
import Property from "../components/Property";

function viewProperties() {
  const [properties, setProperties] = useState([]);
  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "property")),
        (snapshot) => {
          setProperties(snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              data: doc.data(),
            }
          }));
        }
      ),
    [db]
  );
  const { data: session } = useSession();
  if (!session) {
    return <Login />
  }
  return (
    <div className="grid grid-cols-6 p-5">
      <h1 className='pb-5 font-bold text-gray-700 font-Montserrat text-3xl'>Properties</h1>
      <div className="col-span-6 bg-white shadow-lg rounded-lg border border-gray-200">
        <div className="p-3">
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              {/* Table header */}
              <thead className="text-sm font-Roboto tracking-wider uppercase text-gray-400 bg-slate-50 rounded-sm">
                <tr>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">UID</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Venue Name</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">City</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Manager's name</div>
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
                      <Property key={property.id} id={property.id} data={property.data} />
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

export default viewProperties

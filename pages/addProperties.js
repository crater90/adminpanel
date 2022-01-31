import { useState } from 'react'
import { db, storage } from "../firebase"
import { addDoc, collection, updateDoc, doc, setDoc } from "firebase/firestore"
import ListingType from '../components/ListingType'
import Dropzone from '../components/Dropzone'
import { ref, getDownloadURL, uploadString } from 'firebase/storage'
import { getSession } from 'next-auth/react';


function addProperties() {

    const [values, setValues] = useState({
        venueName : '',
        uniqueId : '',
        name : '',
        phone : '',
        email : '',
        secondaryName : '',
        secondaryPhone : '',
        secondaryEmail : '',
        placeId : '',
        city : '',
        state : '',
        address : '',
        landmark : '',
        meetingRoom: [],
        trainingRoom: [],
        privateOffice: [],
    })

    const [imageArray, setImageArray] = useState([])

    const [urls, SetUrls] = useState([])
    
    const [coworkingSpace, setCoworkingSpace] = useState({
        seater: '',
        price: '',
    });
    const [virtualOffice, setVirtualOffice] = useState({
        available: '',
        price: '',
    })

    // const [loading, setLoading] = useState(false)
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const docRef = await addDoc(collection(db, "property"), values)

         imageArray.image.map(async (img) => {
             const imageRef = ref(storage, `property/${docRef.id}/${Date.now()}`);
             await uploadString(imageRef, img, "data_url").then( async snapshot => {
                 const downloadUrl = await getDownloadURL(imageRef);
                 SetUrls(urls => [...urls, downloadUrl])
                 await setDoc(doc(db, `property/${docRef.id}/photos`, `${Date.now()}`), {
                    image: downloadUrl
                })
            })
        })
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setValues({...values, [name] : value})
    }

    const handleCoworking = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setCoworkingSpace({...coworkingSpace, [name] : value})
    }

    const handleVirtual = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setVirtualOffice({...virtualOffice, [name] : value})
    }

    return (
        <div className="p-2 md:p-5 bg-gray-50">
            <form className="grid grid-cols-6 gap-6" onSubmit={handleSubmit}>
                <div className="col-span-6 md:col-span-4">
                    <label className="labelcss" htmlFor="grid-first-name">
                        Venue Name
                    </label>
                    <input className="inputcss" name='venueName' onChange={handleChange} id="grid-first-name" type="text" placeholder="Jane" />
                </div>
                <div className="col-span-6 md:col-span-2">
                    <label className="labelcss" htmlFor="grid-second-name">
                        Unique Id
                    </label>
                     <input className="inputcss" name='uniqueId' onChange={handleChange} id="grid-second-name" type="text" placeholder="LKO0012"/>
                </div>
                <div className="col-span-2">
                    <label className="labelcss" htmlFor="grid-name">
                        Name
                    </label>
                     <input className="inputcss" name='name' onChange={handleChange} id="grid-name" type="text" placeholder="Jane"/>
                </div>
                <div className="col-span-2">
                    <label className="labelcss" htmlFor="grid-phone">
                        Phone
                    </label>
                     <input className="inputcss" name='phone' onChange={handleChange} id="grid-phone" type="text" placeholder="9564231221"/>
                </div>
                <div className="col-span-2">
                    <label className="labelcss" htmlFor="grid-email">
                        Email
                    </label>
                     <input className="inputcss" name='email' onChange={handleChange} id="grid-email" type="email" placeholder="Jane78@gmail.com"/>
                </div>
                <h1 className="col-span-6">Optional</h1>
                <div className="col-span-2">
                    <label className="labelcss" htmlFor="grid-name">
                        Name
                    </label>
                     <input className="inputcss" name='secondaryName' onChange={handleChange} id="grid-name" type="text" placeholder="Jane"/>
                </div>
                <div className="col-span-2">
                    <label className="labelcss" htmlFor="grid-phone">
                        Phone
                    </label>
                     <input className="inputcss" name='secondaryPhone' onChange={handleChange} id="grid-phone" type="text" placeholder="9564231221"/>
                </div>
                <div className="col-span-2">
                    <label className="labelcss" htmlFor="grid-email">
                        Email
                    </label>
                     <input className="inputcss" name='secondaryEmail' onChange={handleChange} id="grid-email" type="text" placeholder="Jane78@gmail.com"/>
                </div>
                <h1 className="col-span-6">Location</h1>
                <div className="col-span-2">
                    <label className="labelcss" htmlFor="grid-placeId">
                        Place id
                    </label>
                     <input className="inputcss" name='placeId' onChange={handleChange} id="grid-placeId" type="text" />
                </div>
                <div className="col-span-2">
                    <label className="labelcss" htmlFor="grid-state">
                        State
                    </label>
                     <input className="inputcss" name='state' onChange={handleChange} id="grid-state" type="text" />
                </div>
                <div className="col-span-2">
                    <label className="labelcss" htmlFor="grid-city">
                        City
                    </label>
                     <input className="inputcss" name='city' onChange={handleChange} id="grid-city" type="text" />
                </div>
                <div className="col-span-3">
                    <label className="labelcss" htmlFor="grid-address">
                        Address
                    </label>
                     <textarea rows={3} onChange={handleChange} className="inputcss" name='address' id="grid-address" type="text" />
                </div>
                <div className="col-span-3">
                    <label className="labelcss" htmlFor="grid-landmark">
                        Landmark
                    </label>
                     <textarea rows={3} onChange={handleChange} className="inputcss" name='landmark' id="grid-landmark" type="text" />
                </div>
                
                <div className='col-span-3 bg-gray-100 border border-gray-200 p-5 rounded-md'>
                    <h1 className='heading'>Coworking Space</h1>
                    <div className="flex items-center justify-between">
                        <label className="labelcss" htmlFor="seater">dedicated seats</label>
                        <input className="inputcss w-1/2" name='seater' onChange={handleCoworking}  id="seater" />
                    </div>
                    <div className="flex items-center justify-between">
                        <label className="labelcss" htmlFor="price">price/month/person</label>
                        <input className="inputcss w-1/2" name='price' onChange={handleCoworking} id="price" />
                    </div>   
                </div>

                <div className='col-span-3 bg-gray-100 border border-gray-200 p-5 rounded-md'>
                    <h1 className='heading'>Virtual Office</h1>
                    <div className="flex items-center justify-between">
                        <label className="labelcss" htmlFor="seater">Available</label>
                        <input className="inputcss w-1/2" name='available' onChange={handleVirtual} id="seater" />
                    </div>
                    <div className="flex items-center justify-between">
                        <label className="labelcss" htmlFor="price">price/year</label>
                        <input className="inputcss w-1/2" id="price" name='price' onChange={handleVirtual} />
                    </div>   
                </div>

                <div className='col-span-6 bg-gray-100 border border-gray-200 p-5 rounded-md'>
                    <ListingType type={"Meeting room"} values={values} setValues={setValues} typeCamel={"meetingRoom"}/>
                </div>
                <div className='col-span-6 bg-gray-100 border border-gray-200 p-5 rounded-md'>
                    <ListingType type={"Training room"} values={values} setValues={setValues} typeCamel={"trainingRoom"}/>
                </div>
                <div className='col-span-6 bg-gray-100 border border-gray-200 p-5 rounded-md'>
                    <ListingType type={"Private Office"} values={values} setValues={setValues} typeCamel={"privateOffice"}/>
                </div>

                <div className='col-span-6'>
                    <Dropzone values={imageArray} setValues={setImageArray} />
                </div>

                
                <div className="col-span-6">
                    <button type='submit' className="inline-flex w-full justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                     {/* {loading ? "Saving to database" : "Save"} */} Save
                    </button>
                </div>
                               

            </form>         
        </div>
    )
}

export default addProperties

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)
  if (!session) {
    return {
     redirect: {
     destination: 'api/auth/signin', //redirect user to homepage
     permanent: false,
     }
    }
   }
  return {
    props: {
      user: session.user,
    },
  }
}
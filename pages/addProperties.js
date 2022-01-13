import { useState } from 'react'
import { db } from "../firebase"
import { addDoc, collection } from "firebase/firestore"
import ListingType from '../components/ListingType'


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
    })
    const [images, setImages] = useState([])
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        await addDoc(collection(db, "property"), values)
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setValues({...values, [name] : value})
    }

    // const handleImage = (e) => {
    //     if(e.target.files){
    //         const fileArray = Array.from(e.target.files).map((file)=> URL.createObjectURL(file))
    //         setImages((prev)=> prev.concat(fileArray))
    //         console.log(fileArray)
    //         Array.from(e.target.file).map((file)=> URL.revokeObjectURL(file))
    //     }

    //}
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
                        <input className="inputcss w-1/2" id="seater" />
                    </div>
                    <div className="flex items-center justify-between">
                        <label className="labelcss" htmlFor="price">price/month/person</label>
                        <input className="inputcss w-1/2" id="price" />
                    </div>   
                </div>

                <div className='col-span-3 bg-gray-100 border border-gray-200 p-5 rounded-md'>
                    <h1 className='heading'>Virtual Office</h1>
                    <div className="flex items-center justify-between">
                        <label className="labelcss" htmlFor="seater">Available</label>
                        <input className="inputcss w-1/2" id="seater" />
                    </div>
                    <div className="flex items-center justify-between">
                        <label className="labelcss" htmlFor="price">price/year</label>
                        <input className="inputcss w-1/2" id="price" />
                    </div>   
                </div>

                <div className='col-span-6 bg-gray-100 border border-gray-200 p-5 rounded-md'>
                    <ListingType type={"Meeting room"}/>
                </div>
                <div className='col-span-6 bg-gray-100 border border-gray-200 p-5 rounded-md'>
                    <ListingType type={"Training room"}/>
                </div>
                <div className='col-span-6 bg-gray-100 border border-gray-200 p-5 rounded-md'>
                    <ListingType type={"Private Office"}/>
                </div>

                

                <div className='col-span-6'>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                            <span>Upload a file</span>
                            <input id="file-upload" multiple name="file-upload" type="file" className="sr-only"/>
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                      </div>
                    </div>         
                </div>
                
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Save
                    </button>
                </div>
                               

            </form>            
        </div>
    )
}

export default addProperties


import { db, storage } from "../firebase"
import { addDoc, collection, updateDoc, doc, arrayUnion, setDoc } from "firebase/firestore"
import Dropzone from '../components/Dropzone'
import { ref, getDownloadURL, uploadString } from 'firebase/storage'
import { useSession } from 'next-auth/react'
import Login from '../components/Login'
import { Formik, Field, Form, FieldArray } from 'formik'
import { PlusIcon, MinusIcon } from '@heroicons/react/outline'
import { useRecoilState } from 'recoil'
import { imageAtom } from '../atoms/formAtom'
import { ChevronDownIcon } from '@heroicons/react/outline'
import { toast } from 'react-toastify'


function addProperties() {

    const [imageArray, setImageArray] = useRecoilState(imageAtom);

    const initialForm = {
        type: '',
        venueName: '',
        uniqueId: '',
        name: '',
        phone: '',
        email: '',
        secondaryName: '',
        secondaryPhone: '',
        secondaryEmail: '',
        title: '',
        description: '',
        placeId: '',
        address: {
            street: '',
            micromarket: '',
            landmark: '',
            city: '',
            state: '',
            pinCode: ''
        },
        coworkingSpace: {
            dedicatedSeats: '',
            pricePerPerson: '',
            dayPass: ''
        },
        virtualOffice: {
            available: false,
            pricePerYear: '',
        },
        meetingRoom: [
            {
                price: '',
                seater: '',
            },
        ],
        trainingRoom: [
            {
                price: '',
                seater: '',
            },
        ],
        privateOffice: [
            {
                price: '',
                seater: '',
            },
        ],
        photos: [],
        area: '',
        rentPerSqft: '',
        totalRent: '',
        amenities: {
            carParking: false,
            cafeteria: false,
            ac: false,
            visitorsLounge: false,
            lockerStorage: false,
            wifi: false,
            frontDesk: false,
            recreationRoom: false,
            powerBackup: false,
            printer: false,
            mailingAddress: false,
            teaCoffee: false,
            photocopier: false,
            landline: false,
            speaker: false,
            pvtMeetingRoom: false,
            projector: false,
            videoConferencing: false,
            nightShift: false,
            lift: false,
            furnished: false,
            hrs24: false,
        },
        openHours: {
            saturday: false,
            sunday: false,
            startTime: '',
            endTime: '',
            internetSpeed: '',
            seatSize: '',
            addInclusions: ''
        },
        compliances: {
            fireCompliances: '',
            rentalAgreement: '',
            buildingPropertyTax: '',
        }
    }

    const state = [
        'Andaman and Nicobar Islands',
        'Andhra Pradesh',
        'Arunachal Pradesh',
        'Assam',
        'Bihar',
        'Chandigarh',
        'Chattisgarh',
        'Dadra and Nagar Haveli',
        'Daman and Diu',
        'Delhi',
        'Goa',
        'Gujarat',
        'Haryana',
        'Himachal Pradesh',
        'Jammu and Kashmir',
        'Jharkhand',
        'Karnataka',
        'Kerela',
        'Ladakh',
        'Lakshadweep',
        'Madhya Pradesh',
        'Maharashtra',
        'Manipur',
        'Meghalaya',
        'Mizoram',
        'Nagaland',
        'Odisha',
        'Puducherry',
        'Punjab',
        'Rajasthan',
        'Sikkim',
        'Tamil Nadu',
        'Telangana',
        'Tripura',
        'Uttar Pradesh',
        'Uttarakhand',
        'West Bengal'
    ]

    const secondaryOptions = [
        { value: 'new-delhi', label: 'New Delhi' },
        { value: 'vishakhapatnam', label: 'Vishakhapatnam' },
        { value: 'jodhpur', label: 'Jodhpur' },
        { value: 'mumbai', label: 'Mumbai' },
        { value: 'noida', label: 'Noida' },
        { value: 'bangalore', label: 'Bangalore' },
        { value: 'chennai', label: 'Chennai' },
        { value: 'hyderabad', label: 'Hyderabad' },
        { value: 'indore', label: 'Indore' },
        { value: 'kanpur', label: 'Kanpur' },
        { value: 'allahabad', label: 'Allahabad' },
        { value: 'jamshedpur', label: 'Jamshedpur' },
        { value: 'nasik', label: 'Nasik' },
        { value: 'bir', label: 'Bir' },
        { value: 'mysuru', label: 'Mysuru' },
        { value: 'vijaywada', label: 'Vijaywada' },
        { value: 'mangalore', label: 'Mangalore' },
        { value: 'guwahati', label: 'Guwahati' },
        { value: 'lucknow', label: 'Lucknow' },
        { value: 'dehradun', label: 'Dehradun' },
        { value: 'nagpur', label: 'Nagpur' },
        { value: 'coimbatore', label: 'Coimbatore' },
        { value: 'bhopal', label: 'Bhopal' },
        { value: 'bhubaneswar', label: 'Bhubaneswar' },
        { value: 'trivandrum', label: 'Trivandrum' },
        { value: 'udaipur', label: 'Udaipur' },
        { value: 'dharmshala', label: 'Dharmshala' },
        { value: 'ranchi', label: 'Ranchi' },
        { value: 'raipur', label: 'Raipur' },
        { value: 'patna', label: 'Patna' },
        { value: 'cochin', label: 'Cochin' },
        { value: 'jabalpur', label: 'Jabalpur' },
        { value: 'pondicherry', label: 'Pondicherry' },
        { value: 'agra', label: 'Agra' },
        { value: 'jammu', label: 'Jammu' },
        { value: 'kota', label: 'Kota' },
        { value: 'meerut', label: 'Meerut' },
        { value: 'goa', label: 'Goa' },
        { value: 'ahmedabad', label: 'Ahmedabad' },
        { value: 'baroda', label: 'Baroda' },
        { value: 'surat', label: 'Surat' },
        { value: 'chandigarh', label: 'Chandigarh' },
        { value: 'gurgaon', label: 'Gurgaon' },
        { value: 'pune', label: 'Pune' },
        { value: 'faridabad', label: 'Faridabad' },
        { value: 'kolkata', label: 'Kolkata' },
        { value: 'jaipur', label: 'Jaipur' },
    ]

    const { data: session } = useSession();
    if (!session) {
        return <Login />
    }

    return (
        <div className="p-2 md:p-5 bg-gray-50">
            <Formik initialValues={initialForm} onSubmit={async (values, { resetForm }) => {
                const docId = values.uniqueId;
                await setDoc(doc(db, "property", `${docId}`), values)

                await Promise.all(imageArray.map(async (img) => {
                    const imageRef = ref(storage, `property/${docId}/${Date.now()}`);
                    await uploadString(imageRef, img, "data_url").then(async snapshot => {
                        const downloadUrl = await getDownloadURL(imageRef);
                        await updateDoc(doc(db, 'property', docId), {
                            photos: arrayUnion(downloadUrl)
                        })
                    })
                }))
                toast.success('Form uploaded Successfully');
                setImageArray([]);
                resetForm();
            }}>
                {({ values }) => (
                    <Form>
                        <h1 className='py-2 text-3xl font-Montserrat font-bold text-gray-700'>General Details</h1>

                        <div className='p-4 mb-2 border border-gray-200 shadow-sm bg-white rounded-lg grid grid-cols-6 gap-6'>

                            <div className='relative col-span-6 md:col-span-2'>
                                <label className="labelcss" htmlFor="type">Venue Type</label>
                                <Field as='select' className="inputcss" name='type' id="type" >
                                    <option defaultValue={null} hidden>Choose Venue Type</option>
                                    <option value={0}>Coworking Space</option>
                                    <option value={1}>Commercial</option>
                                </Field>
                                <div class="pointer-events-none absolute bottom-2.5 right-0 flex items-center px-2 text-gray-700">
                                    <ChevronDownIcon className='h-4 w-4' />
                                </div>
                            </div>

                            <div className='col-span-6 md:col-span-2'>
                                <label className="labelcss" htmlFor="venueName">Venue Name</label>
                                <Field className="inputcss" id="venueName" name="venueName" placeholder="ABC workspaces" />
                            </div>

                            <div className='col-span-6 md:col-span-2'>
                                <label className="labelcss" htmlFor="uid">Unique Id</label>
                                <Field className="inputcss" name='uniqueId' id="uid" type="text" placeholder="LKO0012" />
                            </div>

                            <div className='col-span-6 md:col-span-2'>
                                <label className="labelcss" htmlFor="name">Name</label>
                                <Field className="inputcss" name='name' id="name" type="text" placeholder="Manoj Kumar" />
                            </div>

                            <div className='col-span-6 md:col-span-2'>
                                <label className='labelcss' htmlFor='phone'>Phone</label>
                                <Field className='inputcss' name='phone' id='phone' type='tel' placeholder='91313813693' />
                            </div>

                            <div className="col-span-6 md:col-span-2">
                                <label className="labelcss" htmlFor="grid-email">Email</label>
                                <Field className="inputcss" name='email' id="grid-email" type="email" placeholder="Jane78@gmail.com" />
                            </div>

                            <div className="col-span-6 md:col-span-2">
                                <label className="labelcss" htmlFor="title">Title</label>
                                <Field className="inputcss" name='title' id="title" type="text" />
                            </div>

                            <div className='col-span-6'>
                                <label className="labelcss" htmlFor="description">Description</label>
                                <Field as='textarea' rows={3} className="inputcss" name='description' id="description" type="text" />
                            </div>

                        </div>

                        <h1 className='py-2 col-span-6 text-3xl font-Montserrat font-bold text-gray-700'>Optional</h1>

                        <div className='p-4 mb-2 border border-gray-200 bg-white shadow-sm rounded-lg grid grid-cols-6 gap-6'>

                            <div className='col-span-6 md:col-span-2'>
                                <label className="labelcss" htmlFor="secondaryName">Name</label>
                                <Field className="inputcss" name='secondaryName' id="secondaryName" type="text" placeholder="Manoj Kumar" />
                            </div>

                            <div className='col-span-6 md:col-span-2'>
                                <label className='labelcss' htmlFor='secondaryPhone'>Phone</label>
                                <Field className='inputcss' name='secondaryPhone' id='secondaryPhone' type='tel' placeholder='91313813693' />
                            </div>

                            <div className="col-span-6 md:col-span-2">
                                <label className="labelcss" htmlFor="secondaryEmail">Email</label>
                                <Field className="inputcss" name='secondaryEmail' id="secondaryEmail" type="email" placeholder="Jane78@gmail.com" />
                            </div>

                        </div>

                        <h1 className='py-2 col-span-6 font-Montserrat text-3xl font-bold text-gray-700'>Location</h1>

                        <div className='mb-2 p-4 border border-gray-200 bg-white shadow-sm rounded-lg grid grid-cols-6 gap-6'>

                            <div className='col-span-6'>
                                <label className="labelcss" htmlFor="address">Address</label>
                                <Field as='textarea' rows={3} className="inputcss" name='address.street' id="address" type="text" />
                            </div>

                            <div className='col-span-2'>
                                <label className='labelcss' htmlFor='micromarket'>Micromarket</label>
                                <Field className='inputcss' name='address.micromarket' id='micromarket' type='text' />
                            </div>

                            <div className='col-span-2'>
                                <label className='labelcss' htmlFor='landmark'>Landmark</label>
                                <Field className='inputcss' name='address.landmark' id='landmark' type='text' />
                            </div>

                            <div className='col-span-2'>
                                <label className="labelcss" htmlFor="placeId">Place id</label>
                                <Field className="inputcss" name='placeId' id="placeId" />
                            </div>

                            <div className='relative col-span-2'>
                                <label className="labelcss" htmlFor="city">City</label>
                                <Field as='select' className="inputcss" name='address.city' id="city" >
                                    <option defaultValue={0} hidden>Choose city</option>
                                    {secondaryOptions.map((item) => {
                                        return (
                                            <option key={item.value} value={item.label}>{item.label}</option>
                                        )
                                    })}

                                </Field>
                                <div class="pointer-events-none absolute bottom-2.5 right-0 flex items-center px-2 text-gray-700">
                                    <ChevronDownIcon className='h-4 w-4' />
                                </div>
                            </div>

                            <div className='col-span-2'>
                                <label className="labelcss" htmlFor="state">State</label>
                                <Field className="inputcss" name='address.state' id="state" type='text' />
                            </div>

                            <div className='col-span-2'>
                                <label className="labelcss" htmlFor="pincode">Pin code</label>
                                <Field className="inputcss" name='address.pinCode' id="pincode" type='text' />
                            </div>
                        </div>

                        {values.type === '0' &&
                            <div className='mt-6 grid grid-cols-6 gap-6'>

                                <div className='col-span-3 bg-gray-100 border border-gray-200 p-5 rounded-md'>
                                    <h1 className='heading'>Coworking Space</h1>
                                    <div className="flex items-center justify-between mb-3">
                                        <label className="labelcss" htmlFor="seater">dedicated seats</label>
                                        <Field className="inputcss w-1/2" name='coworkingSpace.dedicatedSeats' id="seater" />
                                    </div>
                                    <div className="flex items-center justify-between mb-3">
                                        <label className="labelcss" htmlFor="price">price/month/person</label>
                                        <Field className="inputcss w-1/2" name='coworkingSpace.pricePerPerson' id="price" />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <label className="labelcss" htmlFor="dayPass">Day Pass</label>
                                        <Field className="inputcss w-1/2" name='coworkingSpace.dayPass' id="dayPass" />
                                    </div>
                                </div>

                                <div className='col-span-3 bg-gray-100 border border-gray-200 p-5 rounded-md'>
                                    <h1 className='heading'>Virtual Office</h1>
                                    <div className="flex items-center justify-between mb-3">
                                        <label className="labelcss" htmlFor="available">Available</label>
                                        <Field as='select' className='inputcss w-1/2' name='virtualOffice.available' id="available" >
                                            <option value='false'>No</option>
                                            <option value='true'>Yes</option>
                                        </Field>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <label className="labelcss" htmlFor="price">price/year</label>
                                        <Field className="inputcss w-1/2" id="price" name='virtualOffice.pricePerYear' />
                                    </div>
                                </div>

                                <div className='col-span-6 md:col-span-2 bg-gray-100 border border-gray-200 p-5 rounded-md'>
                                    <h1 className='heading'>Meeting Room</h1>
                                    <FieldArray name='meetingRoom'>
                                        {({ insert, remove, push }) => (
                                            <div>
                                                {values.meetingRoom.length > 0 &&
                                                    values.meetingRoom.map((room, index) => (
                                                        <div className='grid grid-cols-2' key={index}>
                                                            <div className="col-span-1">
                                                                <label className='labelcss' htmlFor={`meetingRoom.${index}.seater`}>Seater</label>
                                                                <Field
                                                                    name={`meetingRoom.${index}.seater`}
                                                                    type="text"
                                                                    className='inputcss mb-3'
                                                                />
                                                                <label className='labelcss' htmlFor={`meetingRoom.${index}.price`}>Price</label>
                                                                <Field
                                                                    name={`meetingRoom.${index}.price`}
                                                                    type="text"
                                                                    className='inputcss mb-3'
                                                                />
                                                            </div>
                                                            <div className="flex flex-col items-center justify-center gap-y-2">
                                                                {
                                                                    values.meetingRoom.length !== 1 &&
                                                                    <div className="rounded-md py-1 px-2 shadow bg-gray-700">
                                                                        <MinusIcon className="h-5 w-5 text-white cursor-pointer" onClick={() => remove(index)} />
                                                                    </div>
                                                                }
                                                                {
                                                                    values.meetingRoom.length - 1 === index &&
                                                                    <div className="rounded-md py-1 px-2 shadow bg-gray-700">
                                                                        <PlusIcon className='cursor-pointer h-5 w-5 text-white' onClick={() => push({ seater: '', price: '' })} />
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    ))}
                                            </div>
                                        )}

                                    </FieldArray>
                                </div>

                                <div className='col-span-6 md:col-span-2 bg-gray-100 border border-gray-200 p-5 rounded-md'>
                                    <h1 className='heading'>Training Room</h1>
                                    <FieldArray name='trainingRoom'>
                                        {({ insert, remove, push }) => (
                                            <div>
                                                {values.trainingRoom.length > 0 &&
                                                    values.trainingRoom.map((room, index) => (
                                                        <div className='grid grid-cols-2' key={index}>
                                                            <div className="col-span-1">
                                                                <label className='labelcss' htmlFor={`trainingRoom.${index}.seater`}>Seater</label>
                                                                <Field
                                                                    name={`trainingRoom.${index}.seater`}
                                                                    type="text"
                                                                    className='inputcss mb-3'
                                                                />
                                                                <label className='labelcss' htmlFor={`trainingRoom.${index}.price`}>Price</label>
                                                                <Field
                                                                    name={`trainingRoom.${index}.price`}
                                                                    type="text"
                                                                    className='inputcss mb-3'
                                                                />
                                                            </div>
                                                            <div className="flex flex-col items-center justify-center gap-y-2">
                                                                {
                                                                    values.trainingRoom.length !== 1 &&
                                                                    <div className="rounded-md py-1 px-2 shadow bg-gray-700">
                                                                        <MinusIcon className="h-5 w-5 text-white cursor-pointer" onClick={() => remove(index)} />
                                                                    </div>
                                                                }
                                                                {
                                                                    values.trainingRoom.length - 1 === index &&
                                                                    <div className="rounded-md py-1 px-2 shadow bg-gray-700">
                                                                        <PlusIcon className='cursor-pointer h-5 w-5 text-white' onClick={() => push({ seater: '', price: '' })} />
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    ))}
                                            </div>
                                        )}

                                    </FieldArray>
                                </div>

                                <div className='col-span-6 md:col-span-2 bg-gray-100 border border-gray-200 p-5 rounded-md'>
                                    <h1 className='heading'>Private Office</h1>
                                    <FieldArray name='privateOffice'>
                                        {({ insert, remove, push }) => (
                                            <div>
                                                {values.privateOffice.length > 0 &&
                                                    values.privateOffice.map((room, index) => (
                                                        <div className='grid grid-cols-2' key={index}>
                                                            <div className="col-span-1">
                                                                <label className='labelcss' htmlFor={`privateOffice.${index}.seater`}>Seater</label>
                                                                <Field
                                                                    name={`privateOffice.${index}.seater`}
                                                                    type="text"
                                                                    className='inputcss mb-3'
                                                                />
                                                                <label className='labelcss' htmlFor={`privateOffice.${index}.price`}>Price</label>
                                                                <Field
                                                                    name={`privateOffice.${index}.price`}
                                                                    type="text"
                                                                    className='inputcss mb-3'
                                                                />
                                                            </div>
                                                            <div className="flex flex-col items-center justify-center gap-y-2">
                                                                {
                                                                    values.privateOffice.length !== 1 &&
                                                                    <div className="rounded-md py-1 px-2 shadow bg-gray-700">
                                                                        <MinusIcon className="h-5 w-5 text-white cursor-pointer" onClick={() => remove(index)} />
                                                                    </div>
                                                                }
                                                                {
                                                                    values.privateOffice.length - 1 === index &&
                                                                    <div className="rounded-md py-1 px-2 shadow bg-gray-700">
                                                                        <PlusIcon className='cursor-pointer h-5 w-5 text-white' onClick={() => push({ seater: '', price: '' })} />
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    ))}
                                            </div>
                                        )}

                                    </FieldArray>
                                </div>

                            </div>
                        }
                        {values.type === '1' &&
                            <div>
                                <h1 className='py-2 col-span-6 text-3xl font-Montserrat font-bold text-gray-700'>Commercial Space Details</h1>
                                <div className='mb-2 p-4 border border-gray-200 bg-white shadow-sm rounded-lg grid grid-cols-6 gap-6'>

                                    <div className='col-span-2'>
                                        <label className='labelcss' htmlFor='area'>Area Available</label>
                                        <Field className='inputcss' name='area' id='area' type='text' />
                                    </div>

                                    <div className='col-span-2'>
                                        <label className='labelcss' htmlFor='rentPerSqft'>Rent/sqft</label>
                                        <Field className='inputcss' name='rentPerSqft' id='rentPerSqft' type='text' />
                                    </div>

                                    <div className='col-span-2'>
                                        <label className='labelcss' htmlFor='totalRent'>Total rent</label>
                                        <Field className='inputcss' name='totalRent' id='totalRent' type='text' />
                                    </div>

                                </div>
                            </div>
                        }

                        <h1 className='py-2 col-span-6 font-Montserrat text-3xl font-bold text-gray-700'>Services and Compliances</h1>

                        <div className='p-4 mb-2 border border-gray-200 shadow-sm rounded-lg bg-white grid grid-cols-6 gap-6'>

                            <h1 className='col-span-6 font-Montserrat font-semibold text-xl text-gray-700'>Amenities</h1>

                            {Object.keys(values.amenities).map(amenity => {
                                return (
                                    <div className='col-span-3 md:col-span-2 lg:col-span-1'>
                                        <div className='flex items-center gap-2'>
                                            <Field type="checkbox" className='w-4 h-4' id={amenity} name={`amenities.${amenity}`} />
                                            <label className='' htmlFor={amenity}>{amenity}</label>
                                        </div>
                                    </div>
                                )
                            })}

                            <h1 className='border-t border-gray-200 pt-4 col-span-6 text-gray-700 text-xl font-semibold font-Montserrat'>Open Hours</h1>

                            <div className='flex items-center gap-2'>
                                <Field type="checkbox" id='saturday' name='openHours.saturday' />
                                <label className='' htmlFor='saturday'>Saturday</label>
                            </div>

                            <div className='flex items-center gap-2'>
                                <Field type="checkbox" id='sunday' name='openHours.sunday' />
                                <label className='' htmlFor='sunday'>Sunday</label>
                            </div>

                            <div className='col-span-2'>
                                <label className='labelcss' htmlFor='startTime'>Start Time</label>
                                <Field className='inputcss w-1/2' name='startTime' id='startTime' type='text' />

                            </div>

                            <div className='col-span-2'>
                                <label className='labelcss' htmlFor='endTime'>End Time</label>
                                <Field className='inputcss w-1/2' name='endTime' id='endTime' type='text' />
                            </div>

                            <div className='col-span-2'>
                                <label className='labelcss' htmlFor='internetSpeed'>Internet Speed</label>
                                <Field className='inputcss w-1/2' name='internetSpeed' id='internetSpeed' type='text' />
                            </div>

                            <div className='col-span-2'>
                                <label className='labelcss' htmlFor='seatSize'>Seat Size</label>
                                <Field className='inputcss w-1/2' name='seatSize' id='seatSize' type='text' />
                            </div>

                            <div className='col-span-2'>
                                <label className='labelcss' htmlFor='addInclusions'>Add Inclusions</label>
                                <Field className='inputcss w-1/2' name='addInclusions' id='addInclusions' type='text' />
                            </div>

                            <h1 className='border-t border-gray-200 pt-4 col-span-6 text-gray-700 text-xl font-semibold font-Montserrat'>Compliances</h1>

                            <div className='col-span-2'>
                                <label className='labelcss' htmlFor='fireCompliances'>Fire Compliances</label>
                                <Field className='inputcss' name='compliances.fireCompliances' id='fireCompliances' type='text' />
                            </div>

                            <div className='col-span-2'>
                                <label className='labelcss' htmlFor='rentalAgreement'>Rental Agreement</label>
                                <Field className='inputcss' name='compliances.rentalAgreement' id='rentalAgreement' type='text' />
                            </div>

                            <div className='col-span-2'>
                                <label className='labelcss' htmlFor='buildingPropertyTax'>Building OC/cc/Property Tax</label>
                                <Field className='inputcss' name='compliances.buildingPropertyTax' id='buildingPropertyTax' type='text' />
                            </div>

                        </div>

                        <h1 className='py-2 col-span-6 font-Montserrat text-3xl font-bold text-gray-700'>Images</h1>

                        <div className='p-4 mb-2 border border-gray-200 shadow-sm rounded-lg bg-white grid grid-cols-6 gap-6'>
                            <div className='col-span-6'>
                                <Dropzone />
                            </div>
                        </div>

                        <div className='py-2 flex items-center justify-center gap-4 text-white'>
                            <button type='reset' className='w-40 px-4 py-2 rounded shadow border border-blue-500 hover:bg-gray-100 text-gray-700 font-bold focus:outline-none'>Reset</button>
                            <button type='submit' className='w-40 px-4 py-2 rounded shadow border border-blue-500 bg-blue-500 hover:bg-blue-700 text-white font-bold focus:outline-none'>Submit</button>
                        </div>
                    </Form>
                )}

            </Formik>

        </div >
    )
}

export default addProperties

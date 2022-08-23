

import { useSession } from 'next-auth/react'
import Login from '../components/Login'
import AddEditForm from "../components/AddEditForm"
import { useState } from 'react'


function addProperties() {

    const [initialForm, setInitialForm] = useState({
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
    })

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

    const { data: session } = useSession();
    if (!session) {
        return <Login />
    }

    return (
        <div className="p-2 md:p-5 bg-gray-50">
            <AddEditForm data={initialForm} edit={false} />
        </div >
    )
}

export default addProperties

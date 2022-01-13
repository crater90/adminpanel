import { useState } from "react";
import { PlusIcon, MinusIcon } from '@heroicons/react/outline'

function ListingType({type}) {
    const [list, setList] = useState([
        {
            price: '',
            seater: ''
        },
    ])
    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const tempList = [...list];
        tempList[index][name] = value;
        setList(tempList);
    }
    const add = () => {
        setList([...list, {
            price: '',
            seater: ''
        }])
    }
    const remove = index => {
        const newList = [...list];
        newList.splice(index, 1);
        setList(newList);
    }
    return (
        <div>
            <h1 className="heading mb-8">{type}</h1>
            {list.map((item, index)=> {
                return(
                    <div className="grid grid-cols-3 place-items-center" key={index}>
                        <div className="col-span-1">
                            <div className="flex items-center justify-between">
                                <label className="labelcss" htmlFor="seater">Seater</label>
                                <input className="inputcss w-1/2" id="seater" name="seater" onChange={e => handleChange(e, index)} value={item.seater}  />
                            </div>
                            <div className="flex items-center justify-between">
                                <label className="labelcss" htmlFor="price">Price</label>
                                <input className="inputcss w-1/2" id="price" name="price" onChange={e => handleChange(e, index)} value={item.price}  />
                            </div>
                        </div>
                            <div className="col-span-1">
                                <div className="flex justify-start space-x-4">
                                {list.length-1 === index && 
                                <div className="rounded-md py-1 px-2 shadow bg-gray-700">
                                    <PlusIcon className="h-6 w-6 text-white cursor-pointer" onClick={add} />
                                </div>
                                }
                                {list.length !== 1 &&
                                <div className="rounded-md py-1 px-2 shadow bg-gray-700">
                                    <MinusIcon className="h-6 w-6 text-white cursor-pointer" onClick={remove}/>
                                </div>
                                }
                                </div>
                            </div> 
                        </div>  
                )
                        

            })}
                        
                                       
                     
                    
        </div>
    )
}

export default ListingType

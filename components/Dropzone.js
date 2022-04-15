import { useDropzone } from 'react-dropzone'
import { useCallback, useState } from 'react'
import { useRecoilState } from 'recoil'

import { imageAtom } from '../atoms/formAtom'

function Dropzone({ refresh }) {

    const [images, setImages] = useRecoilState(imageAtom);

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        acceptedFiles.forEach(file => {
            const reader = new FileReader
            reader.onload = () => {
                setImages(prev => [...prev, reader.result])
            }
            reader.readAsDataURL(file)
        });
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: "image/*",
        maxFiles: 5,
        onDrop,
    })
    return (
        <>
            <div className='mt-1 flex flex-col justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer' {...getRootProps()}>
                <input {...getInputProps()} />
                <div className='p-5 text-center text-gray-600'>
                    {
                        isDragActive ?
                            <p>Drop the files here ...</p> :
                            <p>Drag 'n' drop some files here, or click to select files</p>
                    }
                </div>
                {
                    images.length > 0 &&
                    <div className='grid grid-cols-3 gap-x-3 gap-y-3 '>
                        {
                            images.map((img, index) => {
                                return (
                                    <div className=''>
                                        <img className='h-80 w-80' src={img} alt='preview' key={index} />
                                    </div>
                                )

                            })
                        }
                    </div>
                }
            </div>
        </>
    )
}

export default Dropzone

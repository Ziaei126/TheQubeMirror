import React from 'react'
import Image from 'next/image'

const item = ({title, description, imgs, bg}) => {
  return (
    <div className={`p-5 flex justify-center ${bg}`} >
        <div className="container flex flex-col gap-5 max-w-4xl ">
        <h2 className='inl'>{title}</h2>
        <ul className='list-disc list-inside'>
            {description.map(point => (
                <li>{point}</li>
            ))}
        </ul>
        
        <div className='polaroid-container'>
        {imgs.map(pic => (
            <>
            {!pic.lb && <Polaroid src={pic.src} alt={pic.alt}/>}
        </>
        ))}    
        </div>
        <div className='polaroid-container'>
        {imgs.map(pic => (
            <>
            {pic.lb && <Polaroid src={pic.src} alt={pic.alt}/>}
        </>
        ))}    
        </div>
        </div>     

    </div>
  )
            }

export default item


const Polaroid = ({ src, alt }) => {
    return (
      <div className="polaroid">
        <img src={src} alt={alt} />
        <div className="polaroid-caption">{alt}</div>
      </div>
    );
  };
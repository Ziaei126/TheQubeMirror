import React from 'react'
import Image from 'next/image'

const Explanation = ({title, description, img, more, inverted, bgColor = 'bg-cream'}) => (
  <section className={`${bgColor} flex flex-wrap justify-center min-h-min`}>
      <div className="flex flex-col sm:flex-row p-6 items-center max-w-screen-lg">
          <Image 
              src={img} 
              alt="" 
              className={`p-5 sm:w-1/2 ${inverted ? 'order-0' : 'order-1'}`} 
              width={1000} 
              height={1000} 
          />
          <article className={`p-6 flex-row justify-center ${inverted ? 'order-1' : 'order-0'}`}>
            { title && (
              <h1 className="text-4xl font-bold mb-4 flex-auto">{title}</h1>)}
              <p className="whitespace-pre-wrap">{description}</p>
              {more && (
                  <button className="bg-pastel-orange text-white font-bold mt-10 py-2 px-4 rounded-full">{more}</button>
              )}
          </article>
      </div>
  </section>
);

export default Explanation




"use client"
import { StoreContext } from '@/context/StoreContext'
import React, { useContext, useEffect, useState } from 'react'
import ReviewCard from '@/components/ReviewCard/ReviewCard';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Navbar/Footer';
import { ClipboardCopyButton } from '@/components/Testimonials/Clipboard';

function Page({ params }: { params: any }) {
    const { reviews , getReview} = useContext(StoreContext);    
    const [embed, setembed] = useState(false)
    
    useEffect(() => {
      
     const loadData = async ()=>{

        await getReview(params.slug);
     }
     loadData();
     console.log(reviews);
      
    },[])
    useEffect(() => {
        if (embed) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [embed]);

    const handleClick = ()=>{
      setembed(!embed);
    }

    return (
        <div className='relative'>
            <Navbar/>
            <hr className='mt-10 border border-[#33363B]'/>
            <div className='flex justify-between px-32 my-8 items-center'>
                <div>
                    <h1 className='text-4xl'>Testimonial</h1>
                    <p className='text-sm font-light'>
                        Space public URL: 
                        <a href={`http://localhost:3000/testimonials/${params.slug}`} className='text-blue-600 underline'>
                            http://localhost:3000/testimonials/{params.slug}
                        </a>
                    </p>
                </div>
                <div>
                    <button className='bg-white text-black p-2 rounded'>Edit space</button>
                </div>
            </div>
            <hr className='mt-4 border border-[#33363B]'/>
            <div className='flex mt-10'>
                <div className='pl-36'>
                    <h1 className='text-1xl font-semibold mb-4'>INBOX</h1>
                    <ul className='list-disc ml-4'>
                        <li className='mb-2'>All</li>
                        <li className='mb-2'>Video</li>
                        <li className='mb-2'>Text</li>
                        <li className='mb-2'>Archived</li>
                        <li className='mb-2'>Liked</li>
                    </ul>

                    <h1 className='mt-12 text-1xl font-semibold mb-4'>Embeds & Metrics</h1>
                    <ul className='cursor-pointer'>
                        <li onClick={handleClick} className='mb-2 flex gap-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>
                            Wall of Love
                        </li>
                        <li className='mb-2 flex gap-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                            </svg>
                             Single testimonial
                        </li>
                        <li className='mb-2'>☆ Badge</li>
                        <li className='mb-2'>🗃 Collecting widget</li>
                        <li className='mb-2'>📈 Metrics</li>
                    </ul>
                </div>
                <div className='m-auto'>
                    {reviews.length === 0 ?(<>hello</>):(<>
                    {reviews.map((review,index)=>(
                        <ReviewCard key={index} review={review}/>
                    ))}
                    </>)}
                </div>
            </div>
            {embed?(<>
                <div className='absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10'></div>
                <div className='absolute  bg-white w-2/4 h-fit top-96 z-20 left-[25%] items-center p-2 rounded text-black pb-10'>
                    <div onClick={handleClick} className='flex justify-end cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-black ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <h1 className='text-3xl text-center font-semibold mb-10'>Embed a Wall of Love</h1>
                    <div className='px-4'>
                        <ClipboardCopyButton spaceId={params.slug}/>
                    </div>
                </div>
            </>):(<></>)}
            <iframe src="http://localhost:3000/embeds/671d5126-e629-4add-8afd-26f2b5141b1d" width="100%" height="1000" title="testimonial"></iframe>
            <Footer/>
        </div>
    );
}

export default Page;
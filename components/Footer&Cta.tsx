import Image from 'next/image'
import Link from 'next/link'
import { FaFacebook, FaInstagram, FaLinkedin, FaUser } from 'react-icons/fa'
import { MdLogin } from 'react-icons/md'

const Footer = () => {
  return (
    <div className='bg-black relative'>
      {/* <div className="absolute inset-0 bg-brandGreen/10 z-0"></div> */}
      <div className="">
        <Image src="/lines/bg-line-center.webp" alt="Lines Background" fill className="object-cover z-0" />
        <Image src="/lines/bg-line-left.webp" alt="Lines Background" fill className="object-cover z-0" />
        <Image src="/lines/bg-line-right.webp" alt="Lines Background" fill className="object-cover z-0" />
      </div>
      <section className="bg-black text-white py-10 lg:py-20 my-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal mb-3  tracking-tight leading-tight">
            Start With Intention
          </h2>
          <p className="text-base md:text-lg text-white/80 mb-8 md:mb-10 leading-relaxed max-w-3xl mx-auto">
            Whether you're beginning something new or building on what you already know, Khrien Academy offers a clear and supportive path forward.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-brandPurple text-white font-semibold px-8 md:px-10 py-2.5 md:py-3 rounded-full hover:opacity-90 transition-all duration-300 text-base md:text-lg shadow-md hover:shadow-lg"
          >
            Secure Your Spot
          </Link>
        </div>
      </section>
      <footer className='bg-black h-auto py-20'>
        <div className='max-w-360 mx-auto text-white'>
          <div className="flex flex-col gap-3 justify-center items-center">
            <Image src="/academylogo.webp" alt="Logo" width={150} height={150} />
            <p>A platform for learning and sharing knowledge.</p>
            <div className='nav-buttons flex justify-center gap-4 items-center my-5'>
              <Link
                href="/apply"
                className="flex items-center gap-2 text-center rounded-sm text-white bg-brandPurple px-5 py-2 lg:py-2.5 hover:bg-brandPurple/90 hover:text-white transition-all duration-50 ease-in-out"
              >
                Apply Now
                <FaUser className="text-xl" />
              </Link>
              <a
                href="https://lms.khrien.com"
                target="_blank"
                className="flex items-center gap-2 text-center rounded-sm text-brandGreen bg-black px-5 py-2 lg:py-2 border-2 border-brandGreen hover:bg-brandGreen hover:text-white transition-all duration-200 ease-in-out"
              >
                Login
                <MdLogin className="text-xl" />
              </a>
            </div>
          </div>
          <hr className='my-5 mx-auto max-w-360' />
          <div className='grid grid-cols-1 md:grid-cols-3'>
            <div>
              <p className='text-sm'>&copy; {new Date().getFullYear()} Khrien Academy. All rights reserved.</p>
            </div>
            <div className='social-media flex justify-center gap-5 items-center'>
              <a href='https://www.facebook.com/share/16bZdmZNAb' target='_blank' className=" p-2 bg-white/30 rounded-full">
                <FaFacebook className='text-2xl' />
              </a>
              <a href='https://www.instagram.com/thisis_khrien?igsh=MWJocjI5ZWdsbHF5Zw==' target='_blank' className="p-2 bg-white/30 rounded-full">
                <FaInstagram className='text-2xl' />
              </a>
              <a href='https://www.linkedin.com/company/khrien' target='_blank' className="p-2 bg-white/30 rounded-full">
                <FaLinkedin className='text-2xl' />
              </a>
            </div>
            <div className='flex gap-3 items-center justify-end'>
              <p className='text-sm'>Privacy Policy</p>
              <p className='text-sm'>Terms of Service</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
import Image from 'next/image'
import Link from 'next/link'
import { FaFacebook, FaInstagram, FaLinkedin, FaUser } from 'react-icons/fa'
import { MdLogin } from 'react-icons/md'

const Footer = () => {
  return (
    <div className='bg-black relative'>
      {/* <div className="absolute inset-0 bg-brandGreen/10 z-0"></div> */}
      <div className="relative ">

        {/* LEFT */}
        <Image
          src="/lines/bg-line-left.webp"
          alt="Lines Left"
          width={500}
          height={500}
          className="absolute top-0 left-0 z-0 opacity-90"
        />
        {/* RIGHT */}
        <Image
          src="/lines/bg-line-right.webp"
          alt="Lines Right"
          width={500}
          height={500}
          className="hidden md:block absolute top-4 right-0 z-0 opacity-90"
        />

      </div>
      <section className="text-white lg:h-125 h-75 py-10 lg:py-20 my-6 flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3  tracking-tight leading-tight">
            Start With Intention
          </h2>
          <p className="text-base md:text-lg text-white/80 mb-8 md:mb-10 leading-relaxed max-w-3xl mx-auto">
            Whether you're beginning something new or building on what you already know, Khrien Academy offers a clear and supportive path forward.
          </p>
          <div className="flex justify-center mt-6">
            <Link
              href="/about"
              className="relative inline-block overflow-hidden rounded-sm bg-brandPurple px-6 md:px-8 lg:px-10 py-2.5 md:py-3 text-sm md:text-base lg:text-lg font-semibold group"
            >
              {/* Default Text */}
              <span className="block text-white transition-all duration-300 group-hover:-translate-y-full group-hover:opacity-0">
                Apply Now
              </span>

              {/* Hover Text */}
              <span className="absolute inset-0 flex items-center justify-center text-brandPurple bg-white transition-all duration-300 translate-y-full group-hover:translate-y-0">
                Apply Now
              </span>
            </Link>
          </div>
        </div>
      </section>
      <footer className='bg-black h-auto pt-0 pb-20 px-3'>
        <div className='max-w-360 mx-auto text-white'>
          <div className="flex flex-col gap-3 justify-center items-center">
            <Image src="/academylogo.webp" alt="Logo" width={150} height={150} />
            <p>A platform for learning and sharing knowledge.</p>
            <div className='nav-buttons flex justify-center gap-6 items-center my-5'>
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
                className="flex items-center gap-2 text-center rounded-sm text-brandPurple bg-black px-5 py-2 lg:py-2 border-2 border-brandPurple hover:bg-brandPurple hover:text-white transition-all duration-200 ease-in-out"
              >
                Login
                <MdLogin className="text-xl" />
              </a>
            </div>
          </div>
          <hr className='my-5 mx-auto max-w-360' />
          <div className='grid grid-cols-1 md:grid-cols-3 justify-center items-center py-8 gap-6 px-3'>
            <div className='text-center'>
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
            <div className='flex gap-3 items-center justify-center lg:justify-end'>
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
import React from 'react'
import GoogleSVG from '../../assets/sign-in-svgs/Google.png'

function SignUpCard() {
  return (
    <div className="flex card-white font-ubuntu sm:ml-4 sm:mr-10 mx-16 my-16 w-9/12">
      <div className="justify-center">
        <div className='text-2xl font-medium'>
          Get Started
        </div>
        <form className="pb-3">
          <div className="flex-col gap-4 px-7 py-4">
            <input placeholder="Email *" className="input-gray" />
            <input placeholder="Password *" className="input-gray" />
            <input placeholder="Re-enter Password *" className="input-gray" />
          </div>
          <div className="flex mx-12 pb-3 justify-center">
            <div className="content-center sm:mr-5 mr-2">
              <input type="checkbox"/>
            </div>
            <p className="text-sm">
              I agree to FF-Land's Privacy Policy
            </p>
          </div> 
          <button className="btn-pink w-auto">Register</button>
        </form>
        <button className="btn-white border border-pink inline-flex">
          {/* <img src={GoogleSVG} alt="Google SVG" className="object-scale-down"/> */}
          <span>
            Register with Google
          </span>
        </button>
      </div>
    </div>
  )
}

export default SignUpCard
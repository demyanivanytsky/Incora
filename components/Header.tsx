import React, {FC} from 'react'
import Link from "next/link";

const Header:FC = () => {
  return (
      <div className='flex justify-between items-center p-6 text-white text-xl bg-blue-700 h-[80px]'>
          <h2> Discover info with us ! </h2>
          <Link className="underline" href="/">All User</Link>
    </div>

  )
}

export default Header;
import Link from 'next/link'
import React from 'react'

const ButtonCheckOut = ({userId}) => {
  return (
    <div className='bg-green-500 p-4'>
        <Link href={'/dashbaord/checkout'+ userId}>Check out</Link>
    </div>
  )
}

export default ButtonCheckOut
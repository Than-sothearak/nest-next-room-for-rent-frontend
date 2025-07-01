import Link from 'next/link'
import React from 'react'

const ButtonCheckOut = ({userId}) => {
  return (
    <div>
        <Link href={'/dashbaord/checkout'+ userId}>Check out</Link>
    </div>
  )
}

export default ButtonCheckOut
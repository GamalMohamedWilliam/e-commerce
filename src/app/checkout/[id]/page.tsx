import React from 'react'
import CheckOut from '../_component/CheckOut'


export default async function page({ params }: { params: { id: string } }) {
   
  return (
    <div>
      <CheckOut cartID={params.id}></CheckOut>
      
    </div>
  )
}

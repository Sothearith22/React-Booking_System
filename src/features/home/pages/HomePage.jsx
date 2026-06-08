import React from 'react'
import { Banner } from '../components/Banner'
import { BookingBenefits } from '../components/BookingBenefits'
import { PopularRoom } from '../components/PopularRoom'
import TopCategories from '../components/TopCategories'

export const HomePage = () => {
  return (
    <div>
      <Banner/>
      {/* <PopularRoom/> */}
      <TopCategories/>
      <BookingBenefits/>
    </div>
  )
}

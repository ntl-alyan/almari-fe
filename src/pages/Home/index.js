import React from 'react'
import Hero from '../../../page-components/Hero'
import NewProducts from '../../../page-components/NewProducts'
import Testimonial from '../../../page-components/Testimonials'
import Layout from '../../../page-components/layout'

export default function Home() {
  return (
	<>
	<Layout>
		<Hero/>
		<NewProducts/>
		<Testimonial/>
	</Layout>
	</>
  )
}

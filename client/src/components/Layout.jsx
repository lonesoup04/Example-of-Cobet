import React from 'react'
import Navbar from './Navbar';
import Categories from './Categories';

function Layout({children}) {
  return (
    <>
      <Navbar />
      <Categories />
      {children}
    </>
  )
}

export default Layout
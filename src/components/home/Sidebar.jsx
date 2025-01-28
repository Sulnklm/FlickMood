import React from 'react'
import ForYou from './sidebar/ForYou'
import RecentlyViewed from './sidebar/RecentlyViewed'
import Trailers from './sidebar/Trailers'

function Sidebar() {
  return (
    <div>
      <Trailers />
      <ForYou />
      <RecentlyViewed />
    </div>
  )
}

export default Sidebar


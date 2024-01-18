import Header from '@/Components/Header/Header'
import PostCard from '@/Components/PostCard/PostCard'
import React from 'react'
import style from "./feed.module.scss"; 

function feed() {
  return (
    <div className=''>
<Header/>
<div className={style.feedContainer}>
<PostCard/>
</div>
hsjhsjsh

    </div>
  )
}

export default feed
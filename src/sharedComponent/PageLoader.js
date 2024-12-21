import React from 'react';
import pageLoaderImg from './page-loader.gif'
const PageLoader = () => {
  return(
    <div className="page-loader">
      <span>
        <img src={pageLoaderImg} alt="" />
      </span>
    </div>
  )
}
export default PageLoader;
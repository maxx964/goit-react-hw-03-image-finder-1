import React from 'react';

import { ThreeDots } from 'react-loader-spinner';

const Loader = ({ isLoading }) => (
  isLoading && (
    <div className="loader">
<ThreeDots 
height="50" 
width="50" 
radius="9"
color="blue" 
ariaLabel="three-dots-loading"
wrapperStyle={{}}
wrapperClassName=""
        visible={true}
         timeout={3000} 
 />
    </div>
  )
);

export default Loader;

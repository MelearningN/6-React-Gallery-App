import React from 'react';


//simple 404 page to render if route not found, included home button to get users back to index route
const InvalidRoute = () => {
  return(
    <div>
      <h1>
        404 Error: Page Not Found
      </h1>
      <p>Oh No! The Page you requested is not found. Please try again with different parameter.</p>
      <a href="/"><span>&larr;</span>Go Home</a>
    </div>
  )
}

export default InvalidRoute;
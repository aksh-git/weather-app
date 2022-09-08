import React from 'react'
import Head from 'next/head'

function Layout({ children }) {
  return (
    <div className=''>
      <Head>
        <title>Weather-App</title>
        <meta charSet='utf-8'/>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
        />
        <meta
          name="description"
          content="weather-app"
        />
         <meta name="author" content="Akash Yadav" />
         <meta property="twitter:creator" content="@akashydav" />
      </Head>
      {children}
    </div>
  )
}

export default Layout
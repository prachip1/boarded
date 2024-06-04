import React from 'react'
import {Rings} from "react-loader-spinner"
import "./LoaderPage.css"

export default function LoaderPage() {
  return (
    <div className="loader-css">
<Rings
  visible={true}
  height="120"
  width="90"
  color="#0F0417"
  ariaLabel="rings-loading"
  
  />
  <p>Please wait...</p>
  <p>while we set up workspace for you.</p>
    </div>
  )
}

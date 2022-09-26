import React from 'react'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }

  return (
    <div style={footerStyle}>
      <br />
      <em>Music app, written by smart Tracy, 2021</em>
    </div>
  )
}

export default Footer
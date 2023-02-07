import React from 'react';
import "./About.css";

const About = () => {
  return (
    <section className='about'>
      <div className='container'>
        <div className='section-title'>
          <h2>About</h2>
        </div>

        <div className='about-content grid'>
          <div className='about-text'>
            <p className='fs-17'>A Books library app built in react and uses the Open Library Subjects and Search APIs</p>
            <p className='fs-17'></p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

import React, { useContext, useEffect } from 'react'
import NoteContext from '../context/notes/NoteContext'

const About = () => {
  const a = useContext(NoteContext);
  useEffect(() => {
    a.update();
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <div>
        this is about {a.state.name} who is in class {a.state.grade}
      </div>
    </>
  )
}

export default About

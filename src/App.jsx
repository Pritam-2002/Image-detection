import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Image from './assets/img.jpeg'
import ImageRectangles from './new'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const imageUrl = 'https://imgs.search.brave.com/Q4ot-TLikHZivRVu4QwWzomdZnyhOtpvtYtKy-w5uvc/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zdXBw/b3J0LmNvbnRlbnQu/b2ZmaWNlLm5ldC9l/bi11cy9tZWRpYS9k/NWNhNTkwYy0zNTE2/LTQzMWEtOTQwZC0z/ZWI3ZGUzODIyYzYu/cG5n';

  return (
    <>
    hello there
      <ImageRectangles  imageUrl={imageUrl}
      />
    </>
  )
}

export default App

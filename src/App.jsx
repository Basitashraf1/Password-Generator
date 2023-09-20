import { useState, useCallback,useEffect,useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numAllow,setNumAllow]=useState(false)
  const [char,setChar]=useState(false)
  const [password,setPassword]=useState("")
  const passwordRef=useRef(null)
  const passGen= useCallback(()=>{
    let pass=""
    let str="QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklmnbvcxz"
    if(numAllow) str +="0123456789"
    if(char) str += ",./';[]-=!@#$%^&*()`~<>?:{}_+"
    for(let i=1;i<=length;i++){
      let lock=Math.floor(Math.random()*str.length + 1)
      pass +=str.charAt(lock)
    }
    setPassword(pass)
  },[length,numAllow,char,setPassword])
  const copypass=useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,100)
    window.navigator.clipboard.writeText(password)
  },[password])
  useEffect(()=>{
    passGen()
  },[length,numAllow,char,passGen])
  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
   <h1 className='text-white text-center' > Password Generator </h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4 ">
    <input type="text"
    value={password}
    className="outline-none w-full py-1 px-3"
    placeholder='Password'
    readOnly
    ref={passwordRef}
    />
    <button 
    onClick={copypass}
    className='bg-blue-800 text-white px-2  ' >Copy</button>
    </div>
    <div className='flex items-center gap-x-1 '>
      <div>
        <input 
        type="range"
        min={0}
        max={100}
        value={length}
        className="cursor-pointer"
        onChange={(e)=>setLength(e.target.value)}
        />
        <label>length:{length}</label>
      </div>
      <div>
        <input type="checkbox"
        defaultChecked={numAllow}
        id="numberInput"
        onChange={()=>{
          setNumAllow((prev)=>!prev)
        }

        }
        />
        <label>Number</label>
      </div>
      <div>
        <input type="checkbox"
        defaultChecked={char}
        id="characterInput"
        onChange={()=>{
          setChar((prev)=>!prev)
        }}
        />
        <label>Characters</label>
      </div>
    </div>
     </div>
    </>
  )
}

export default App

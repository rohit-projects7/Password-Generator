import { useState,useCallback,useEffect,useRef } from 'react'
import './App.css'

function App() {
  
  const [length, setlength] = useState(8)
  const[numallowed, setnumallowed]=useState(false)
  const[charallowed,setcharallowed]=useState(false)
  const[password,setpassword]=useState("")

  const passwordref = useRef(null)

  const passwordgenerater = useCallback(()=>{

    let pass = ""
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

    if(numallowed) str += "0123456789";
    if(charallowed) str += "@#$$%*^%$&";

    for(let i =1; i <= length; i++){
      
      let char = Math.floor(Math.random() * str.length + 1)

      pass += str.charAt(char)

      setpassword(pass)
    }

  },[length,numallowed,charallowed,setpassword])

  const copypasswordtoclipbord = useCallback(()=>{

    passwordref.current?.select();
  
    window.navigator.clipboard.writeText(password)

  },[password])

  useEffect(()=>{

    passwordgenerater()

  },[length,numallowed,charallowed,passwordgenerater])

  return (
    <>
      <div className='w-full h-screen bg-slate-500 flex justify-center items-center'>

        <div className='w-[500px] h-auto bg-slate-300 flex flex-col justify-center items-center p-4 rounded-lg'>

          <div className='items-center text-3xl font-bold'><h1>PasswordGenerator</h1></div>

          <div className='flex w-full p-4'>

            <input className='w-full outline-none rounded-tl-xl rounded-bl-xl' 
            
            type="text" 
            readOnly 
            value={password}
            ref={passwordref}
            placeholder='password'/>

            <button className='p-2 bg-blue-600 rounded-tr-xl rounded-br-xl text-white font-bold hover:bg-blue-300 capitalize'
            onClick={copypasswordtoclipbord}
            >copy</button>
          </div>

        <div className='flex gap-4 justify-center items-center'>
            <div className='flex justify-center items-center'>
              <input 
              
              type="range" 
              min={8} 
              max={100} 
              value={length} 
              className='cursor-pointer' 
              onChange={(e)=>{setlength(e.target.value)}}/>

              <label className='ml-2'>length : {length}</label>

            </div>

            <div className='flex justify-center items-center'>

              <input 

              type="checkbox"
              defaultChecked={numallowed} 
              id='numberinput' 
              onChange={()=>{
                setnumallowed((prev)=>!prev)
              }}/>

              <label 
              htmlFor="numberinput"  
              className='ml-2 capitalize'>number</label>
            </div>

            <div>
              <input 
  
              type="checkbox" 
              defaultChecked={charallowed} 
              id='characterinput'
              onChange={()=>{
                setcharallowed((prev)=>!prev)
              }}
              />

              <label 
              
              htmlFor="characterinput"  
              className='capitalize ml-2'>charecters</label>
            </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default App

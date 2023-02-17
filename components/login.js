import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userAction'


export const Login = () => {
  const dispatch = useDispatch()
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  )
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  useEffect(() => {
    if (error) {

    }
    if (isAuthenticated) {

    }
  }, [dispatch, loading, isAuthenticated, user, error])

  const handlesubmit = async (e) => {
    e.preventDefault()
    console.log(username, password)
    const formdata = { username: username, password: password }
    dispatch(login(formdata))
    console.log('ok')
  }
  return (
    <>
      <div className='signup'>
        <div className='signupbox'>
          <div className='sociallogin google' onClick={()=>navigate('/googlelogin')}>
      
            Sign up with google
          </div>
        
          <form className='loginform' onSubmit={(e) => handlesubmit(e)}>
            <div>
              <h5 className='font-bold'>email</h5>
              <input
                type='text'
                className='inputs'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <h5 className='font-bold'>password</h5>
              <input
                type='text'
                className='inputs'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <input type='submit' className='submitbutton' value='Log in' />
          </form>
        </div>
      </div>
    </>
  )
}
export default Login
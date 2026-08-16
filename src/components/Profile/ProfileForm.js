import { useRef, useContext } from 'react'
import classes from './ProfileForm.module.css'
import AuthContext from '../../store/auth-context'
import { useHistory } from 'react-router-dom'

const ProfileForm = () => {
  const history = useHistory()
  const newPasswordRef = useRef()
  const authCtx = useContext(AuthContext)

  const submitHandler = (e) => {
    e.preventDefault()
    const enteredPass = newPasswordRef.current.value

    fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAVz545erTZB78i1xj1UEkV64Wt0UBKjRA',
      {
        method: 'POST',
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredPass,
          returnSecureToken: false,
        }),
        headers: {
          'Content-Type': 'application / json',
        },
      }
    ).then((res) => {
      console.log(res)
      history.replace('/')
    })
  }

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input
          type='password'
          id='new-password'
          minLength='7'
          ref={newPasswordRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  )
}

export default ProfileForm

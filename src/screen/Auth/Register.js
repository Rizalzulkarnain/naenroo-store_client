import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Spinner from '../../components/Spinner/Spinner'
import MetaData from '../../components/MetaData'
import DefaultAvatar from '../../images/default_avatar.jpg'
import { toastr } from 'react-redux-toastr'
import { useDispatch, useSelector } from 'react-redux'
import { registerAction, clearErrors } from '../../redux/actions/authActions'

const Register = ({ history }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  })
  const { name, email, password } = user

  const [avatar, setAvatar] = useState('')
  const [avatarPreview, setAvatarPreview] = useState(DefaultAvatar)

  const dispatch = useDispatch()

  const { isAuthenticated, error, loading } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/')
    }

    if (error) {
      toastr.error('Register Error', error)
      dispatch(clearErrors())
    }
  }, [dispatch, isAuthenticated, error, history])

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.set('name', name)
    formData.set('email', email)
    formData.set('password', password)
    formData.set('avatar', avatar)

    dispatch(registerAction(formData))

    setUser({
      name: '',
      email: '',
      password: ''
    })
  }

  const onChange = (e) => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader()

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result)
          setAvatar(reader.result)
        }
      }

      reader.readAsDataURL(e.target.files[0])
    } else {
      setUser({ ...user, [e.target.name]: e.target.value })
    }
  }

  return (
    <>
      {loading ? (
        <>
          <Spinner />
        </>
      ) : (
        <>
          <MetaData title='Register' />
          <div className='container container-fluid'>
            <div className='row wrapper'>
              <div className='col-10 col-lg-5'>
                <form onSubmit={handleSubmit} className='shadow-lg' encType='multipart/form-data'>
                  <h1 className='mb-3'>Register</h1>

                  <div className='form-group'>
                    <label htmlFor='email_field'>Name</label>
                    <input type='name' id='name_field' className='form-control' name='name' value={name} onChange={onChange} />
                  </div>

                  <div className='form-group'>
                    <label htmlFor='email_field'>Email</label>
                    <input
                      type='email'
                      id='email_field'
                      className='form-control'
                      name='email'
                      value={email}
                      onChange={onChange}
                    />
                  </div>

                  <div className='form-group'>
                    <label htmlFor='password_field'>Password</label>
                    <input
                      type='password'
                      id='password_field'
                      className='form-control'
                      name='password'
                      value={password}
                      onChange={onChange}
                    />
                  </div>

                  <div className='form-group'>
                    <label htmlFor='avatar_upload'>Avatar</label>
                    <div className='d-flex align-items-center'>
                      <div>
                        <figure className='avatar mr-3 item-rtl'>
                          <img src={avatarPreview} className='rounded-circle' alt='Avatar Preview' />
                        </figure>
                      </div>
                      <div className='custom-file'>
                        <input
                          type='file'
                          name='avatar'
                          className='custom-file-input'
                          id='customFile'
                          accept='images/'
                          onChange={onChange}
                        />
                        <label htmlFor='customFile' className='custom-file-label'>
                          Choose Avatar
                        </label>
                      </div>
                    </div>
                  </div>

                  <button id='register_button' type='submit' className='btn btn-block py-3' disabled={loading && true}>
                    REGISTER
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

Register.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  })
}

export default Register

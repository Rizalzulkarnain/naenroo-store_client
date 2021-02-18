import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.auth)

  useEffect(() => {
    JSON.parse(localStorage.getItem('token'))
  }, [JSON])

  return (
    <>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) {
              return <Redirect to='/auth/login' />
            }
            return <Component {...props} />
          }}
        />
      )}
    </>
  )
}

ProtectedRoute.propTypes = {
  component: PropTypes.any
}

export default ProtectedRoute

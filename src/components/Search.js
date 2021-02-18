import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push(`/`)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='input-group'>
          <input
            type='text'
            id='search_field'
            className='form-control'
            placeholder='Enter Product Name ...'
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
          />
          <div className='input-group-append'>
            <button type='button' id='search_btn' className='btn'>
              <i className='fa fa-search' aria-hidden='true' />
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

Search.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  })
}

export default Search

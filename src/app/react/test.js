import React from 'react'
import PropTypes from 'prop-types'

const TestComponent = ({count, onReset}) => (
  <div>
    react counter: {count}

    <button onClick={onReset}>reset</button>
  </div>
)

TestComponent.propTypes = {
  count: PropTypes.number,
  onReset: PropTypes.func
}

export default TestComponent

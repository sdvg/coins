import React from 'react'
import PropTypes from 'prop-types'
import { render, unmountComponentAtNode } from 'react-dom'
import { fromPairs, pickBy } from 'lodash'

export default ReactComponent => {
  const propTypes = ReactComponent.propTypes || {}
  const dataBindingPropTypes = pickBy(propTypes, (propType, name) => propType !== PropTypes.func)
  const dataBindingPropTypeNames = Object.keys(dataBindingPropTypes)
  const functionBindingPropTypes = pickBy(propTypes, (propType, name) => propType === PropTypes.func)
  const functionBindingPropTypeNames = Object.keys(functionBindingPropTypes)

  class Controller {
    constructor(
      $element,
      $scope
    ) {
      'ngInject'

      this.$element = $element
      this.$scope = $scope
    }

    $onChanges() {
      const dataBindingProps = fromPairs(dataBindingPropTypeNames.map(name => [name, this[name]]));

      const proxies = fromPairs(functionBindingPropTypeNames.map(name => [name, () => {
        this.$scope.$apply(() => {
          this[name]()
        })
      }]));

      render(
        <ReactComponent
          {...dataBindingProps}
          {...proxies}
        />,
        this.$element[0]
      )
    }

    $onDestroy() {
      unmountComponentAtNode(this.$element[0])
    }
  }

  const dataBindings = fromPairs(dataBindingPropTypeNames.map(name => [name, '<']));
  const expressionBindings = fromPairs(functionBindingPropTypeNames.map(name => [name, '&?']));

  return {
    controller: Controller,
    bindings: {
    ...dataBindings,
    ...expressionBindings
    }
  }
}

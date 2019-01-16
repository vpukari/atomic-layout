import * as React from 'react'
import styled from 'styled-components'
import { GenericProps, GridProps } from '../const/props'
import { AreasMap } from '../utils/templates/generateComponents'
import parseTemplates from '../utils/templates/parseTemplates'
import applyStyles from '../utils/styles/applyStyles'
import invariant from '../utils/invariant'

type ChildrenFunction = (areas: AreasMap) => React.ReactNode

interface CompositionProps extends GenericProps, GridProps {
  children: ChildrenFunction | React.ReactNode
  inline?: boolean
}

const CompositionWrapper = styled.div<CompositionProps>`
  ${applyStyles};
  display: ${({ inline }) => (inline ? 'inline-grid' : 'grid')};
`

const Composition: React.FunctionComponent<CompositionProps> = ({
  children,
  ...restProps
}) => {
  const areaComponents = parseTemplates(restProps)
  const hasAreaComponents = Object.keys(areaComponents).length > 0
  const childrenType = typeof children
  const hasChildrenFunction = childrenType === 'function'

  /**
   * Warn on attempt to use template props without children-as-function.
   */
  invariant(
    !(hasAreaComponents && !hasChildrenFunction),
    'Failed to render `Composition` with template areas ["%s"]: expected children to be a function, but got: %s. Please remove template props, or add a children rendering function.',
    Object.keys(areaComponents).join('", "'),
    childrenType,
  )

  return (
    <CompositionWrapper {...restProps}>
      {hasAreaComponents && hasChildrenFunction
        ? (children as ChildrenFunction)(areaComponents)
        : children}
    </CompositionWrapper>
  )
}

export default Composition

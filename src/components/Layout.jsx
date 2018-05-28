import React from 'react'
import styled from 'styled-components'
import parseTemplateString from '../utils/parseTemplateString'
import applyStyles from '../utils/applyStyles'
import getPropByName from '../utils/getPropByName'

const LayoutWrapper = styled.div`
  display: ${({ inline }) => (inline ? 'inline-grid' : 'grid')};
  ${(props) => applyStyles(props)};
`

export default class Layout extends React.Component {
  constructor(props) {
    super(props)

    const templates = getPropByName('template', props)

    // This won't support value updates of "template" props
    this.areaComponents = parseTemplateString(templates)
  }

  render() {
    return (
      <LayoutWrapper {...this.props}>
        {this.props.children(this.areaComponents)}
      </LayoutWrapper>
    )
  }
}
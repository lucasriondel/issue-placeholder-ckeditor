import * as React from 'react'

interface IProps {
  style?: React.CSSProperties
}

export default class Toolbar extends React.Component<IProps> {
  public render() {
    return (
      <div style={this.props.style} className="folloow-ui-toolbar">
        {this.props.children}
      </div>
    )
  }
}


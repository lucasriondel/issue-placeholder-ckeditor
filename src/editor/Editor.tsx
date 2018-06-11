import * as React from 'react'

interface IProps {
  style?: React.CSSProperties
}

export default class Editor extends React.Component<IProps> {
  public render() {
    return (
      <div style={this.props.style} className="folloow-ui-editor">
        {this.props.children}
      </div>
    )
  }
}
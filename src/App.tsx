import * as React from "react";
import CKEditor from "./editor/CKEditor";
import Editor from "./editor/Editor";
import Toolbar from "./editor/Toolbar";

export default class App extends React.Component<{}, {}> {
  public toolbarRef: React.RefObject<Toolbar> = React.createRef();
  public editorRef: React.RefObject<Editor> = React.createRef();

  public render() {
    return (
      <div>
        <CKEditor toolbarRef={this.toolbarRef} editorRef={this.editorRef}>
          <Toolbar ref={this.toolbarRef} />
          <Editor ref={this.editorRef}>Editor component</Editor>
        </CKEditor>
      </div>
    );
  }
}

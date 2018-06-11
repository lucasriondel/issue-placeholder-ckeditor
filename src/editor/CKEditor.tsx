import * as React from "react";
import * as ReactDOM from "react-dom";

import DecoupledEditor from "@ckeditor/ckeditor5-editor-decoupled/src/decouplededitor";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import HeadingUI from "@ckeditor/ckeditor5-heading/src/headingui";
import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment";

import Variable from "./plugins/Variable";
import CreateVariable from "./plugins/CreateVariable";
import InsertVariable from "./plugins/InsertVariable";

// needs to be imported here to erase the default style of the editor
// import '../../styles/components/editor.scss'
import Editor from "./Editor";
import Toolbar from "./Toolbar";
import PlaceholderPlugin from "./plugins/Placeholder";

interface IProps {
  editorRef: React.RefObject<Editor>;
  toolbarRef: React.RefObject<Toolbar>;
  style?: React.CSSProperties;
}

export default class CKEditor extends React.Component<IProps> {
  public editor: DecoupledEditor | undefined;

  public handleChange = (text: string) => this.setState({ text });

  public async initEditor() {
    this.editor = await DecoupledEditor.create(
      ReactDOM.findDOMNode(this.props.editorRef.current as Editor),
      {
        plugins: [
          Essentials,
          Bold,
          Italic,
          Underline,
          Paragraph,
          Heading,
          HeadingUI,
          Alignment,
          Variable,
          CreateVariable,
          InsertVariable,
          PlaceholderPlugin
        ],
        toolbar: [
          "heading",
          "bold",
          "italic",
          "underline",
          "alignment:left",
          "alignment:right",
          "alignment:center",
          "createVariable",
          "insertVariable"
        ],
        fontFamily: {
          options: "Montserrat sans-serif"
        },
        heading: {
          options: [
            {
              model: "heading1",
              view: "h4",
              title: "Titre de section",
              class: "section-title"
            },
            {
              model: "paragraph",
              title: "Texte",
              class: "ck-heading_paragraph"
            }
          ]
        }
      }
    );
    const el = ReactDOM.findDOMNode(this.props.toolbarRef.current as Toolbar);
    if (el instanceof Element) {
      el.appendChild(this.editor.ui.view.toolbar.element);
    }
  }

  public async componentDidMount() {
    try {
      if (!this.props.editorRef.current)
        console.error(`editorRef.current is ${this.props.editorRef.current}`);
      if (!this.props.toolbarRef.current)
        console.error(`toolbarRef.current is ${this.props.toolbarRef.current}`);
      await this.initEditor();
      console.log("Editor was initialized", this.editor);
    } catch (e) {
      console.error(e.stack);
    }
  }

  public componentWillUnmount() {
    if (this.editor) this.editor.destroy();
  }

  public render() {
    return (
      <div style={this.props.style}>
        {this.props.children}
        <div><button onClick={() => console.log(this.editor.getData())}>getData()</button></div>
      </div>
    );
  }
}

import Quill from "quill";
import React from "react";

type Props = {};

const Editor = (props: Props) => {
  const quill = new Quill("#editor", { theme: "snow" });
  return <div id="editor">Editor</div>;
};

export default Editor;

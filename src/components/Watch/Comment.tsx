import React from "react";
import TitlePrimary from "../TitlePrimary";
import Input from "../Comment/Input";

const Comment = () => {
  return (
    <div className="mt-5">
      <TitlePrimary title="Comments" />
      <Input />
    </div>
  );
};

export default Comment;

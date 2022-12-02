import React, { useState } from "react";
import Button from "./Button";
import Comments from "./Comments";

function Video({ videoData }) {
  const [data, setData] = useState({
    ...videoData,
    comments: videoData.comments.map((comment) => {
      return { ...comment, upvotes: 0, downvotes: 0 };
    }),
  });
  const [showComments, setShowComments] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  function handleSearchInputChange(event) {
    setSearchInput(() => event.target.value);
  }

  function handleVideoBtnClick(event) {
    const name = event.target.name;
    if (name === "comments") setShowComments((prev) => !prev);
    else
      setData((prev) => {
        return { ...prev, [name]: prev[name] + 1 };
      });
  }

  function handleCommentsBtnClick(event) {
    const name = event.target.name;
    const id = parseInt(event.target.id, 10);
    if (name === "delete")
      setData((prev) => {
        return {
          ...prev,
          comments: prev.comments.filter((comment) =>
            comment.id === id ? false : true
          ),
        };
      });
    else {
      const updatedComments = data.comments.map((comment) =>
        comment.id === id ? { ...comment, [name]: comment[name] + 1 } : comment
      );
      setData((prev) => {
        return { ...prev, comments: updatedComments };
      });
    }
  }

  function handleSortComments() {
    setData((prev) => {
      return {
        ...prev,
        comments: prev.comments.sort((a, b) =>
          a.user > b.user ? 1 : a.user < b.user ? -1 : 0
        ),
      };
    });
  }

  return (
    <div>
      <iframe
        width="919"
        height="525"
        src={data.embedUrl}
        frameBorder="0"
        allowFullScreen
        title="Thinking in React"
      />
      <div>
        <h1>{data.title}</h1>
        <p>
          {data.views} Views | Uploaded {data.createdAt}
        </p>
        <Button
          name="upvotes"
          votes={data.upvotes}
          content="👍"
          onBtnClick={handleVideoBtnClick}
        />
        <Button
          name="downvotes"
          votes={data.downvotes}
          content="👎"
          onBtnClick={handleVideoBtnClick}
        />
      </div>
      <Button
        name="comments"
        content={showComments ? "Hide Comments" : "Show Comments"}
        onBtnClick={handleVideoBtnClick}
      />
      {showComments ? (
        <Comments
          comments={data.comments}
          onBtnClick={handleCommentsBtnClick}
          searchInput={searchInput}
          onSearchChange={handleSearchInputChange}
          onSort={handleSortComments}
        />
      ) : null}
    </div>
  );
}

export default Video;

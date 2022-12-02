import React from "react";
import Button from "./Button";

function Comments({
  comments,
  onBtnClick,
  searchInput,
  onSearchChange,
  onSort,
}) {
  const filteredComments = comments.filter((comment) =>
    comment.user.includes(searchInput) ? comment : null
  );
  return (
    <div>
      <hr />
      <input
        type="text"
        value={searchInput}
        onChange={onSearchChange}
        placeholder="Search by username..."
      />
      <Button
        name="sort"
        onBtnClick={() => onSort()}
        content="Sort By Username"
      />
      <h2>
        {filteredComments ? filteredComments.length : comments.length} Comments
      </h2>
      {filteredComments.map((item) => {
        return (
          <div key={item.id}>
            <h3>{item.user}</h3>
            <p>{item.comment}</p>
            <Button
              name="upvotes"
              votes={item.upvotes ? item.upvotes : null}
              id={item.id}
              content="👍"
              onBtnClick={onBtnClick}
            />
            <Button
              name="downvotes"
              votes={item.downvotes ? item.downvotes : null}
              id={item.id}
              content="👎"
              onBtnClick={onBtnClick}
            />
            <Button
              name="delete"
              id={item.id}
              content="Delete"
              onBtnClick={onBtnClick}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Comments;

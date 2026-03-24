import React, { useState } from "react";

const mockComments = [
  {
    id: "1",
    name: "Alex",
    text: "Great walkthrough, very clear explanation.",
    replies: [
      { id: "1-1", name: "Sam", text: "Agree, this helped me a lot.", replies: [] },
      {
        id: "1-2",
        name: "Priya",
        text: "Can you make part 2 on advanced topics?",
        replies: [{ id: "1-2-1", name: "Alex", text: "Yes please!", replies: [] }],
      },
    ],
  },
  {
    id: "2",
    name: "Nina",
    text: "Audio and video quality are excellent.",
    replies: [],
  },
];

const CommentNode = ({ comment, level = 0 }) => {
  const [open, setOpen] = useState(true);
  const hasReplies = comment.replies?.length > 0;

  return (
    <div className={`mt-3 ${level ? "ml-5 border-l border-gray-300 pl-4 dark:border-gray-700" : ""}`}>
      <p className="text-sm font-semibold">{comment.name}</p>
      <p className="text-sm text-gray-700 dark:text-gray-300">{comment.text}</p>
      {hasReplies && (
        <button
          className="mt-2 text-xs text-blue-600 hover:underline"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? "Hide replies" : `Show replies (${comment.replies.length})`}
        </button>
      )}
      {open && hasReplies && comment.replies.map((reply) => <CommentNode key={reply.id} comment={reply} level={level + 1} />)}
    </div>
  );
};

const CommentsContainer = () => {
  return (
    <section className="mt-6">
      <h2 className="text-lg font-semibold">Comments</h2>
      {mockComments.map((comment) => (
        <CommentNode key={comment.id} comment={comment} />
      ))}
    </section>
  );
};

export default CommentsContainer;

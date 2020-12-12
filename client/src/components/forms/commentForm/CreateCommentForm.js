import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createComment, getSpecificComment, updateComment } from '../../../redux/actions/locationAction';

const CreateCommentForm = ( { item: {_id}, populateForm, comment_id } ) => {
  const [text, setText] = useState("");
  const [updateText, setUpdateText] = useState('')
  const dispatch = useDispatch()
  const specificComment = useSelector(state => state.specificComment)
  console.log(specificComment)

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createComment(_id, text))
    window.location.reload()
    console.log(_id)
    console.log(text);
  };

  const onUpdate = (e) => {
    e.preventDefault()
    dispatch(updateComment(_id, comment_id, updateText))
    window.location.reload()
  }

  useEffect(() => {
    fetch(`http://localhost:5000/location/${_id}/comment/${comment_id}`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if(populateForm) {
        setUpdateText(data.foundComment.text)
      }
    })
  }, [populateForm])

  return (
    <div className="comment-input">
      {!populateForm ? (
        <form onSubmit={onSubmit}>
          <input
            type="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          <button className="btn btn-warning">Enter</button>
        </form>
      ) : (
        <form onSubmit={onUpdate}>
          <input
            type="text"
            onChange={(e) => setUpdateText(e.target.value)}
            value={updateText}
          />
          <button className="btn btn-warning">Update Comment</button>
        </form>
      )}
    </div>
  );
}

export default CreateCommentForm

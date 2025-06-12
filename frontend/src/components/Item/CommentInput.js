import React, {useState} from "react";
import agent from "../../agent";
import { connect } from "react-redux";
import { ADD_COMMENT } from "../../constants/actionTypes";

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (payload) => dispatch({ type: ADD_COMMENT, payload }),
});

// This component allows users to input comments on an item.

function CommentInput({currentUser, slug}){
  const [state, setState] = useState({body: ''});

  async function createComment(e){
    e.preventDefault();
    const payload = await agent.Comments.create(slug, {
      body: state.body,
    });
    onSubmit(payload);
    setState({ body: '' });
    };
  
    return (
      <form className="card comment-form m-2" onSubmit={createComment}>
        <div className="card-block">
          <textarea
            className="form-control"
            placeholder="Write a comment..."
            value={state.body}
            onChange={e => setState({ body: e.target.value })}
            rows="3"
          ></textarea>
        </div>
        <div className="card-footer">
          <img
            src={currentUser.image}
            className="user-pic mr-2"
            alt={currentUser.username}
          />
          <button className="btn btn-sm btn-primary" type="submit">
            Post Comment
          </button>
        </div>
      </form>
  )
}

export default connect(() => ({}), mapDispatchToProps)(CommentInput);

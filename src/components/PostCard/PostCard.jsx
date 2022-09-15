const PostCard = (props) => {
  return (
    <>
    <div className="card">
      <div className="card-body">
        <h2 className="card-text">{props.post.title}</h2>
        <p className="card-text">{props.post.content}</p>
        <p className="card-text">-{props.post.author?.name}</p>
      </div>
      {props.user?.profile === props.post.author._id &&
      <div className="card-footer">
        <button onClick={() => props.handleDeletePost(props.post._id)}className="btn btn-danger">Delete</button>
        <button className="btn btn-warning">Edit</button>
      </div>
      }
    </div>
    </>
  )
}

export default PostCard
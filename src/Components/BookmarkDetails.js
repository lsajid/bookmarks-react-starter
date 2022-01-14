import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;  

function BookmarkDetails() {
  const [ bookmark, setBookmark ] = useState([]);
  let { index } = useParams();
  let navigate = useNavigate();
  //console.log(`${API_URL}/bookmarks/${index}`)
  useEffect(() => {
    //http://localhost:3003/bookmarks/0
    axios.get(`${API_URL}/bookmarks/${index}`)
      .then((res)=>{
        console.log(res.data);
        console.log(res);
        setBookmark(res.data);
        navigate("/not-found");
      });
    // fetch(`${API_URL}/bookmarks/${index}`)
    //   .then(res=> res.json())
    //   .then((data)=> {
    //     setBookmark(data);
    //     console.log(data)
    //   }).catch(()=> {
    //     navigate("/not-found")
    //   });
  }, [index]);

  const handleDelete = () => {
    axios.delete(`${process.env.REACT_APP_API_URL}/bookmarks/${index}`)
    .then((res)=> {
      navigate("/bookmarks");
    }).catch((err)=> console.log(err))
  };
  return (
    <article>
      <h3>
        {bookmark.isFavorite ? <span>⭐️</span> : null} {bookmark.name}
      </h3>
      <h5>
        <span>
          <a href={bookmark.url}>{bookmark.name}</a>
        </span>{" "}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {bookmark.url}
      </h5>
      <h6>{bookmark.category}</h6>
      <p>{bookmark.description}</p>
      <div className="showNavigation">
        <div>
          {" "}
          <Link to={`/bookmarks`}>
            <button>Back</button>
          </Link>
        </div>
        <div>
          {" "}
          <Link to={`/bookmarks/${index}/edit`}>
            <button>Edit</button>
          </Link>
        </div>
        <div>
          {" "}
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </article>
  );
}

export default BookmarkDetails;

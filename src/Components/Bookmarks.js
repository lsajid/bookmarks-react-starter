import { useEffect, useState } from "react";
import Bookmark from "./Bookmark";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function Bookmarks() {
  const [ bookmarks, setBookmarks ] = useState([]);

  useEffect(()=>{
    //bookmarks
    //http://www.localhost:3003/bookmarks
    axios.get(API_URL+"/bookmarks")
      .then((res)=> {
        console.log(res);
        setBookmarks(res.data);
      }).catch((err) => {
        throw err
      });
    // fetch(API_URL + "/bookmarks")
    //   .then((res)=> res.json())
    //   .then((data)=> {
    //     console.log(data);
    //     setBookmarks(data);
    //   }).catch((err)=> { throw err })
  },[])

  return (
    <div className="Bookmarks">
      <section>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Take me there</th>
              <th>See this bookmark</th>
            </tr>
          </thead>
          <tbody>
            {bookmarks.map((bookmark, index) => {
              return <Bookmark key={index} bookmark={bookmark} index={index} />;
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Bookmarks;
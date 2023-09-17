import React from "react";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div className="h-[105%] bg-gray-100">

      <p>
        <Link to="/">
          <img
            src="https://th.bing.com/th?id=OIF.C%2bgOyehblR%2fXhVUqxVG7Jw&pid=ImgDet&rs=1"
            alt=""
            
             className="w-[40px]   "
          />
        </Link>
      </p>
      <p>
        <Link to="/">
          <img
            src="https://th.bing.com/th/id/R.5d140c318e48ad3676592c6412645cd3?rik=S3FNWl1Z0xVw1Q&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_509166.png&ehk=ertv%2fDkgIs5e6X%2fmIPdbGp1Go8twgzsTGFlswc14dxo%3d&risl=&pid=ImgRaw&r=0"
            alt=""
            
             className="w-6 mt-5 mx-2 border-2 border-black p-1 rounded-md "
          />
        </Link>
      </p>
      <p>
        <Link to="/">
          <img
            src="https://th.bing.com/th/id/R.c4d661fa35d1b8e9319315263c040fab?rik=ver2%2bCCNBa7R8g&pid=ImgRaw&r=0"
            alt="" className="w-6 mt-5 mx-2 border-2 border-black p-1 rounded-md "
          />
        </Link>
      </p>
      <p>
        <Link to="/">
          <img
            src="https://th.bing.com/th/id/OIP.2EWmMPtf4FJXtShaKKqdLQHaHa?pid=ImgDet&rs=1"
            alt=""
             className="w-6 mt-5 mx-2 border-2 border-black p-1 rounded-md "
          />
        </Link>
      </p>
      <p></p>
    </div>
  );
}

export default Navbar;

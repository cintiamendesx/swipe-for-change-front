import React from "react";
import { Link } from "react-router-dom";


function Home() {
  return (
    <div className="text-center">
      <img
        src="https://res.cloudinary.com/swipeforchange/image/upload/v1654814598/ft_zhnjg4.png" background-size="contain" class="img-responsive" alt="Imagem responsiva"/>
      <h1>Swipe for change</h1>
      <p>you can change the world just by swiping your finger</p>
      <div className="d-flex flex-column align-items-center">
        <Link className="btn btn-lg btn-primary" to="/auth/signup">
          Signup here!
        </Link>
      </div>
    </div>
  );
}

export default Home;

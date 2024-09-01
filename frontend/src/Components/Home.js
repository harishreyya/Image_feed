import React from "react";
import { signOut, useSessionContext } from "supertokens-auth-react/recipe/session";
import ImageFeed from "./ImageFeed";
import ImageUpload from "./ImageUpload";

export const Home = () => {
  const onLogout = async () => {
    await signOut();
    window.location.href = "/auth";
  };
  
  const details = useSessionContext();
  console.log(details);

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">Welcome to Dashboard</h1>
        <button onClick={onLogout} className="logoutButton">Logout</button>
      </header>
      <div className="uploadContainer">
        <ImageUpload onUpload={(url) => console.log("Image uploaded:", url)} />
      </div>
      <div className="feedContainer">
        <ImageFeed />
      </div>
    </div>
  );
};

export default Home;

import React from "react";

function Home() {
  return (
    <>
      <div>
        <div className="container">
          <div className="grid">
            <div className="col-8 col-6-md">
              <h1>I am 8 colums on mobile, 6 on desktop</h1>
            </div>
            <div className="col-4 col-6-md">
              <p>I am 4 colums on mobile, 6 on desktop</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home

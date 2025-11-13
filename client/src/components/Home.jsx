import '../CssPages/Home.css';


const Home = () => {
  return (
    <div className="home-container" style={{
      backgroundImage: "url('/home.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      minHeight: "100vh",
    }}>
      <div className="hero-content">
        <div className="stars">✦ ✦ ✦</div>
        <h1 className="logo-title">
          <span className="logo-number">13</span>
          <span className="logo-text">Avenue</span>
        </h1>
        <p className="subtitle">שדרת הטקסטיל והנדוניה</p>
      </div>
    </div>
  );
};

export default Home;

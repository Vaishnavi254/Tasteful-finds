const Header = ({  searchinput, searchClick }) => {
  
  return (
    
    <>
      <header className="navbar">
        <span><img src="/logo.png" class="logo"></img></span>
        
        <h1 className="name">
          <span className="brand">Tasteful&nbsp;</span>Finds
        </h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search recipes..."
            className="search-bar"
         // Bind the input value to search state
            onChange={searchinput}  // Update search state as user types
          />
          <button onClick={searchClick}>🔍</button>  {/* Call the searchClick function on click */}
        </div>
      </header>
    </>
  );
};

export default Header;

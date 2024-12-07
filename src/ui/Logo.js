export const Logo = ({ size }) => {
  const src = "/logofd.jpg"; // Path to the logo image

  return (
    <div className="styled-logo">
      <img
        src={src}
        alt="Logo"
        title="Foodie Delight"
        className={`img ${size}`}
      />
      {size === "logo-medium" && ( // Conditionally render header based on logo size
        <h4 className="login-header">Log in to Your Account</h4>
      )}
    </div>
  );
};

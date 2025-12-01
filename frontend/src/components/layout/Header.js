
/**
 * Application header component
 * @param {string} title - Main title
 * @param {string} subtitle - Subtitle
 */
const Header = ({ title, subtitle }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </header>
  );
};

Header.defaultProps = {
  title: 'Impact Analysis Dashboard',
};

export default Header;

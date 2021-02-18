import './Footer.css';

const Footer = () => {
  return (
    <>
      <footer className="py-1">
        <p className="text-center mt-1">
          Naenroo Store - {new Date().getFullYear()}, All Rights Reserved
        </p>
      </footer>
    </>
  );
};

export default Footer;

import { Link } from "react-router-dom";
const Footer = ({ setSelectedCategory }) => {
    return(
        <>
        <footer>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-12">
                        <div className="footer-menu">
                            <ul>
                                <li><Link to="/" onClick={() => setSelectedCategory('')}>Home</Link></li>
                                <li><Link to="about">About Us</Link></li>
                                <li><Link to="careers">Careers</Link></li>
                                <li><Link to="contact">Contact</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="copyright">
                            <p>© Modarch India. All Rights Reserved.<br />Powered by <a href="https://www.techonika.com/" target="_blank">Techonika.</a></p>
                        </div>
                    </div>
                    <div className="col-md-3 justify-content-center" >
                        <div className="social">
                            <ul>
                                <li><a href="https://www.facebook.com/pages/Modarch-India/531034493644175?ref=hl" target="_blank"><i className="fab fa-facebook"></i></a></li>
                                <li><a href="https://www.linkedin.com/company/modarchindia/" target="_blank"><i className="fab fa-linkedin"></i></a></li>
                                <li><a href="https://www.instagram.com/modarch_india?igsh=MW1kMnI0bms1Mmk2NQ%3D%3D&utm_source=qr" target="_blank"><i className="fab fa-instagram"></i></a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-5" >
                        <div className="contact">
                            <ul>
                                <li>
                                    <i className="fa fa-phone"></i>
                                    <div className="contact-text">
                                        <a href="tel:911204206253" target="_blank">(+91) 1204206253</a>,
                                        <a href="mailto:911204206600" target="_blank">(+91) 1204206600</a>
                                    </div>
                                </li>
                                <li>
                                    <i className="fa fa-envelope"></i>
                                    <div className="contact-text">
                                        <a href="mailto:info@modarchindia.com" target="_blank">info@modarchindia.com</a>,
                                        <a href="mailto:careers@modarchindia.com" target="_blank">careers@modarchindia.com</a>
                                    </div>
                                </li>
                                <li className="location">
                                    <i className="fa fa-map-marker"></i>
                                    <div className="contact-text">
                                        <span><strong>India Address:</strong> B-99, Ist Floor, Sector-63, Noida - 201301, India</span>
                                        <span>|</span>
                                        <span><strong>Vietnam Address:</strong> 12 Vo Van Kiet, District 1, Ho Chi Minh City, Vietnam 700000</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        </>
    );
}
export default Footer;
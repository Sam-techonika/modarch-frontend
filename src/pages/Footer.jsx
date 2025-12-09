import { Link } from "react-router-dom";
const Footer = () => {
    return(
        <>
        <footer>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-12">
                        <div className="footer-menu">
                            <ul>
                                <li><Link to="/modarch_new_a">Home</Link></li>
                                <li><Link to="/modarch_new_a/about">About Us</Link></li>
                                <li><Link to="/modarch_new_a/careers">Careers</Link></li>
                                <li><Link to="/modarch_new_a/contact">Contact</Link></li>
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
                                <li><i className="fa fa-phone"></i><a href="tel:911204206253" target="_blank">(+91) 1204206253</a>, <a href="mailto:911204206600" target="_blank">(+91) 1204206600</a></li>
                                <li><i className="fa fa-envelope"></i><a href="mailto:info@modarchindia.com" target="_blank">info@modarchindia.com</a>, <a href="mailto:careers@modarchindia.com" target="_blank">careers@modarchindia.com</a></li>
                                <li><i className="fa fa-map-marker"></i><a href="javascript:void(0)">B-99, Ist Floor, Sector-63, Noida - 201301, India</a></li>
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
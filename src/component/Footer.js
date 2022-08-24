import { Link } from 'react-router-dom';
import '../css/footer.css';
import logo from '../img/logo.webp';

export default function Footer() {
    return (
        <div className="footer-area footer-padding">
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-xl-3 col-lg-5 col-md-4 col-sm-6">
                        <div className="single-footer-caption mb-50">
                            <div className="single-footer-caption mb-30">

                                <div className="footer-logo mb-25">
                                    <Link to="/"><img src={logo} alt="logo"/></Link>
                                </div>
                                <div className="footer-tittle">
                                    <div className="footer-pera">
                                        <p>Get the breathing space now, and we’ll extend your term at the other end year for go.</p>
                                    </div>
                                </div>

                                <div className="footer-social">
                                    <a href="/"><i className="pi pi-facebook"></i></a>
                                    <a href="/"><i className="pi pi-instagram"></i></a>
                                    <a href="/"><i className="pi pi-linkedin"></i></a>
                                    <a href="/"><i className="pi pi-youtube"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-5">
                        <div className="single-footer-caption mb-50">
                            <div className="footer-tittle">
                                <h4>Book Category</h4>
                                <ul>
                                    <li><a href="/">History</a></li>
                                    <li><a href="/">Horror - Thriller</a></li>
                                    <li><a href="/">Love Stories</a></li>
                                    <li><a href="/">Science Fiction</a></li>
                                    <li><a href="/">Business</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                        <div className="single-footer-caption mb-50">
                            <div className="footer-tittle">
                                <h4>&nbsp;</h4>
                                <ul>
                                    <li><a href="/">Biography</a></li>
                                    <li><a href="/">Astrology</a></li>
                                    <li><a href="/">Digital Marketing</a></li>
                                    <li><a href="/">Software Development</a></li>
                                    <li><a href="/">Ecommerce</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6">
                        <div className="single-footer-caption mb-50">
                            <div className="footer-tittle">
                                <h4>Site Map</h4>
                                <ul className="mb-20">
                                    <li><a href="/">Home</a></li>
                                    <li><a href="/">About Us</a></li>
                                    <li><a href="/">FAQs</a></li>
                                    <li><a href="/">Blog</a></li>
                                    <li><a href="/">Contact</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );

}
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Heart } from 'lucide-react';

// Importing your local assets based on your folder screenshot
import facebookLogo from "../assets/facebook.jpg";
import instagramLogo from "../assets/instagrm.png"; // Matches your 'instagrm.png' filename
import twitterLogo from "../assets/twitter.jpg";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 mt-1">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* Brand Column */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-blue-900/20">
                                U
                            </div>
                            <span className="text-xl font-extrabold text-white tracking-tight uppercase">
                                Urban<span className="text-blue-500">Voice</span>
                            </span>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
                            Empowering citizens to report, track, and resolve hyperlocal issues.
                            Together, we are building smarter, cleaner, and safer cities for everyone.
                        </p>
                        
                        {/* Social Icons using your local Images */}
                        <div className="flex gap-4">
                            <SocialIcon img={twitterLogo} alt="Twitter" />
                            <SocialIcon img={facebookLogo} alt="Facebook" />
                            <SocialIcon img={instagramLogo} alt="Instagram" />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Navigation</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><Link to="/" className="hover:text-blue-500 transition-colors">Home</Link></li>
                            <li><Link to="/problems" className="hover:text-blue-500 transition-colors">Live Feed</Link></li>
                            <li><Link to="/create" className="hover:text-blue-500 transition-colors">Report Issue</Link></li>
                            <li><Link to="/myproblem" className="hover:text-blue-500 transition-colors">My Reports</Link></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Categories</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li className="hover:text-blue-500 cursor-pointer transition-colors">Roads & Potholes</li>
                            <li className="hover:text-blue-500 cursor-pointer transition-colors">Water Supply</li>
                            <li className="hover:text-blue-500 cursor-pointer transition-colors">Electricity</li>
                            <li className="hover:text-blue-500 cursor-pointer transition-colors">Garbage Collection</li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Contact Us</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-center gap-3">
                                <MapPin size={18} className="text-blue-500 shrink-0" />
                                <span>123 Civic Plaza, City Center</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-blue-500 shrink-0" />
                                <span>+1 (555) 000-1234</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-blue-500 shrink-0" />
                                <span>support@urbanvoice.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                    <p>© {currentYear} Urban Voice. All Rights Reserved.</p>
                    <div className="flex items-center gap-1.5">
                        <span>Made with</span>
                        <Heart size={12} className="text-red-500 fill-red-500" />
                        <span>for a Better Future</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

/**
 * Helper Social Icon Component
 * Handles the display of your local .jpg/.png assets
 */
const SocialIcon = ({ img, alt }) => (
    <a 
        href="#" 
        className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center overflow-hidden hover:bg-blue-600 transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-black/20"
    >
        <img 
            src={img} 
            alt={alt} 
            className="w-5 h-5 object-contain brightness-110" 
        />
    </a>
);

export default Footer;
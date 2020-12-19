import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
    return (
        <div className="Footer">
            <footer>
                <div class="container">
                    <div class="footer-cols">
                        <ul>
                            <li>Shop & Learn</li>
                            <li><Link>Lorem</Link></li>
                            <li><Link >Ipsum</Link></li>
                            <li><Link >Dolor amit</Link></li>
                            <li><Link >Locations</Link></li>
                        </ul>

                        <ul>
                            <li>Wild Store</li>
                            <li><Link >Find Link Location</Link></li>
                            <li><Link >Today at Wild</Link></li>
                            <li><Link >Wild Camp</Link></li>
                            <li><Link >financing</Link></li>
                            <li><Link >Ipsum amit</Link></li>
                        </ul>

                        <ul>
                            <li>Education & Business</li>
                            <li><Link>Wild & Education</Link></li>
                            <li><Link >Shop For College</Link></li>
                            <li><Link >Wild And Business</Link></li>
                            <li><Link >Shop for Business</Link></li>
                            <li><Link>Jobs</Link></li>
                        </ul>

                        <ul>
                            <li>About Wild</li>
                            <li><Link >NewsRoom</Link></li>
                            <li><Link >Wild Leadership</Link></li>
                            <li><Link >Investors</Link></li>
                            <li><Link >Events</Link></li>
                            <li><Link >Contact Wild</Link></li>
                        </ul>
                    </div>
                </div>
                <div class="footer-bottom text-center">
                    Copyright &copy; 2020 Wild Travellers
                </div>
            </footer>
        </div>
    )
}

export default Footer

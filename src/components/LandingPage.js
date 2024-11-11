import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import '../stylings/landingPage.css';
import PricingTable from "./PricingTable";
import FrequentQuestions from "./frequentQuestions";
import menuIcon from './icons/h-menu.svg';
import closeIcon from './icons/close.svg';
import mockup from './icons/Iphone-mockup.png';
import listMockupSide from './icons/list-mockup-side.png';
import wavesBg from './icons/waves.svg';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";





const LandingPage = () => {


    const navigate = useNavigate();
    const { user } = useAuth();

    const [showMenu, setShowMenu] = useState(false)
    const [features, setFeatures] =  useState([
        {
          iconPath: "./landing-page-icons/location.svg",
          title: "Find Public Events",
          description: "Discover and join a variety of public events happening in your community or areas of interest."
        },
        {
          iconPath: "./landing-page-icons/calendar.svg",
          title: "Create Your Own Event",
          description: "Host and personalize your events, whether it's an intimate game night or a large-scale concert."
        },
        {
          iconPath: "./landing-page-icons/dashboard.svg",
          title: "Easily Manage Events",
          description: "Effortlessly manage all aspects of your events, from participants to crucial details, in one central hub."
        },
        {
          iconPath: "./landing-page-icons/notepad.svg",
          title: "Quickly Create Lists",
          description: "Create and manage lists such as tasks, shopping, or any other essential items for your events."
        },
        {
          iconPath: "./landing-page-icons/tasks.svg",
          title: "Assign Tasks to Others",
          description: "Delegate tasks to participants and keep everyone organized and on the same page."
        },
        {
          iconPath: "./landing-page-icons/chat.svg",
          title: "Chat with Your Participants",
          description: "Engage in real-time communication with event participants through our intuitive live chat feature."
        },
        {
          iconPath: "./landing-page-icons/update.svg",
          title: "Keep Them Updated",
          description: "Ensure everyone stays informed by providing real-time updates and announcements for your events."
        },
        {
          iconPath: "./landing-page-icons/lock.svg",
          title: "Guest Access Controls",
          description: "Manage guest access with precision, setting permissions and restrictions to ensure a secure and seamless event experience."
        }
      ])
      const [isPastHome, setIsPastHome] = useState(false)
      useEffect(()=>{
        if(user){
            navigate('/dashboard')
        }
      },[])
      useEffect(() => {
        const handleScroll = () => {
          const targetDiv = document.getElementById("about");
    
          const targetDivPosition = targetDiv.getBoundingClientRect().top;
              if (targetDivPosition < 0) {
                setIsPastHome(true);
          } else {
            setIsPastHome(false);
          }
        };
    
        window.addEventListener("scroll", handleScroll);
    
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, []);


      const goToTop = () =>{
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
      }
      const toggleMenu = () =>{
        setShowMenu(!showMenu);
      }
    return ( 
        <div id="landing-page">
            <nav>
                <div className={`nav-links ${showMenu ? 'show-mobile-nav' : ''}`}>
                    <a href="#home">Home</a>
                    <a href="#about">About</a>
                    <a href="#pricing">Pricing</a>
                    <a href="#features">Features</a>
                    <a href="#support">Support</a>
                    
                    <button className={`landing-menu-button`} onClick={toggleMenu}>
                        <img src={showMenu ? closeIcon : menuIcon} alt="" className="medium-icon" style={showMenu ? {filter: 'invert(1)'} : {}}></img>
                    </button>
                    <div className="get-started-btn-container">
                        <Link className="get-started-button" to='/auth'>Get Started</Link>
                    </div>
                </div>
            </nav>
            <div id="home" style={{'backgroundImage': `url(${wavesBg})`}}>
                <div className="left">
                    <div className="hero-text">
                        <h1>Ready to start the party?</h1>
                        <h2>Or just an important meeting?</h2>
                        <h4>Connectivent is the easiest way to create and manage events of all sizes.</h4>
                        <div className="hero-buttons">
                            <Link className="get-started" to='/auth'>Get Started</Link>
                        </div>
                    </div>
                </div>
                <div className="right" >
                    <img src={listMockupSide}></img>
                    <img src={mockup}></img>
                </div>
            </div>
            <div id="about">
                <div className="about-us">
                    <img src="./landing-page/about-image.jpg"></img>
                    <div className="about-text">
                        <div className="section-title">About</div>
                        <p>Welcome to Connectivent - Where Moments Matter!</p>

                        <p>Are you tired of event management headaches? APPNAME is here to redefine your experience. We believe in making every moment count without the fuss of event planning.</p>

                        <strong>Our Commitment:</strong>
                        <p>At Connectivent, we are committed to bringing people together through hassle-free event management. Say goodbye to stress and hello to unforgettable experiences.</p>
                        <strong>Why Connectivent?</strong>
                        <p>Our user-friendly interface ensures that you spend less time managing and more time enjoying. Join us in creating a space where every moment matters.</p>

                        <strong>Join the Movement:</strong>
                        <p>Become part of our growing community. Register to APPNAME now and elevate your event experience. Because when moments matter, we've got you covered!</p>

                    </div>
                    
                </div>
            </div>
            <div id="features">
                <div className="features-container">
                    <div className="features-title">Features</div>
                    <div className="features">
                        {features.map((feature, index)=>(
                            <div className="feature-body" key={index}>
                                <img className="icon" src={feature.iconPath}></img>
                                <h4 className="title">{feature.title}</h4>
                                <div className="description">{feature.description}</div>
                            </div>
                        ))}
                    </div>
                    
                </div>
            </div>
            <div id="pricing">
                <div className="pricing-container">
                    <div className="section-title">Pricing</div>
                    <PricingTable />
                </div>
            </div>
            <div id="support">
                <div className="section-title">Frequently asked questions</div>
                <div id="qa">
                    <div className="frequent-questions-container">
                        <FrequentQuestions />
                    </div>
                </div>
                <div id="contact">
                    <div className="contact-container">
                        <div className="left">
                            <div className="contact-info">
                                <h2>If you still have questions or you just want to make a suggestion or contact us, you can find us at:</h2>
                                <div className="contacts">
                                    <p><strong>Name:</strong> Vladulescu Stefan</p>
                                    <p><strong>Address:</strong> Constanta, Romania</p>
                                    <p><strong>Phone:</strong> +40 724 473 060</p>
                                    <p><strong>Email:</strong> contact@stefan.co.in</p>
                                </div>
                                <div className="socials">
                                    <img src="./landing-page-icons/facebook.svg"></img>
                                    <img src="./landing-page-icons/twitter.svg"></img>
                                    <img src="./landing-page-icons/instagram.svg"></img>
                                    <img src="./landing-page-icons/linkedin.svg"></img>
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            <form className="contact-form">
                                <input type="text" placeholder="Name"></input>
                                <input type="email" placeholder="Email"></input>
                                <input type="text" placeholder="Subject"></input>
                                <textarea placeholder="Message"></textarea>
                                <button>SUBMIT</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={goToTop} id="go-to-top-btn" className={isPastHome ? "show" : ""}><img src="./landing-page-icons/arrow.svg"></img></button>
        </div>
     );
}
 
export default LandingPage;
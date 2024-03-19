import { Link } from "react-router-dom";
import checkmarkIcon from './icons/checkmark.svg'

const PricingTable = () => {
    return ( 
        <div className="pricing-table">
            <div className="tier-body">
                <div className="tier-header">
                    <div className="tier-title">Free Tier</div>
                    <div className="tier-price">Free</div>
                    <div className="tier-description">Perfect for those just wanting to join others or host small events.</div>
                </div>
                <div className="tier-features">
                    <div className="tier-feature"><img className="feature-icon" src={checkmarkIcon} alt=""></img>Create 2 events</div>
                    <div className="tier-feature"><img className="feature-icon" src={checkmarkIcon} alt=""></img>Upload 3 images*</div>
                    <div className="tier-feature"><img className="feature-icon" src={checkmarkIcon} alt=""></img>Create 3 custom Lists</div>
                    <div className="tier-feature"><img className="feature-icon" src={checkmarkIcon} alt=""></img>Maximum 25 participants</div>
                    <div className="tier-feature"><img className="feature-icon" src={checkmarkIcon} alt=""></img>Standard Customer Support</div>
                </div>
                <Link to='/auth'>Choose Tier</Link>
            </div>
            <div className="tier-body">
                <div className="tier-header">
                    <div className="tier-title">Professional Tier</div>
                    <div className="tier-price">$4.99</div>
                    <div className="tier-description">The right tier for those hosting events often.</div>
                </div>
                <div className="tier-features">
                    <div className="tier-feature"><img className="feature-icon" src={checkmarkIcon} alt=""></img>Create 5 events</div>
                    <div className="tier-feature"><img className="feature-icon" src={checkmarkIcon} alt=""></img>Upload 5 images*</div>
                    <div className="tier-feature"><img className="feature-icon" src={checkmarkIcon} alt=""></img>Create 5 custom Lists</div>
                    <div className="tier-feature"><img className="feature-icon" src={checkmarkIcon} alt=""></img>Maximum 50 participants</div>
                    <div className="tier-feature"><img className="feature-icon" src={checkmarkIcon} alt=""></img>Premium Customer Support</div>
                    <div className="tier-feature"><img className="feature-icon" src={checkmarkIcon} alt=""></img>Create 3 polls at the same time</div>
                </div>
                <a href="#">Sold Out</a>
            </div>
            <div className="tier-body">
                <div className="tier-header">
                    <div className="tier-title">Professional Tier</div>
                    <div className="tier-price">$14.99</div>
                    <div className="tier-description">Great for hosting big events, like meetings, concerts, parties, etc.</div>
                </div>
                <div className="tier-features">
                    <div className="tier-feature"><img className="feature-icon" src={checkmarkIcon} alt=""></img>Create 10 events</div>
                    <div className="tier-feature"><img className="feature-icon" src={checkmarkIcon} alt=""></img>Upload 10 images*</div>
                    <div className="tier-feature"><img className="feature-icon" src={checkmarkIcon} alt=""></img>Create 10 custom Lists</div>
                    <div className="tier-feature"><img className="feature-icon" src={checkmarkIcon} alt=""></img>Maximum 150 participants</div>
                    <div className="tier-feature"><img className="feature-icon" src={checkmarkIcon} alt=""></img>VIP Customer Support</div>
                    <div className="tier-feature"><img className="feature-icon" src={checkmarkIcon} alt=""></img>Create 5 polls at the same time</div>
                    <div className="tier-feature"><img className="feature-icon" src={checkmarkIcon} alt=""></img>Custom roles</div>
                </div>
                <a href="#">Sold Out</a>
            </div>

        </div>

     );
}
 
export default PricingTable;
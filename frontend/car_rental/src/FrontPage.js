import React from 'react';
import NavBarGeneral from './Components/NavBar';
import HowToRent from './Components/HowToRent';
import MainFeaturedPost from './Components/MainFeaturedPost';
import frontPageImage from './Images/front_page.jpg'; 
import FrontPageFooter from './Components/FrontPageFooter';

const mainFeaturedPost = {
    title: 'Ride with us',
    description:
      "Embark on your journey with comfort and style! Explore our expansive fleet of meticulously maintained vehicles, designed to elevate every mile of your adventure. From sleek city cruisers to rugged off-road warriors, our diverse selection caters to every travel need. ",
    image: frontPageImage,
    imageText: 'main image description',
    linkText: 'Start now',
  };

class FrontPage extends React.Component {
  render() {
    return (
        <div>
            <NavBarGeneral/>
            <MainFeaturedPost post={mainFeaturedPost} />
            <HowToRent />
            <FrontPageFooter />
        </div>
        
        
    );
  }
}

export default FrontPage;

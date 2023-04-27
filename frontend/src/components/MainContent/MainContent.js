import { useSelector } from 'react-redux';
import './MainContent.css';
import GMap from '../GMap/GMap';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import EventSideBar from '../EventsSidebar';
import ProfileModal from '../ProfileModal/ProfileModal';
import Loading from '../GMap/Loading/Loading';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';

const MainContent = () => {
    const modalToggle = useSelector(state => state.ui.modalStatus)

    const render = (status) => {
        switch (status) {
            case Status.LOADING:
                return <Loading />; 
            case Status.SUCCESS: 
                return <GMap />;
            default:
                return null;
        }
    }

    return (
        <>
            <div id="mainContent">  
                <NavBar />
                <div className="content-wrapper">
                    <EventSideBar />
                    <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY} render={render} libraries={["places", "geocoder"]}>
                    </Wrapper>
                    {modalToggle && <ProfileModal/>}
                </div>
                <Footer />
            </div>
        </>
    )
}
export default MainContent;

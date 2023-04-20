import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import NavBar from '../NavBar/NavBar';
import './UserSettings.css'
import { updateUser } from '../../store/session';

const UserSettings = () => {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const linkedin = useSelector(state => state.session.user.linkedInUrl ? state.session.user.linkedInUrl: "")
    const phone = useSelector(state => state.session.user.phone ? state.session.user.phone: "")

    // --------
    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [username, setUsername] = useState(user.username)
    const [email, setEmail] = useState(user.email)
    const [school, setSchool] = useState(user.school)
    const [major, setMajor] = useState(user.major)
    const [linkedInUrl, setLinkedInUrl] = useState(user.linkedInUrl)
    const [phoneNum, setPhoneNum] = useState(user.phone)



    const editSettings = () => {
        let get = Array.from(document.getElementsByClassName('edit-profile-input'))
        get.forEach((input) => {
            input.disabled = false
        })
    }
    

    const handleUpdate = () => {
        dispatch(updateUser({firstName, lastName, username, email, school, major, linkedInUrl, phone}))
        
        let get = Array.from(document.getElementsByClassName('edit-profile-input'))
        get.forEach((input) => {
            input.disabled = true
        })

    }

    return (
        <>
        <NavBar/>

        <div id='big-user-container'>
            <div id='greeting'>Hello,  {user.firstName} {user.lastName}</div>

            <div id='medium-user-container'>
                <div id='user-profile-photo-container'>
                    <div id='edit-settings-image-holder'>
                        <img 
                            className="edit-profile-photo"
                            src={
                                user.firstName === "Amiter"
                                ? require('../NavBar/assets/demo_user.jpg')
                                : require('../NavBar/assets/defaultprofile.png')
                            }
                            id='edit-settings-image'
                            alt=''
                        ></img>
                    </div>
                    <div onClick={editSettings} id='editsettings-button'>Edit Settings</div>
                </div>

                <div id='user-profile-edit-container'>


                    <div id='display-profile-info-container'>
                        <div>
                            <div className='usersettings-label'>First Name</div>
                            <input className='edit-profile-input'
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    type='text'
                                    disabled
                                    />
                        </div>

                        <div>
                            <div className='usersettings-label'>Last Name</div>
                            <input className='edit-profile-input'
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    type='text'
                                    disabled
                                    />
                        </div>

                        <div>
                            <div className='usersettings-label'>Username</div>
                            <input className='edit-profile-input'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    type='text'
                                    disabled
                                    />
                        </div>

                        <div>
                            <div className='usersettings-label'>Email</div>
                            <input className='edit-profile-input'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type='email'
                                    disabled
                                    />
                        </div>

                        <div>
                            <div className='usersettings-label'>School</div>
                            <input className='edit-profile-input'
                                    value={school}
                                    onChange={(e) => setSchool(e.target.value)}
                                    type='text'
                                    disabled
                                    />
                        </div>

                        <div>
                            <div className='usersettings-label'>Major</div>
                            <input className='edit-profile-input'
                                    value={major}
                                    onChange={(e) => setMajor(e.target.value)}
                                    type='text'
                                    disabled
                                    />
                        </div>

                        <div>
                            <div className='usersettings-label'>LinkedIn Url</div>
                            <input className='edit-profile-input'
                                    value={linkedInUrl}
                                    onChange={(e) => setLinkedInUrl(e.target.value)}
                                    type='url'
                                    placeholder="https://www.linkedin.com/in/<EXAMPLE>"
                                    pattern="https://www.linkedin.com/in/*"
                                    disabled
                                    />
                        </div>

                        <div>
                            <div className='usersettings-label'>Phone</div>
                            <input className='edit-profile-input'
                                    value={phoneNum}
                                    onChange={(e) => setPhoneNum(e.target.value)}
                                    type='tel'
                                    placeholder="123-45-678" 
                                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                                    disabled
                                    />
                        </div>
                    <div id='savesettings-button' onClick={handleUpdate}>Save Settings</div>
                    </div>

                </div>
            </div>
        </div>
        </>
    )
}

export default UserSettings;
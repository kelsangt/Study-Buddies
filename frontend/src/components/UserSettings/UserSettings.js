import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import NavBar from '../NavBar/NavBar';
import './UserSettings.css'

const UserSettings = () => {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();

    const linkedin = useSelector(state => state.session.user.linkedInUrl ? state.session.user.linkedInUrl: "")
    const phone = useSelector(state => state.session.user.phone ? state.session.user.phone: "")


    const editSettings = () => {
        let get = Array.from(document.getElementsByClassName('edit-profile-input'))
        get.forEach((input) => {
            input.disabled = false
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
                        <img src={require('../NavBar/assets/cat.jpeg')}
                            id='edit-settings-image'
                        ></img>
                    </div>
                    <div onClick={editSettings} id='editsettings-button'>Edit Settings</div>
                </div>

                <div id='user-profile-edit-container'>


                    <div id='display-profile-info-container'>
                        <div>
                            <div className='usersettings-label'>First Name</div>
                            <input className='edit-profile-input'
                                    value={user.firstName}
                                    type='text'
                                    disabled
                                    />
                        </div>

                        <div>
                            <div className='usersettings-label'>Last Name</div>
                            <input className='edit-profile-input'
                                    value={user.lastName}
                                    type='text'
                                    disabled
                                    />
                        </div>

                        <div>
                            <div className='usersettings-label'>Username</div>
                            <input className='edit-profile-input'
                                    value={user.username}
                                    type='text'
                                    disabled
                                    />
                        </div>

                        <div>
                            <div className='usersettings-label'>Email</div>
                            <input className='edit-profile-input'
                                    value={user.email}
                                    type='text'
                                    disabled
                                    />
                        </div>

                        <div>
                            <div className='usersettings-label'>School</div>
                            <input className='edit-profile-input'
                                    value={user.school}
                                    type='text'
                                    disabled
                                    />
                        </div>

                        <div>
                            <div className='usersettings-label'>Major</div>
                            <input className='edit-profile-input'
                                    value={user.major}
                                    type='text'
                                    disabled
                                    />
                        </div>

                        <div>
                            <div className='usersettings-label'>LinkedIn Url</div>
                            <input className='edit-profile-input'
                                    value={user.linkedInUrl}
                                    type='text'
                                    disabled
                                    />
                        </div>

                        <div>
                            <div className='usersettings-label'>Phone</div>
                            <input className='edit-profile-input'
                                    value={user.phone}
                                    type='text'
                                    disabled
                                    />
                        </div>
                    <div id='savesettings-button'>Save Settings</div>
                    </div>

                </div>
            </div>
        </div>
        </>
    )
}

export default UserSettings;
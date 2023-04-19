import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import NavBar from '../NavBar/NavBar';
import './UserSettings.css'

const UserSettings = () => {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();



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
            <div id='user-profile-photo-container'>
                <div>
                    <img src={require('../NavBar/assets/cat.jpeg')}></img>
                </div>
                <div onClick={editSettings} id='editsettings-button'>Edit Settings</div>
            </div>

            <div id='user-profile-edit-container'>
                <div id='greeting'>Hello, {user.firstName} {user.lastName}</div>

                <div>
                    <div>Username</div>
                    <input className='edit-profile-input'
                            value={user.username}
                            type='text'
                            disabled
                    />

                </div>

                <div>
                    <div>Email</div>
                    <input className='edit-profile-input'
                            value={user.email}
                            type='text'
                            disabled
                    />
                </div>

                <div>
                    <div>School</div>
                    <input className='edit-profile-input'
                            value={user.school}
                            type='text'
                            disabled
                    />
                </div>

                <div>
                    <div>Major</div>
                    <input className='edit-profile-input'
                            value={user.major}
                            type='text'
                            disabled
                    />
                </div>

                <div id='savesettings-button'>Save Settings</div>
            </div>
        </div>
        </>
    )
}

export default UserSettings;
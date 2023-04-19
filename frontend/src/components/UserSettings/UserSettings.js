import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import NavBar from '../NavBar/NavBar';
import './UserSettings.css'

const UserSettings = () => {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    // const [editMode, setEditMode] = useState(false);



    const editSettings = () => {
        let get = document.querySelectorAll('.edit-profile-input')
        get.disabled = false
    }

    return (
        <>
        <NavBar/>
        <div id='big-user-container'>
            <div id='user-profile-photo-container'>
                <div>
                    <img src={require('../NavBar/assets/cat.jpeg')}></img>
                </div>
                <div onClick={editSettings}>Edit Settings</div>
            </div>

            <div id='user-profile-edit-container'>
                <div id='greeting'>Hello, {user.firstName} {user.lastName}</div>

                <div>
                    <div>Username</div>
                    <input className='edit-profile-input'
                            // placeholder={user.username}
                            value={user.username}
                            type='text'
                            disabled
                    />

                    {/* <div>{user.username}</div> */}
                </div>

                <div>
                    <div>Email</div>
                    <input className='edit-profile-input'
                            // placeholder={user.username}
                            value={user.email}
                            type='text'
                            disabled
                    />
                    {/* <div>{user.email}</div> */}
                </div>

                <div>
                    <div>School</div>
                    <input className='edit-profile-input'
                            // placeholder={user.username}
                            value={user.school}
                            type='text'
                            disabled
                    />
                    {/* <div>{user.school}</div> */}
                </div>

                <div>
                    <div>Major</div>
                    <input className='edit-profile-input'
                            // placeholder={user.username}
                            value={user.major}
                            type='text'
                            disabled
                    />
                    {/* <div>{user.major}</div> */}
                </div>

                <div>Save Settings</div>
            </div>
        </div>
        </>
    )
}

export default UserSettings;
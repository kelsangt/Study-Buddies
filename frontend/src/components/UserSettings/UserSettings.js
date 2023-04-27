import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { clearSessionErrors } from '../../store/session';
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
    const errors = useSelector(state => state.errors.session);

    useEffect(() => {
        return () => {
          dispatch(clearSessionErrors());
        };
      }, [dispatch]);
    
    const update = field => {
        let setState;
    
        switch (field) {
            case 'firstName':
                setState = setFirstName;
                break;
            case 'lastName':
                setState = setLastName;
                break;
            case 'username':
                setState = setUsername;
                break;
            case 'email':
                setState = setEmail;
                break;
            case 'school':
                setState = setSchool;
                break;
            case 'major':
                setState = setMajor;
                break;
            case 'linkedInUrl':
                setState = setLinkedInUrl;
                break;
            case 'phone':
                setState = setPhoneNum;
                break;
            default:
                throw Error('Unknown field in Edit Form');
        }
    
        return e => setState(e.currentTarget.value);
      }

    const editSettings = () => {
        let get = Array.from(document.getElementsByClassName('edit-profile-input'))
        get.forEach((input) => {
            if (input.type === 'email') {
                input.disabled = true; 
                return
            }
            input.disabled = false
        })
    }
    

    const handleUpdate = (e) => {
        e.preventDefault();
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
                            src={require('../NavBar/assets/defaultprofile.png')}
                            id='edit-settings-image'
                            alt=''
                        ></img>
                    </div>
                    <div onClick={editSettings} id='editsettings-button'>Edit Settings</div>
                </div>

                <div id='user-profile-edit-container'>


                    <form id='display-profile-info-container' onSubmit={handleUpdate}>
                        <div>
                            <div className='usersettings-label'>First Name</div>
                            <input className='edit-profile-input'
                                    value={firstName}
                                    onChange={update('firstName')}
                                    type='text'
                                    disabled
                                    required
                                    />
                        </div>

                        <div>
                            <div className='usersettings-label'>Last Name</div>
                            <input className='edit-profile-input'
                                    value={lastName}
                                    onChange={update('lastName')}
                                    type='text'
                                    disabled
                                    required
                                    />
                        </div>

                        <div>
                            <div className='usersettings-label'>Username</div>
                            <input className='edit-profile-input'
                                    value={username}
                                    onChange={update('username')}
                                    type='text'
                                    disabled
                                    required
                                    />
                        </div>

                        <div>
                            <div className='usersettings-label'>Email</div>
                            <input className='edit-profile-input'
                                    value={email}
                                    // onChange={update('email')}
                                    type='email'
                                    disabled
                                    required
                                    />
                        </div>

                        <div>
                            <div className='usersettings-label'>School</div>
                            <input className='edit-profile-input'
                                    value={school}
                                    onChange={update('school')}
                                    type='text'
                                    disabled
                                    required
                                    />
                        </div>

                        <div>
                            <div className='usersettings-label'>Major</div>
                            <input className='edit-profile-input'
                                    value={major}
                                    onChange={update('major')}
                                    type='text'
                                    disabled
                                    required
                                    />
                        </div>

                        <div>
                            <div className='usersettings-label'>LinkedIn Url</div>
                            <input className='edit-profile-input'
                                    value={linkedInUrl}
                                    onChange={update('linkedInUrl')}
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
                                    onChange={update('phone')}
                                    type='tel'
                                    placeholder="123-456-7890" 
                                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                    disabled
                                    />
                        </div>
                        
                        <div id='savesettings-button-holder'>
                        <input className='savesettings-button' 
                                type='submit'
                                value="Save Settings"
                                disabled={!email || !username || !firstName || !lastName || !school || !major}
                                ></input>
                        </div>

                    </form>

                </div>
            </div>
        </div>
        </>
    )
}

export default UserSettings;
import React, { useEffect, useState } from 'react';
// import NonEditableProfilePicture from './NonEditableProfilePicture';
// import NonEditableUserInformation from './NonEditableUserInformation';
// import NonEditableDescription from './NonEditableDescription';
import ClickableSocials from './ClickableSocials';
import CommunicationHandler from './CommunicationHandler';
import { Circles, Grid } from 'react-loader-spinner'



function Person(props) {
    let createConversationFunc = props.createConversationFunctionGenerator(props.accountsID)
    let accountsID = props.accountsID;

    // user information
    const [name, setName] = useState("");
    const [oldName, setOldName] = useState("");
    const [company, setCompany] = useState("");
    const [graduationYear, setGraduationYear] = useState("");
    const [pronouns, setPronouns] = useState("");
    const [academy, setAcademy] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const [description, setDescription] = useState(null);
    const [oldDescription, setOldDescription] = useState(null);
    const [linkedIn, setLinkedIn] = useState("");
    const [linkedInLink, setLinkedInLink] = useState("");
    const [loading, setLoading] = useState(true);

    const [profilePictureFile, setProfilePictureFile] = useState(null);
    // pull profile picture from database using props.accountsID
    useEffect(() => {
        // pull profilepicture from database
        // if null: setProfilePictureFile(personImage2);
        // else: setProfilePictureFile(string)
        // setProfilePictureFile(personImage2);
        // setOldName(name);
        // setOldDescription(description);
        // console.log(props);
        // console.log(accountsID);
        if (accountsID !== -1) {
            // console.log("refreshing person.js")
            setLoading(true);
            CommunicationHandler.getProfilePicture(setProfilePictureFile, accountsID);
            CommunicationHandler.getProfileDataByID(setProfileData, accountsID);
            CommunicationHandler.getDescriptionByID(onDescriptionReceived, accountsID);
            CommunicationHandler.getSocialsInfoByID(setLinkedInData, accountsID);
        }


    }, [props.accountsID]);

    const setProfileData = (data) => {
        // console.log("setting profile data");
        setCompany(data.company || "");
        setGraduationYear(data.graduation_year);
        setPronouns(data.pronouns || "");
        setAcademy(data.academy);
        setName(data.first_name + " " + data.last_name);
        setProfilePicture(data.profile_picture);
        // setLoading(false);
    }

    const checkCompany = () => {
        return company != "";
    }

    const checkPronouns = () => {
        return pronouns != "";
    }

    const packGetData = () => {
        return {
            account_id: accountsID
        }
    }

    const onDescriptionReceived = (data) => {
        console.log("got description")
        if (data.description == "" || data.description == null) {
            setDescription("This person likes to stay secretive...")
        } else {
            setDescription(data.description);
        }
    }

    const setLinkedInData = (data) => {
        setLinkedIn(data.linkedin);
        setLinkedInLink("https://linkedin.com/in/" + data.linkedin + "/");
    }

    useEffect(() => {
        // console.log(name);
        // console.log(description)
        if (name !== "" && description !== null) {
            setLoading(false);
        }
    }, [name, description])

    if (accountsID == -1) {
        return (
            <div className='flex justify-center items-center'>
                <h1 className="text-4xl font-bold text-stone-600 inline-block align-middle ">Search the directory to find your classmates!</h1>
            </div>
        )
    }
    else {
        if (loading) {
            return (
                <div className='flex justify-center items-center mt-16'>
                    {/* w-full grid grid-cols-3 gap-8 mt-4 ml-10 */}
                    <Grid
                        height="80"
                        width="80"
                        color="#38bdf7"
                        ariaLabel="grid-loading"
                        radius="12.5"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                </div>)
        }
        else {
            return (
                <div className='w-full grid grid-cols-3 gap-8 mt-4 ml-10'>
                    <div>
                        <div className="avatar" >
                            <div className="w-64 rounded-full">
                                <img id="pfp" src={profilePicture} referrerpolicy="no-referrer"/>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-2'>
                        <div className="text-left ml-12">
                            <div className='mb-5'>
                                <h1 className="text-4xl font-bold text-stone-600 mr-6 inline-block align-middle">{name}</h1>
                                <div>
                                    <div className='mb-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 float-left mt-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                        </svg>
                                        <p class="text-3xl font-semibold text-stone-600 dark:text-white w-full max-w-xs ml-4 mt-2 inline-block align-middle">Class of {graduationYear}</p>
                                    </div>
                                    <div className='mb-3'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 float-left mt-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                                        </svg>
                                        <p class="text-3xl font-semibold  text-stone-600 dark:text-white w-full max-w-xs ml-4 mt-2 inline-block align-middle">{academy}</p>
                                    </div>
                                    {checkCompany() ? (
                                        <div className='mb-2'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 float-left mt-4">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                                            </svg>
                                            <p class="text-3xl font-semibold  text-stone-600 dark:text-white w-full max-w-xs ml-4 mt-2 inline-block align-middle">{company}</p>
                                        </div>
                                    ) : null
                                    }
                                    {checkPronouns() ? (
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 float-left mt-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                            </svg>
                                            <p class="text-3xl font-semibold text-stone-600 dark:text-white w-full max-w-xs ml-4 mt-2 inline-block align-middle">{pronouns}</p>
                                        </div>
                                    ) : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-3'>
                        <div className='mt-4'>
                            <p class="text-xl w-11/12 font-semibold text-stone-600 dark:text-white inline-block align-middle float-left text-left">{description}</p>
                        </div>
                    </div>
                    <div className='col-span-3'>
                        <div>
                            {linkedIn == null ? null :
                                <a href={linkedInLink} target="_blank" rel="noopener noreferrer">
                                    <button className="mr-3 btn bg-sky-400 hover:bg-gradient-to-r hover:from-sky-300 hover:to-sky-400 hover:border-sky-300 border-sky-100 float-left normal-case text-xl" >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="currentColor"
                                            viewBox="0 0 24 24">
                                            <path
                                                d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                                        </svg>
                                        {/* {"LinkedIn"} */}
                                    </button>
                                </a>
                            }
                            {accountsID === props.loggedInID ?
                                (
                                    <a href="/me">
                                        <div className="col-span-3">
                                            <button className="btn bg-sky-400 hover:bg-gradient-to-r hover:from-sky-300 hover:to-sky-400 hover:border-sky-300 border-sky-100 float-left normal-case text-xl" >
                                                <svg
                                                    viewBox="0 0 1024 1024"
                                                    className="mr-2"
                                                    fill="currentColor"
                                                    height="1em"
                                                    width="1em"
                                                >
                                                    <path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z" />
                                                </svg>
                                                Edit</button>
                                        </div>
                                    </a>)
                                :
                                (<div className="col-span-3">
                                    <button className="btn bg-sky-400 hover:bg-gradient-to-r hover:from-sky-300 hover:to-sky-400 hover:border-sky-300 border-sky-100 float-left normal-case text-xl" onClick={createConversationFunc}>
                                        <svg
                                            fill="currentColor"
                                            className="mr-2"
                                            viewBox="0 0 16 16"
                                            height="1em"
                                            width="1em"
                                        >
                                            <path d="M2.678 11.894a1 1 0 01.287.801 10.97 10.97 0 01-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 01.71-.074A8.06 8.06 0 008 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 01-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 00.244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 01-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
                                        </svg>
                                        Message</button>
                                </div>)
                            }
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Person;
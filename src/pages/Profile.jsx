import React, { useState, useEffect, useRef, useContext } from 'react';
import styles from './css/Profile.module.css';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { UserContext } from '../UserProvider';
import { Link } from 'react-router-dom';

export default function Profile() {
    // const { user } = useContext(UserContext);

    const [profileData, setProfileData] = useState(null);
    const [postedCars, setPostedCars] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [editMode, setEditMode] = useState(false);
    const [editProfile, setEditProfile] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        bio: '',
        address: {
            pincode: '',
            city: '',
            nearby: '',
            apartmentNumber: '',
            additionalInfo: ''
        }
    });
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [banner, setBanner] = useState(null);
    const [bannerPreview, setBannerPreview] = useState(null);
    const [updateError, setUpdateError] = useState(null);
    const [updating, setUpdating] = useState(false);

    const photoInputRef = useRef(null);
    const bannerInputRef = useRef(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/v1/user/profile', { credentials: 'include' });
                const data = await res.json();
                if (!res.ok) setError(data.message || 'Error fetching profile');
                else setProfileData(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/v1/user/postedCars', { credentials: 'include' });
                const data = await res.json();
                if (res.ok) setPostedCars(data.data.documents);
            } catch (err) {
                console.error(err);
            }
        };
        fetchCars();
    }, []);

    useEffect(() => {
        if (!profileData || !profileData.user) return;
        const u = profileData.user;
        setEditProfile({
            firstName: u.firstName || '',
            lastName: u.lastName || '',
            email: u.email || '',
            phone: u.phone || '',
            bio: u.bio || '',
            address: {
                pincode: u.address?.pincode || '',
                city: u.address?.city || '',
                nearby: u.address?.nearby || '',
                apartmentNumber: u.address?.apartmentNumber || '',
                additionalInfo: u.address?.additionalInfo || ''
            }
        });
        if (u.photo) setPhotoPreview(u.photo);
        if (u.banner) setBannerPreview(u.banner);
    }, [profileData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('address.')) {
            const key = name.split('.')[1];
            setEditProfile(prev => ({
                ...prev,
                address: { ...prev.address, [key]: value }
            }));
        } else {
            setEditProfile(prev => ({ ...prev, [name]: value }));
        }
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
            setPhotoPreview(URL.createObjectURL(file));
        }
    };

    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBanner(file);
            setBannerPreview(URL.createObjectURL(file));
        }
    };

    const handleEditToggle = () => setEditMode(true);

    const handleCancelEdit = () => {
        if (profileData?.user) {
            const u = profileData.user;
            setEditProfile(prev => ({
                ...prev,
                firstName: u.firstName,
                lastName: u.lastName,
                email: u.email,
                phone: u.phone,
                bio: u.bio,
                address: {
                    pincode: u.address?.pincode,
                    city: u.address?.city,
                    nearby: u.address?.nearby,
                    apartmentNumber: u.address?.apartmentNumber,
                    additionalInfo: u.address?.additionalInfo
                }
            }));
            setPhoto(null); setPhotoPreview(u.photo);
            setBanner(null); setBannerPreview(u.banner);
        }
        setEditMode(false);
        setUpdateError(null);
    };

    const handleSaveProfile = async (e) => {
        e.preventDefault(); setUpdating(true); setUpdateError(null);
        try {
            const fd = new FormData();
            Object.entries({
                firstName: editProfile.firstName,
                lastName: editProfile.lastName,
                email: editProfile.email,
                phone: editProfile.phone,
                bio: editProfile.bio
            }).forEach(([k, v]) => fd.append(k, v));
            fd.append('address', JSON.stringify(editProfile.address));
            if (photo) fd.append('photo', photo);
            if (banner) fd.append('banner', banner);

            const res = await fetch('http://localhost:3000/api/v1/user/updateme', {
                method: 'PATCH', credentials: 'include', body: fd
            });
            const data = await res.json();
            if (!res.ok) setUpdateError(data.message);
            else { setProfileData(data.data); setEditMode(false); }
        } catch (err) { setUpdateError(err.message); }
        finally { setUpdating(false); }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <>
            <Nav />
            <main className={styles['profile-main']}>
                <div className={styles['profile-header']}>
                    <div className={styles['profile-cover']}>
                        <img
                            src={
                                bannerPreview?.startsWith('blob:')
                                    ? bannerPreview
                                    : `http://localhost:3000/images/banner/${bannerPreview}.jpg`
                            }
                            alt="Cover"
                        />
                        {editMode && (
                            <button className={styles['edit-banner']} onClick={() => bannerInputRef.current.click()}>
                                <i className="ri-image-edit-line" />
                            </button>
                        )}
                        <input
                            type="file" accept="image/*" ref={bannerInputRef} style={{ display: 'none' }}
                            onChange={handleBannerChange}
                        />
                    </div>

                    <div className={styles['profile-avatar']}>
                        <img
                            src={
                                photoPreview?.startsWith('blob:')
                                    ? photoPreview
                                    : `http://localhost:3000/images/user/${photoPreview}.jpg`
                            }
                            alt="Profile"
                        />
                        {editMode && (
                            <button className={styles['edit-avatar']} onClick={() => photoInputRef.current.click()}>
                                <i className="ri-camera-line" />
                            </button>
                        )}
                        <input
                            type="file" accept="image/*" ref={photoInputRef} style={{ display: 'none' }}
                            onChange={handlePhotoChange}
                        />
                    </div>

                    <div className={styles['profile-info']}>
                        <h1>{profileData.user.firstName} {profileData.user.lastName}</h1>
                        <p>{profileData.user.bio || 'User Bio'}</p>
                    </div>
                </div>

                <div className={styles['profile-content']}>
                    {/* Sidebar */}
                    <aside className={styles['profile-sidebar']}>
                        <div className={styles['sidebar-card']}>
                            <h3>Account Security</h3>
                            <ul className={styles['profile-menu']}>
                                <li><Link to="/ForgetPassword"><i className="ri-lock-unlock-line" /> Forget Password</Link></li>
                                <li><Link to="/ResetPassword"><i className="ri-lock-password-line" /> Reset Password</Link></li>
                                <li><Link to="/UpdatePassword"><i className="ri-lock-line" /> Update Password</Link></li>
                            </ul>
                        </div>
                    </aside>

                    <section className={styles['profile-main-content']}>
                        {/* Personal Info Card */}
                        <div className={styles['content-card']}>
                            <div className={styles['card-header']}>
                                <h2>Personal Information</h2>
                                {!editMode && <button className={styles['btn-edit']} onClick={handleEditToggle}><i className="ri-edit-line" /> Edit</button>}
                            </div>
                            <form className={styles['profile-form']} onSubmit={handleSaveProfile}>
                                {/* Name */}
                                <div className={styles['form-row']}>
                                    <div className={styles['form-group']}><label>First Name</label><input name="firstName" value={editProfile.firstName} onChange={handleInputChange} disabled={!editMode} /></div>
                                    <div className={styles['form-group']}><label>Last Name</label><input name="lastName" value={editProfile.lastName} onChange={handleInputChange} disabled={!editMode} /></div>
                                </div>
                                {/* Email & Phone */}
                                <div className={styles['form-row']}>
                                    <div className={styles['form-group']}><label>Email</label><input type="email" name="email" value={editProfile.email} onChange={handleInputChange} disabled={!editMode} /></div>
                                    <div className={styles['form-group']}><label>Phone</label><input type="tel" name="phone" value={editProfile.phone} onChange={handleInputChange} disabled={!editMode} /></div>
                                </div>
                                {/* Bio */}
                                <div className={styles['form-row']}>
                                    <div className={styles['form-group']}><label>Bio</label><textarea rows={5} name="bio" value={editProfile.bio} onChange={handleInputChange} disabled={!editMode} /></div>
                                </div>
                                {/* Address */}
                                <div className={styles['form-row']}>
                                    <div className={styles['form-group']}><label>Pincode</label><input name="address.pincode" value={editProfile.address.pincode} onChange={handleInputChange} disabled={!editMode} /></div>
                                    <div className={styles['form-group']}><label>City</label><input name="address.city" value={editProfile.address.city} onChange={handleInputChange} disabled={!editMode} /></div>
                                </div>
                                <div className={styles['form-row']}>
                                    <div className={styles['form-group']}><label>Nearby</label><input name="address.nearby" value={editProfile.address.nearby} onChange={handleInputChange} disabled={!editMode} /></div>
                                    <div className={styles['form-group']}><label>Apartment Number</label><input name="address.apartmentNumber" value={editProfile.address.apartmentNumber} onChange={handleInputChange} disabled={!editMode} /></div>
                                </div>
                                <div className={styles['form-group']}><label>Additional Info</label><input name="address.additionalInfo" value={editProfile.address.additionalInfo} onChange={handleInputChange} disabled={!editMode} /></div>

                                {editMode && <div className={styles['form-actions']}><button type="button" className={styles['btn-cancel']} onClick={handleCancelEdit}>Cancel</button><button type="submit" className={styles['btn-save']} disabled={updating}>{updating ? 'Saving...' : 'Save'}</button></div>}
                                {updateError && <p style={{ color: 'red' }}>{updateError}</p>}
                            </form>
                        </div>

                        {/* Posted Cars Card */}
                        {
                            profileData.user.role == 'admin' && (
                                <div className={styles['content-card']}>
                                    <div className={styles['card-header']}><h2>Posted Cars</h2></div>
                                    <div className={styles['vehicles-grid']}>
                                        {postedCars.length > 0 ? postedCars.map(car => (
                                            <div key={car._id} className={styles['vehicle-card']}>
                                                <img src={`http://localhost:3000/images/cars/${car.images.main}`} alt={car.fullName} />
                                                <div className={styles['vehicle-info']}>
                                                    <h3>{car.fullName}</h3>
                                                    <p>{car.location}</p>
                                                    <button className={styles['btn-outline']}>View Details</button>
                                                </div>
                                            </div>
                                        )) : <p>No posted cars found.</p>}
                                    </div>
                                </div>
                            )
                        }


                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
}

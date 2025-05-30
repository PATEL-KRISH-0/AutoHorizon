import React from 'react'
import styles from './css/UploadCar.module.css';
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
export default function UploadCar() {
    return (
        <>
            <Nav />
            <main className={styles['upload-main']}>
                <div className={styles['upload-header']}>
                    <h1>Upload Your Car</h1>
                    <p>
                        Share your electric vehicle with our community. Provide as much detail as
                        possible to help potential buyers make informed decisions.
                    </p>
                </div>
                <form className={styles['upload-form']} onsubmit="handleSubmit(event)">
                    {/* Basic Information */}
                    <div className={styles['form-section']}>
                        <h2>
                            <i className="ri-information-line" />
                            Basic Information
                        </h2>
                        <div className={styles['form-grid']}>
                            <div className={styles['form-group']}>
                                <label htmlFor="brand">
                                    <i className="ri-car-line" />
                                    Brand
                                </label>
                                <select id="brand" required="">
                                    <option value="">Select Brand</option>
                                    <option value="tesla">Tesla</option>
                                    <option value="porsche">Porsche</option>
                                    <option value="audi">Audi</option>
                                    <option value="bmw">BMW</option>
                                </select>
                            </div>
                            <div className={styles['form-group']}>
                                <label htmlFor="model">
                                    <i className="ri-car-line" />
                                    Model
                                </label>
                                <input type="text" id="model" required="" />
                            </div>
                            <div className={styles['form-group']}>
                                <label htmlFor="year">
                                    <i className="ri-calendar-line" />
                                    Year
                                </label>
                                <input type="number" id="year" min={1900} max={2025} required="" />
                            </div>
                            <div className={styles['form-group']}>
                                <label htmlFor="price">
                                    <i className="ri-money-dollar-circle-line" />
                                    Price
                                </label>
                                <input type="number" id="price" min={0} required="" />
                            </div>
                        </div>
                    </div>
                    {/* Vehicle Specifications */}
                    <div className={styles['form-section']}>
                        <h2>
                            <i className="ri-settings-2-line" />
                            Vehicle Specifications
                        </h2>
                        <div className={styles['form-grid']}>
                            <div className={styles['form-group']}>
                                <label htmlFor="range">
                                    <i className="ri-battery-2-charge-line" />
                                    Range (miles)
                                </label>
                                <input type="number" id="range" min={0} required="" />
                            </div>
                            <div className={styles['form-group']}>
                                <label htmlFor="acceleration">
                                    <i className="ri-speed-line" />
                                    0-60 mph (seconds)
                                </label>
                                <input type="number" id="acceleration" step="0.1" required="" />
                            </div>
                            <div className={styles['form-group']}>
                                <label htmlFor="topSpeed">
                                    <i className="ri-dashboard-3-line" />
                                    Top Speed (mph)
                                </label>
                                <input type="number" id="topSpeed" min={0} required="" />
                            </div>
                            <div className={styles['form-group']}>
                                <label htmlFor="charging">
                                    <i className="ri-charging-pile-2-line" />
                                    Charging Time (hours)
                                </label>
                                <input type="number" id="charging" step="0.5" required="" />
                            </div>
                        </div>
                    </div>
                    {/* Additional Features */}
                    <div className={styles['form-section']}>
                        <h2>
                            <i className="ri-list-check" />
                            Additional Features
                        </h2>
                        <div className={styles['dynamic-fields']} id="featureFields">
                            <div className="dynamic-field form-group">
                                <input type="text" placeholder="Enter feature" required="" />
                                <button
                                    type="button"
                                    className={styles['remove-field']}
                                    onclick="removeField(this)"
                                >
                                    <i className="ri-delete-bin-line" />
                                </button>
                            </div>
                        </div>
                        <button type="button" className={styles['add-field']} onclick="addFeatureField()">
                            <i className="ri-add-line" />
                            Add Feature
                        </button>
                    </div>
                    {/* Description */}
                    <div className={styles['form-section']}>
                        <h2>
                            <i className="ri-file-text-line" />
                            Description
                        </h2>
                        <div className={styles['form-group']}>
                            <textarea
                                id="description"
                                placeholder="Provide a detailed description of your vehicle..."
                                required=""
                                defaultValue={""}
                            />
                        </div>
                    </div>
                    {/* Image Upload */}
                    <div className={styles['form-section']}>
                        <h2>
                            <i className="ri-image-line" />
                            Vehicle Images
                        </h2>
                        <div className={styles['image-upload']} onclick="triggerImageUpload()">
                            <i className="ri-upload-cloud-line" />
                            <p>Click to upload images</p>
                            <span>Supports: JPG, PNG (Max 5MB each)</span>
                            <input
                                type="file"
                                id="imageInput"
                                multiple=""
                                accept="image/*"
                                style={{ display: "none" }}
                                onchange="handleImageUpload(event)"
                            />
                        </div>
                        <div className={styles['image-preview']} id="imagePreview" />
                    </div>
                    {/* Form Actions */}
                    <div className={styles['form-actions']}>
                        <button type="button" className="btn btn-secondary" onclick="resetForm()">
                            <i className="ri-refresh-line" />
                            Reset
                        </button>
                        <button type="submit" className="btn btn-primary">
                            <i className="ri-upload-2-line" />
                            Upload Car
                        </button>
                    </div>
                </form>
            </main>
            <Footer />

        </>
    )
}

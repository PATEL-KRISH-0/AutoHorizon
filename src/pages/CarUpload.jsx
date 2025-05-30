import React, { useState } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import styles from './css/CarUpload.module.css';

export default function CarUpload() {
  // Sample data for placeholders
  const sampleData = {
    status: 'Used',
    brand: 'Toyota',
    model: 'Camry',
    fullName: 'Toyota Camry XLE',
    year: '2020',
    location: 'New York, USA',
    transmission: 'Auto',
    mileage: '25,000 miles',
    seats: '5',
    drivetrain: 'FWD',
    fuelType: 'Gasoline',
    price: '25000',
    carType: 'Sedan',
    tabs: {
      specifications: {
        Performance: ['Horsepower: 203 hp', '0-60 mph: 7.1 sec'],
        'Fuel Economy': ['City: 29 mpg', 'Highway: 41 mpg'],
        Dimensions: ['Length: 192.7 in', 'Width: 73 in']
      },
      features: [
        {
          icon: 'ri-steering-2-line',
          title: 'Adaptive Cruise Control',
          description: 'Automatically adjusts speed to maintain a safe distance'
        },
        {
          icon: 'ri-sun-line',
          title: 'Panoramic Sunroof',
          description: 'Enjoy the open sky with a large sunroof'
        }
      ],
      warranty: {
        title: 'Toyota Warranty',
        details: ['3-year/36,000-mile basic warranty', '5-year/60,000-mile powertrain warranty']
      }
    },
    key_features: [
      { icon: 'ri-shield-star-line', label: 'Safety Sense' },
      { icon: 'ri-gas-station-line', label: 'Excellent Fuel Economy' }
    ],
    details: {
      acceleration: '7.1 sec 0-60 mph',
      topSpeed: '120 mph',
      fuelType: 'Gasoline'
    },
    specs: {
      year: '2020',
      location: 'New York, USA',
      transmission: 'Auto',
      mileage: '25,000 miles',
      seats: '5',
      driveType: 'FWD'
    }
  };

  // Initial state with empty values (using placeholders from sampleData)
  const [formData, setFormData] = useState({
    status: 'Used',
    brand: 'Toyota',
    model: 'Camry',
    fullName: 'Toyota Camry XLE',
    year: '2020',
    location: 'New York, USA',
    transmission: 'Auto',
    mileage: '25,000 miles',
    seats: '5',
    drivetrain: 'FWD',
    fuelType: 'Gasoline',
    price: '25000',
    carType: 'Sedan',
    tabs: {
      specifications: {
        Performance: ['Horsepower: 203 hp', '0-60 mph: 7.1 sec'],
        'Fuel Economy': ['City: 29 mpg', 'Highway: 41 mpg'],
        Dimensions: ['Length: 192.7 in', 'Width: 73 in']
      },
      features: [
        {
          icon: 'ri-steering-2-line',
          title: 'Adaptive Cruise Control',
          description: 'Automatically adjusts speed to maintain a safe distance'
        },
        {
          icon: 'ri-sun-line',
          title: 'Panoramic Sunroof',
          description: 'Enjoy the open sky with a large sunroof'
        }
      ],
      warranty: {
        title: 'Toyota Warranty',
        details: ['3-year/36,000-mile basic warranty', '5-year/60,000-mile powertrain warranty']
      }
    },
    key_features: [
      { icon: 'ri-shield-star-line', label: 'Safety Sense' },
      { icon: 'ri-gas-station-line', label: 'Excellent Fuel Economy' }
    ],
    details: {
      acceleration: '7.1 sec 0-60 mph',
      topSpeed: '120 mph',
      fuelType: 'Gasoline'
    },
    specs: {
      year: '2020',
      location: 'New York, USA',
      transmission: 'Auto',
      mileage: '25,000 miles',
      seats: '5',
      driveType: 'FWD'
    }
  })
  // const [formData, setFormData] = useState({
  //   status: '',
  //   brand: '',
  //   model: '',
  //   fullName: '',
  //   year: '',
  //   location: '',
  //   transmission: '',
  //   mileage: '',
  //   seats: '',
  //   drivetrain: '',
  //   fuelType: '',
  //   price: '',
  //   carType: '',
  //   tabs: {
  //     specifications: {
  //       Performance: ['', ''],
  //       'Fuel Economy': ['', ''],
  //       Dimensions: ['', '']
  //     },
  //     features: [
  //       { icon: '', title: '', description: '' },
  //       { icon: '', title: '', description: '' }
  //     ],
  //     warranty: {
  //       title: '',
  //       details: ['', '']
  //     }
  //   },
  //   key_features: [
  //     { icon: '', label: '' },
  //     { icon: '', label: '' }
  //   ],
  //   details: {
  //     acceleration: '',
  //     topSpeed: '',
  //     fuelType: ''
  //   },
  //   specs: {
  //     year: '',
  //     location: '',
  //     transmission: '',
  //     mileage: '',
  //     seats: '',
  //     driveType: ''
  //   }
  // });

  // Separate state for handling file upload and previews
  const [uploadedImages, setUploadedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  // General change handler for flat fields
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handler for nested fields in tabs.specifications
  const handleSpecificationChange = (category, index, value) => {
    setFormData((prev) => {
      const specifications = { ...prev.tabs.specifications };
      const updatedArr = [...specifications[category]];
      updatedArr[index] = value;
      specifications[category] = updatedArr;
      return { ...prev, tabs: { ...prev.tabs, specifications } };
    });
  };

  // Handle changes for tabs.features
  const handleFeatureChange = (index, key, value) => {
    setFormData((prev) => {
      const features = [...prev.tabs.features];
      features[index] = { ...features[index], [key]: value };
      return { ...prev, tabs: { ...prev.tabs, features } };
    });
  };

  // Handle warranty details changes
  const handleWarrantyDetailChange = (index, value) => {
    setFormData((prev) => {
      const details = [...prev.tabs.warranty.details];
      details[index] = value;
      return {
        ...prev,
        tabs: {
          ...prev.tabs,
          warranty: { ...prev.tabs.warranty, details }
        }
      };
    });
  };

  // Handle key features changes
  const handleKeyFeatureChange = (index, key, value) => {
    setFormData((prev) => {
      const keyFeatures = [...prev.key_features];
      keyFeatures[index] = { ...keyFeatures[index], [key]: value };
      return { ...prev, key_features: keyFeatures };
    });
  };

  // Handle changes for specs (flat nested object)
  const handleSpecsChange = (key, value) => {
    setFormData((prev) => ({ ...prev, specs: { ...prev.specs, [key]: value } }));
  };

  // Handle image file selection and generate preview URLs
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedImages(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  // Updated handleSubmit to send all data via FormData
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Build FormData to send all fields and images.
    const formDataToSend = new FormData();

    // Append each field from formData. For objects, use JSON.stringify.
    for (const key in formData) {
      if (typeof formData[key] === 'object') {
        formDataToSend.append(key, JSON.stringify(formData[key]));
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    // Append uploaded images (the field name must match what the backend expects)
    if (uploadedImages.length > 0) {
      uploadedImages.forEach((file) => {
        formDataToSend.append('images', file);
      });
    }

    try {
      const response = await fetch('http://localhost:3000/api/v1/car/uploadcar', {
        method: 'POST',
        body: formDataToSend,
        credentials:'include'
      });
      const result = await response.json();
      console.log('Server response:', result);
      console.log(result);

      if (result.status === 'success') {
        alert('Car uploaded successfully!');
      } else {
        alert('Error uploading car: ' + (result.message || 'Unknown error'));
      }
    } catch (err) {
      console.error('Error uploading car:', err);
      alert('Error uploading car.');
    }
  };

  return (
    <>
      <Nav />
      <main className={styles['upload-main']}>
        <div className={styles['upload-header']}>
          <h1>Upload Your Car</h1>
          <p>Fill out all the fields to provide complete car details.</p>
        </div>
        <form className={styles['upload-form']} onSubmit={handleSubmit}>
          {/* Section: Basic Information */}
          <div className={styles['form-section']}>
            <h2>Basic Information</h2>
            <div className={styles['form-grid']}>
              <div className={styles['form-group']}>
                <label htmlFor="status">Status</label>
                <input
                  type="text"
                  id="status"
                  value={formData.status}
                  placeholder={sampleData.status}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles['form-group']}>
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  id="brand"
                  value={formData.brand}
                  placeholder={sampleData.brand}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles['form-group']}>
                <label htmlFor="model">Model</label>
                <input
                  type="text"
                  id="model"
                  value={formData.model}
                  placeholder={sampleData.model}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles['form-group']}>
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  value={formData.fullName}
                  placeholder={sampleData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles['form-group']}>
                <label htmlFor="year">Year</label>
                <input
                  type="number"
                  id="year"
                  value={formData.year}
                  placeholder={sampleData.year}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles['form-group']}>
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  value={formData.location}
                  placeholder={sampleData.location}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles['form-group']}>
                <label htmlFor="transmission">Transmission</label>
                <input
                  type="text"
                  id="transmission"
                  value={formData.transmission}
                  placeholder={sampleData.transmission}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles['form-group']}>
                <label htmlFor="mileage">Mileage</label>
                <input
                  type="text"
                  id="mileage"
                  value={formData.mileage}
                  placeholder={sampleData.mileage}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles['form-group']}>
                <label htmlFor="seats">Seats</label>
                <input
                  type="number"
                  id="seats"
                  value={formData.seats}
                  placeholder={sampleData.seats}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles['form-group']}>
                <label htmlFor="drivetrain">Drivetrain</label>
                <input
                  type="text"
                  id="drivetrain"
                  value={formData.drivetrain}
                  placeholder={sampleData.drivetrain}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles['form-group']}>
                <label htmlFor="fuelType">Fuel Type</label>
                <input
                  type="text"
                  id="fuelType"
                  value={formData.fuelType}
                  placeholder={sampleData.fuelType}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles['form-group']}>
                <label htmlFor="price">Price ($)</label>
                <input
                  type="number"
                  id="price"
                  value={formData.price}
                  placeholder={sampleData.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles['form-group']}>
                <label htmlFor="carType">Car Type</label>
                <input
                  type="text"
                  id="carType"
                  value={formData.carType}
                  placeholder={sampleData.carType}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Section: Images & Videos */}
          <div className={styles['form-section']}>
            <h2>Images & Videos</h2>
            <div
              className={styles['image-upload']}
              onClick={() => document.getElementById('imageInput').click()}
            >
              <i className="ri-upload-cloud-line" />
              <p>Click to upload images</p>
              <span>Supports: JPG, PNG (Max 5MB each)</span>
              <input
                type="file"
                id="imageInput"
                multiple
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageUpload}
              />
            </div>
            <div className={styles['image-preview']}>
              {imagePreviews.map((src, index) => (
                <img key={index} src={src} alt={`Preview ${index}`} />
              ))}
            </div>
          </div>

          {/* Section: Tabs */}
          <div className={styles['form-section']}>
            <h2>Tabs</h2>
            {/* Specifications */}
            <div>
              <h3>Specifications</h3>
              {['Performance', 'Fuel Economy', 'Dimensions'].map((category) => (
                <div key={category}>
                  <h4>{category}</h4>
                  {sampleData.tabs.specifications[category].map((item, index) => (
                    <div key={index} className={styles['form-group']}>
                      <label>{item.split(':')[0]}</label>
                      <input
                        type="text"
                        value={formData.tabs.specifications[category][index]}
                        placeholder={item}
                        onChange={(e) =>
                          handleSpecificationChange(category, index, e.target.value)
                        }
                        required
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {/* Features */}
            <div>
              <h3>Features</h3>
              {sampleData.tabs.features.map((feature, index) => (
                <div key={index} className={styles['form-grid']}>
                  <div className={styles['form-group']}>
                    <label>Icon</label>
                    <input
                      type="text"
                      value={formData.tabs.features[index].icon}
                      placeholder={feature.icon}
                      onChange={(e) =>
                        handleFeatureChange(index, 'icon', e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className={styles['form-group']}>
                    <label>Title</label>
                    <input
                      type="text"
                      value={formData.tabs.features[index].title}
                      placeholder={feature.title}
                      onChange={(e) =>
                        handleFeatureChange(index, 'title', e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className={styles['form-group']}>
                    <label>Description</label>
                    <input
                      type="text"
                      value={formData.tabs.features[index].description}
                      placeholder={feature.description}
                      onChange={(e) =>
                        handleFeatureChange(index, 'description', e.target.value)
                      }
                      required
                    />
                  </div>
                </div>
              ))}
            </div>
            {/* Warranty */}
            <div>
              <h3>Warranty</h3>
              <div className={styles['form-group']}>
                <label>Warranty Title</label>
                <input
                  type="text"
                  value={formData.tabs.warranty.title}
                  placeholder={sampleData.tabs.warranty.title}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      tabs: {
                        ...prev.tabs,
                        warranty: { ...prev.tabs.warranty, title: e.target.value }
                      }
                    }))
                  }
                  required
                />
              </div>
              <div>
                <h4>Warranty Details</h4>
                {sampleData.tabs.warranty.details.map((detail, index) => (
                  <div key={index} className={styles['form-group']}>
                    <label>Detail {index + 1}</label>
                    <input
                      type="text"
                      value={formData.tabs.warranty.details[index]}
                      placeholder={detail}
                      onChange={(e) => handleWarrantyDetailChange(index, e.target.value)}
                      required
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section: Key Features */}
          <div className={styles['form-section']}>
            <h2>Key Features</h2>
            {sampleData.key_features.map((feature, index) => (
              <div key={index} className={styles['form-grid']}>
                <div className={styles['form-group']}>
                  <label>Icon</label>
                  <input
                    type="text"
                    value={formData.key_features[index].icon}
                    placeholder={feature.icon}
                    onChange={(e) =>
                      handleKeyFeatureChange(index, 'icon', e.target.value)
                    }
                    required
                  />
                </div>
                <div className={styles['form-group']}>
                  <label>Label</label>
                  <input
                    type="text"
                    value={formData.key_features[index].label}
                    placeholder={feature.label}
                    onChange={(e) =>
                      handleKeyFeatureChange(index, 'label', e.target.value)
                    }
                    required
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Section: Details & Specs */}
          <div className={styles['form-section']}>
            <h2>Details & Specs</h2>
            <div>
              <h3>Details</h3>
              <div className={styles['form-group']}>
                <label>Acceleration</label>
                <input
                  type="text"
                  value={formData.details.acceleration}
                  placeholder={sampleData.details.acceleration}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      details: { ...prev.details, acceleration: e.target.value }
                    }))
                  }
                  required
                />
              </div>
              <div className={styles['form-group']}>
                <label>Top Speed</label>
                <input
                  type="text"
                  value={formData.details.topSpeed}
                  placeholder={sampleData.details.topSpeed}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      details: { ...prev.details, topSpeed: e.target.value }
                    }))
                  }
                  required
                />
              </div>
              <div className={styles['form-group']}>
                <label>Fuel Type</label>
                <input
                  type="text"
                  value={formData.details.fuelType}
                  placeholder={sampleData.details.fuelType}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      details: { ...prev.details, fuelType: e.target.value }
                    }))
                  }
                  required
                />
              </div>
            </div>
            <div>
              <h3>Specs</h3>
              <div className={styles['form-group']}>
                <label>Year</label>
                <input
                  type="number"
                  value={formData.specs.year}
                  placeholder={sampleData.specs.year}
                  onChange={(e) => handleSpecsChange('year', e.target.value)}
                  required
                />
              </div>
              <div className={styles['form-group']}>
                <label>Location</label>
                <input
                  type="text"
                  value={formData.specs.location}
                  placeholder={sampleData.specs.location}
                  onChange={(e) => handleSpecsChange('location', e.target.value)}
                  required
                />
              </div>
              <div className={styles['form-group']}>
                <label>Transmission</label>
                <input
                  type="text"
                  value={formData.specs.transmission}
                  placeholder={sampleData.specs.transmission}
                  onChange={(e) => handleSpecsChange('transmission', e.target.value)}
                  required
                />
              </div>
              <div className={styles['form-group']}>
                <label>Mileage</label>
                <input
                  type="text"
                  value={formData.specs.mileage}
                  placeholder={sampleData.specs.mileage}
                  onChange={(e) => handleSpecsChange('mileage', e.target.value)}
                  required
                />
              </div>
              <div className={styles['form-group']}>
                <label>Seats</label>
                <input
                  type="number"
                  value={formData.specs.seats}
                  placeholder={sampleData.specs.seats}
                  onChange={(e) => handleSpecsChange('seats', e.target.value)}
                  required
                />
              </div>
              <div className={styles['form-group']}>
                <label>Drive Type</label>
                <input
                  type="text"
                  value={formData.specs.driveType}
                  placeholder={sampleData.specs.driveType}
                  onChange={(e) => handleSpecsChange('driveType', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className={styles['form-actions']}>
            <button type="reset" className="btn btn-secondary">Reset</button>
            <button type="submit" className="btn btn-primary">Upload Car</button>
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
}

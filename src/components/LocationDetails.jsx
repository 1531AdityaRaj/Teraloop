import React from 'react';

/**
 * LocationDetails Component
 * Captures Address, City, District, State, and 6-digit Pincode.
 */
function LocationDetails({ formData, errors, onChange }) {
  const indianStates = [
    '',
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
    'Delhi (NCT)',
    'Chandigarh',
    'Other Union Territory',
  ];

  return (
    <div className="form-section-card">
      <div className="section-header">
        <div className="section-number">2</div>
        <div>
          <h2 className="section-title">Location Details</h2>
          <p className="section-subtitle">Campus location and postal address</p>
        </div>
      </div>

      <div className="form-grid">
        {/* Address Field */}
        <div className="form-group full-width">
          <label htmlFor="address" className="form-label">
            Campus Address / Street <span className="required-star">*</span>
          </label>
          <input
            id="address"
            name="address"
            type="text"
            placeholder="e.g. Sector 14, Institutional Area"
            value={formData.address}
            onChange={onChange}
            className={`form-input ${errors.address ? 'input-error' : ''}`}
          />
          {errors.address && <p className="error-message">{errors.address}</p>}
        </div>

        {/* City Field */}
        <div className="form-group">
          <label htmlFor="city" className="form-label">
            City / Town <span className="required-star">*</span>
          </label>
          <input
            id="city"
            name="city"
            type="text"
            placeholder="e.g. Bengaluru"
            value={formData.city}
            onChange={onChange}
            className={`form-input ${errors.city ? 'input-error' : ''}`}
          />
          {errors.city && <p className="error-message">{errors.city}</p>}
        </div>

        {/* District Field */}
        <div className="form-group">
          <label htmlFor="district" className="form-label">
            District <span className="required-star">*</span>
          </label>
          <input
            id="district"
            name="district"
            type="text"
            placeholder="e.g. Bangalore Urban"
            value={formData.district}
            onChange={onChange}
            className={`form-input ${errors.district ? 'input-error' : ''}`}
          />
          {errors.district && <p className="error-message">{errors.district}</p>}
        </div>

        {/* State Field */}
        <div className="form-group">
          <label htmlFor="state" className="form-label">
            State / UT <span className="required-star">*</span>
          </label>
          <select
            id="state"
            name="state"
            value={formData.state}
            onChange={onChange}
            className={`form-input ${errors.state ? 'input-error' : ''}`}
          >
            <option value="">-- Select State --</option>
            {indianStates.filter(Boolean).map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
          {errors.state && <p className="error-message">{errors.state}</p>}
        </div>

        {/* Pincode Field */}
        <div className="form-group">
          <label htmlFor="pincode" className="form-label">
            6-Digit Pincode <span className="required-star">*</span>
          </label>
          <input
            id="pincode"
            name="pincode"
            type="text"
            maxLength={6}
            placeholder="e.g. 560100"
            value={formData.pincode}
            onChange={onChange}
            className={`form-input ${errors.pincode ? 'input-error' : ''}`}
          />
          {errors.pincode && <p className="error-message">{errors.pincode}</p>}
        </div>
      </div>
    </div>
  );
}

export default LocationDetails;

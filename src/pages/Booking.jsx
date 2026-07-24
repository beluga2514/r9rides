import { useState } from "react";

// ----------------------
// Validation Functions
// ----------------------

const validateName = (name) => {
  return /^[A-Za-z ]{3,50}$/.test(name.trim());
};

const validatePhone = (phone) => {
  return /^[6-9]\d{9}$/.test(phone);
};

const validateEmail = (email) => {
  if (!email) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validateAadhaar = (aadhaar) => {
  if (!aadhaar) return true;
  return /^\d{12}$/.test(aadhaar);
};

const validateLicense = (license) => {
  if (!license) return true;
  return license.trim().length >= 10;
};

function Booking() {
      const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    alternatePhone: "",
    email: "",
    aadhaar: "",
    license: "",
    address: "",
    bike: "",
    pickupDate: "",
    pickupTime: "",
    returnDate: "",
    returnTime: "",
    purpose: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Name
    if (!validateName(formData.fullName))
      newErrors.fullName =
        "Enter a valid name (letters only).";

    // Phone
    if (!validatePhone(formData.phone))
      newErrors.phone =
        "Enter a valid 10-digit Indian mobile number.";

    // Alternate Phone
    if (
      formData.alternatePhone &&
      !validatePhone(formData.alternatePhone)
    ) {
      newErrors.alternatePhone =
        "Alternate number is invalid.";
    }

    if (
      formData.phone &&
      formData.alternatePhone &&
      formData.phone === formData.alternatePhone
    ) {
      newErrors.alternatePhone =
        "Alternate phone cannot be the same.";
    }

    // Email
    if (
      formData.email &&
      !validateEmail(formData.email)
    ) {
      newErrors.email =
        "Enter a valid email.";
    }

    // Aadhaar
    if (
      formData.aadhaar &&
      !validateAadhaar(formData.aadhaar)
    ) {
      newErrors.aadhaar =
        "Aadhaar must contain exactly 12 digits.";
    }

    // Licence
    if (
      formData.license &&
      !validateLicense(formData.license)
    ) {
      newErrors.license =
        "Enter a valid Driving Licence number.";
    }

    // Required Fields

    if (!formData.address.trim())
      newErrors.address = "Address is required.";

    if (!formData.bike)
      newErrors.bike = "Please select a bike.";

    if (!formData.pickupDate)
      newErrors.pickupDate =
        "Pickup date is required.";

    if (!formData.pickupTime)
      newErrors.pickupTime =
        "Pickup time is required.";

    if (!formData.returnDate)
      newErrors.returnDate =
        "Return date is required.";

    if (!formData.returnTime)
      newErrors.returnTime =
        "Return time is required.";


    if (!formData.purpose.trim())
      newErrors.purpose =
        "Purpose is required.";

    // Date Validation

    const today = new Date();

    if (formData.pickupDate) {
      const pickup = new Date(formData.pickupDate);

      if (pickup < new Date(today.toDateString())) {
        newErrors.pickupDate =
          "Pickup date cannot be in the past.";
      }
    }

    if (
      formData.pickupDate &&
      formData.returnDate
    ) {
      const pickup = new Date(formData.pickupDate);
      const ret = new Date(formData.returnDate);

      if (ret < pickup) {
        newErrors.returnDate =
          "Return date cannot be before pickup.";
      }

      if (
        formData.pickupDate === formData.returnDate &&
        formData.pickupTime &&
        formData.returnTime &&
        formData.returnTime <= formData.pickupTime
      ) {
        newErrors.returnTime =
          "Return time must be after pickup time.";
      }
    }

    if (!formData.agree)
  newErrors.agree =
    "You must accept the Terms & Conditions.";

console.log(newErrors);

setErrors(newErrors);

return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };
    const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
  alert("Please fix all errors before submitting.");
  return;
}

    const message = `🏍️ *RIDEX BOOKING REQUEST*

━━━━━━━━━━━━━━━━━━

👤 *CUSTOMER DETAILS*

Name: ${formData.fullName}

Phone: ${formData.phone}

Alternate Phone: ${formData.alternatePhone || "N/A"}

Email: ${formData.email || "N/A"}

Aadhaar: ${formData.aadhaar || "N/A"}

Driving Licence: ${formData.license || "N/A"}

Address:
${formData.address}

━━━━━━━━━━━━━━━━━━

🏍️ *RIDE DETAILS*

Bike:
${formData.bike}

Pickup Date:
${formData.pickupDate}

Pickup Time:
${formData.pickupTime}

Return Date:
${formData.returnDate}

Return Time:
${formData.returnTime}

Purpose:
${formData.purpose}

━━━━━━━━━━━━━━━━━━

✅ Terms & Conditions Accepted

Generated from RIDEX Website`;

    const whatsappURL =
      `https://wa.me/918199949996?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank");
  };

  return (<div
  id="booking"
  className="min-h-screen bg-black text-white py-12 px-4"
>
  <div className="max-w-4xl mx-auto bg-gray-900 rounded-2xl shadow-2xl p-8">

    <h1 className="text-4xl font-bold text-center text-red-500 mb-2">
      Customer Registration
    </h1>

    <p className="text-center text-gray-400 mb-8">
      Please fill all required details before starting your ride.
    </p>

    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      {/* ---------------- CUSTOMER DETAILS ---------------- */}

      <div>

        <h2 className="text-2xl font-semibold text-red-400 mb-4">
          👤 Customer Details
        </h2>

        <div className="grid md:grid-cols-2 gap-5">

          {/* Full Name */}

          <div>

            <label className="block mb-2 font-medium">
              Full Name *
            </label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={`w-full p-3 rounded-lg bg-gray-800 border ${
                errors.fullName
                  ? "border-red-500"
                  : "border-gray-700"
              }`}
            />

            {errors.fullName && (
              <p className="text-red-400 text-sm mt-1">
                {errors.fullName}
              </p>
            )}

          </div>

          {/* Phone */}

          <div>

            <label className="block mb-2 font-medium">
              Phone Number *
            </label>

            <input
              type="tel"
              name="phone"
              maxLength={10}
              value={formData.phone}
              onChange={handleChange}
              placeholder="10-digit mobile number"
              className={`w-full p-3 rounded-lg bg-gray-800 border ${
                errors.phone
                  ? "border-red-500"
                  : "border-gray-700"
              }`}
            />

            {errors.phone && (
              <p className="text-red-400 text-sm mt-1">
                {errors.phone}
              </p>
            )}

          </div>

          {/* Alternate Phone */}

          <div>

            <label className="block mb-2 font-medium">
              Alternate Phone
            </label>

            <input
              type="tel"
              name="alternatePhone"
              maxLength={10}
              value={formData.alternatePhone}
              onChange={handleChange}
              placeholder="Optional"
              className={`w-full p-3 rounded-lg bg-gray-800 border ${
                errors.alternatePhone
                  ? "border-red-500"
                  : "border-gray-700"
              }`}
            />

            {errors.alternatePhone && (
              <p className="text-red-400 text-sm mt-1">
                {errors.alternatePhone}
              </p>
            )}

          </div>

          {/* Email */}

          <div>

            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              className={`w-full p-3 rounded-lg bg-gray-800 border ${
                errors.email
                  ? "border-red-500"
                  : "border-gray-700"
              }`}
            />

            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email}
              </p>
            )}

          </div>

          {/* Aadhaar */}

          <div>

            <label className="block mb-2 font-medium">
              Aadhaar Number
            </label>

            <input
              type="text"
              name="aadhaar"
              maxLength={12}
              value={formData.aadhaar}
              onChange={handleChange}
              placeholder="12-digit Aadhaar"
              className={`w-full p-3 rounded-lg bg-gray-800 border ${
                errors.aadhaar
                  ? "border-red-500"
                  : "border-gray-700"
              }`}
            />

            {errors.aadhaar && (
              <p className="text-red-400 text-sm mt-1">
                {errors.aadhaar}
              </p>
            )}

          </div>

          {/* Driving Licence */}

          <div>

            <label className="block mb-2 font-medium">
              Driving Licence
            </label>

            <input
              type="text"
              name="license"
              value={formData.license}
              onChange={handleChange}
              placeholder="AP0120230012345"
              className={`w-full p-3 rounded-lg bg-gray-800 border ${
                errors.license
                  ? "border-red-500"
                  : "border-gray-700"
              }`}
            />

            {errors.license && (
              <p className="text-red-400 text-sm mt-1">
                {errors.license}
              </p>
            )}

          </div>

        </div>

        {/* Address */}

        <div className="mt-5">

          <label className="block mb-2 font-medium">
            Address *
          </label>

          <textarea
            rows="4"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Complete residential address"
            className={`w-full p-3 rounded-lg bg-gray-800 border ${
              errors.address
                ? "border-red-500"
                : "border-gray-700"
            }`}
          />

          {errors.address && (
            <p className="text-red-400 text-sm mt-1">
              {errors.address}
            </p>
          )}

        </div>

      </div>
            {/* ---------------- RIDE DETAILS ---------------- */}

      <div>

        <h2 className="text-2xl font-semibold text-red-400 mb-4">
          🏍️ Ride Details
        </h2>

        <div className="grid md:grid-cols-2 gap-5">

          {/* Bike */}

          <div>

            <label className="block mb-2 font-medium">
              Select Bike *
            </label>

            <select
              name="bike"
              value={formData.bike}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg bg-gray-800 border ${
                errors.bike
                  ? "border-red-500"
                  : "border-gray-700"
              }`}
            >
              <option value="">Choose Bike</option>

              <option>Royal Enfield Classic 350</option>
              <option>Royal Enfield Hunter 350</option>
              <option>Royal Enfield Meteor 350</option>

              <option>Yamaha R15 V4</option>
              <option>Yamaha MT-15</option>

              <option>KTM Duke 200</option>
              <option>KTM RC 200</option>

              <option>Bajaj Pulsar NS200</option>

              <option>TVS Apache RTR 200</option>

              <option>Honda Activa 6G</option>

            </select>

            {errors.bike && (
              <p className="text-red-400 text-sm mt-1">
                {errors.bike}
              </p>
            )}

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Pickup Location *
            </label>

            <input
              type="text"
              name="pickupLocation"
              value={formData.pickupLocation}
              onChange={handleChange}
              placeholder="Pickup Location"
              className={`w-full p-3 rounded-lg bg-gray-800 border ${
                errors.pickupLocation
                  ? "border-red-500"
                  : "border-gray-700"
              }`}
            />

            {errors.pickupLocation && (
              <p className="text-red-400 text-sm mt-1">
                {errors.pickupLocation}
              </p>
            )}

          </div>

          {/* Pickup Date */}

          <div>

            <label className="block mb-2 font-medium">
              Pickup Date *
            </label>

            <input
              type="date"
              name="pickupDate"
              value={formData.pickupDate}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg bg-gray-800 border ${
                errors.pickupDate
                  ? "border-red-500"
                  : "border-gray-700"
              }`}
            />

            {errors.pickupDate && (
              <p className="text-red-400 text-sm mt-1">
                {errors.pickupDate}
              </p>
            )}

          </div>

          {/* Pickup Time */}

          <div>

            <label className="block mb-2 font-medium">
              Pickup Time *
            </label>

            <input
              type="time"
              name="pickupTime"
              value={formData.pickupTime}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg bg-gray-800 border ${
                errors.pickupTime
                  ? "border-red-500"
                  : "border-gray-700"
              }`}
            />

            {errors.pickupTime && (
              <p className="text-red-400 text-sm mt-1">
                {errors.pickupTime}
              </p>
            )}

          </div>

          {/* Return Date */}

          <div>

            <label className="block mb-2 font-medium">
              Return Date *
            </label>

            <input
              type="date"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg bg-gray-800 border ${
                errors.returnDate
                  ? "border-red-500"
                  : "border-gray-700"
              }`}
            />

            {errors.returnDate && (
              <p className="text-red-400 text-sm mt-1">
                {errors.returnDate}
              </p>
            )}

          </div>

          {/* Return Time */}

          <div>

            <label className="block mb-2 font-medium">
              Return Time *
            </label>

            <input
              type="time"
              name="returnTime"
              value={formData.returnTime}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg bg-gray-800 border ${
                errors.returnTime
                  ? "border-red-500"
                  : "border-gray-700"
              }`}
            />

            {errors.returnTime && (
              <p className="text-red-400 text-sm mt-1">
                {errors.returnTime}
              </p>
            )}

          </div>

          <div className="md:col-span-2">

            <label className="block mb-2 font-medium">
              Destination *
            </label>

            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="Example: Kakinada Ramesampeta Rajamundry Limits Only"
              className={`w-full p-3 rounded-lg bg-gray-800 border ${
                errors.destination
                  ? "border-red-500"
                  : "border-gray-700"
              }`}
            />

            {errors.destination && (
              <p className="text-red-400 text-sm mt-1">
                {errors.destination}
              </p>
            )}

          </div>

          {/* Purpose */}

          <div className="md:col-span-2">

            <label className="block mb-2 font-medium">
              Vehicle Rental Purpose *
            </label>

            <textarea
              rows="4"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              placeholder="Example: Personal / Tourism / Business / Outstation"
              className={`w-full p-3 rounded-lg bg-gray-800 border ${
                errors.purpose
                  ? "border-red-500"
                  : "border-gray-700"
              }`}
            />

            {errors.purpose && (
              <p className="text-red-400 text-sm mt-1">
                {errors.purpose}
              </p>
            )}

          </div>

        </div>

      </div>       {/* ---------------- TERMS & CONDITIONS ---------------- */}

      <div className="mt-8">

        <h2 className="text-2xl font-semibold text-red-400 mb-4">
          📜 Terms & Conditions
        </h2>

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 text-gray-300 leading-8">

          <ol className="list-decimal list-inside space-y-2">

            <li>Maximum speed limit is <strong>60 KM/H</strong>.</li>

            <li>
              Extra kilometres will be charged at
              <strong> ₹4 per KM</strong>.
            </li>

            <li>
              Extra time will be charged at
              <strong> ₹30 per 30 minutes</strong>.
            </li>

            <li>
              Petrol expenses are <strong>NOT included</strong>.
            </li>

            <li>
              Customer is responsible for any
              <strong> new damages</strong>.
            </li>

            <li>
              Customer must maintain proper tyre air pressure.
            </li>

            <li>
              Customer must pay all
              <strong> traffic challans/fines</strong>
              received during the rental period.
            </li>

            <li>
              Original Driving Licence must be carried while riding.
            </li>

            <li>
              Bike should be returned on or before the agreed return time.
            </li>

            <li>
              RIDEX reserves the right to cancel bookings if submitted information is incorrect.
            </li>

          </ol>

        </div>

      </div>

      {/* Agreement */}

      <div className="mt-6">

        <label className="flex items-start gap-3 cursor-pointer">

          <input
            type="checkbox"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
            className="mt-1 h-5 w-5"
          />

          <span>
            I have read and agree to all the
            <strong> Terms & Conditions</strong>.
          </span>

        </label>

        {errors.agree && (
          <p className="text-red-400 mt-2">
            {errors.agree}
          </p>
        )}

      </div>

      {/* Submit */}

      <button
        type="submit"
        className="w-full mt-8 bg-green-600 hover:bg-green-700 transition-all duration-300 py-4 rounded-xl text-xl font-bold"
      >
        🚀 START RIDE
      </button>

    </form>

  </div>

</div>
  );
}

export default Booking;

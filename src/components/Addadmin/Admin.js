import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./Admin.css";
import Sidebar from "../Sidebar";
import { BASE_URL } from "../../Helper/Helper";
const Admin = () => {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [displayImage, setDisplayImage] = useState(false);
  const [adminId, setAdminId] = useState(null);
  const initialValues = {
    fathername: "",
    mothername: "",
    department: "",
    desigination: "",
    bloodgroup: "",
    gender: "",
    martialstatus: "",
    dateofbirth: "",
    phonenumber: "",
    alternateno: "",
    email: "",
    password: "",
    confirmpassword: "",
    CurrentAddress: "",
    permenantaddress: "",
    joiningDate: "",
    worklocation: "",
    imagePath: "",

    Aadharno: "",
    panno: "",
    passport: "",
    // licensenumber: "",

    accountNumber: "",
    AccountHolder: "",
    ifsccode: "",
    bankname: "",
    Branch: "",
    uan: "",

    ssc: "",
    inter: "",
    Btech: "",
    ug: "",
    pg: "",
    experience: "",
    Previouspackage: "",
    previouspayslip: "",
    previousrole: "",
    role: "admin",
    // permanentaddress: '',
  };

  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required("Full Name is required"),
    fathername: Yup.string().required("Father Name is required"),
    mothername: Yup.string().required("Mother Name is required"),
    department: Yup.string().required("Department is required"),
    designation: Yup.string().required("Designation is required"),
    bloodGroup: Yup.string().required("Blood Group is required"),
    gender: Yup.string().required("Gender is required"),
    martialstatus: Yup.string().required("Marital Status is required"),
    dateofbirth: Yup.date().required("Date of Birth is required"),
    phonenumber: Yup.string().required("Phone Number is required"),
    alternateno: Yup.string(),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    CurrentAddress: Yup.string().required("Current Address is required"),
    permanentaddress: Yup.string().required("Permanent Address is required"),
    joiningDate: Yup.date().required("Joining Date is required"),
    workLocation: Yup.string().required("Work Location is required"),
    Aadharno: Yup.string()
    .matches(/^\d{12}$/, 'Aadhar number must be exactly 12 digits')
    .required('Aadhar number is required'),
    panno: Yup.string()
    .matches(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/, 'PAN number should be alphanumeric and exactly 10 characters long')
    .required('PAN number is required'),
    passport: Yup.string().required("Passport Number is required"),
    // licensenumber: Yup.string().required("Driving License Number is required"),
    accountNumber: Yup.string().required("Account Number is required"),
    AccountHolder: Yup.string().required("Account Holder Name is required"),
    ifsccode: Yup.string().required("IFSC Code is required"),
    bankname: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, 'Bank name should contain only letters')
    .required('Bank name is required'),
    Branch: Yup.string().required("Branch is required"),
    uan: Yup.string().required("UAN Number is required"),
    ssc: Yup.array().min(1, "At least one file is required for SSC").required("SSC is required"),
    inter: Yup.array().min(1, "At least one file is required for Intermediate").required("Intermediate is required"),
    Btech: Yup.array().min(1, "At least one file is required for B.Tech").required("B.Tech is required"),
    ug: Yup.array().min(1, "At least one file is required for UG").required("UG is required"),
    pg: Yup.array().min(1, "At least one file is required for PG").required("PG is required"),
    previouspayslip: Yup.array().min(1, "At least one file is required for Previous Payslip").required("Previous Payslip is required"),
    experience: Yup.string().required("Experience is required"),
    Previouspackage: Yup.string().required("Previous CTC is required"),
    previousrole: Yup.string().required("Previous Role is required"),
  });
  

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setSubmitting(true);
      console.log(values);

      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      const response = await axios.post(
        `${BASE_URL}/admin_data/add`,
        formData
      );

      console.log("Response:", response); // Log the entire response

      if (response.status === 200) {
        alert("Form submitted successfully");
        setTimeout(() => {
          resetForm();
          setSelectedImage(null);
          setDisplayImage(false);
          setAdminId(response.data.adminid);
          fetchLatestAdminId();
        });
      } else {
        alert("Error submitting form");
      }
    } catch (error) {
      console.error("Form Submission Error:", error);
      alert("Error submitting form");
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    setSelectedImage(image);
    setDisplayImage(true);
  };

  const initialValue = "";
  const [latestAdminId, setLatestAdminId] = useState(initialValue);

  // Fetch the latest Admin ID from the backend
  const fetchLatestAdminId = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/admin_data/latest_id`
      );
      const latestId = response.data.latestId;

      // Extract the numeric part and increment
      const numericPart = parseInt(latestId.match(/\d+/), 10);
      const nextNumericPart = isNaN(numericPart) ? 1 : numericPart + 1;

      // Format the new Admin ID
      const formattedNextId = `ADM${nextNumericPart
        .toString()
        .padStart(4, "0")}`;
      setLatestAdminId(formattedNextId);
    } catch (error) {
      console.error("Error fetching latest admin ID:", error);
    }
  };

  useEffect(() => {
    fetchLatestAdminId();
  }, []);

  return (
    <div className="Total">
      <Sidebar />
      <div className="home01">
        <br />
        <br />

        <div className="outsideborderr9999">
          <div className="employee-form-container000">
            <div className="linechange2">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="width657">
                    {step === 1 && (
                      <>
                        <h2 className="form-title01">
                          <u>Basic Details</u>
                        </h2>

                        <div className="image-container2345">
                          <div className="flex124">
                            <div className="small-image1239">
                              {displayImage && (
                                <img
                                  src={
                                    selectedImage
                                      ? URL.createObjectURL(selectedImage)
                                      : "img1_placeholder.jpg"
                                  }
                                  className="IMG1230"
                                  alt="Select"
                                  onClick={() =>
                                    document
                                      .querySelector("#imageInput")
                                      .click()
                                  }
                                  style={{
                                    cursor: "pointer",
                                    marginBottom: "10px",
                                  }}
                                />
                              )}
                            </div>
                            <label className="button222" htmlFor="imageInput">
                              Select Image
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              style={{ display: "none" }}
                              id="imageInput"
                            />
                          </div>
                        </div>
                        <div className="employee-group98">
                          <div className="emp011">
                            <label
                              className="employee-label98"
                              htmlFor="employeeid"
                            >
                              Admin ID{" "}
                            </label>
                            <div className="readonly-field">
                              {latestAdminId}
                            </div>
                          </div>
                        </div>

                        <div className="employee-group98">
                          <label
                            className="employee-label98"
                            htmlFor="fullName"
                          >
                            Full Name
                          </label>
                          <Field
                            className="employee-fields98"
                            type="employee-fields"
                            id="fullname"
                            name="fullname"
                            placeholder="Enter Full Name"
                          />
                          <ErrorMessage
                            name="fullname"
                            component="div"
                            className="error-message98"
                          />
                        </div>

                        <div className="employee-group98">
                          <label
                            className="employee-label98"
                            htmlFor="fatherName"
                          >
                            Father Name
                          </label>
                          <Field
                            className="employee-fields98"
                            type="employee-fields"
                            id="fathername"
                            name="fathername"
                            placeholder="Enter Father Name"
                            required
                          />
                          <ErrorMessage
                            name="fathername"
                            component="div"
                            className="error-message98"
                          />
                        </div>

                        <div className="employee-group98">
                          <label
                            className="employee-label98"
                            htmlFor="motherName"
                          >
                            Mother Name
                          </label>
                          <Field
                            className="employee-fields98"
                            type="text"
                            id="mothername"
                            name="mothername"
                            placeholder="Enter Mother Name"
                          />
                          <ErrorMessage
                            name="mothername"
                            component="div"
                            className="error-message98"
                          />
                        </div>

                        <div className="employee-group98">
                          <label
                            className="employee-label98"
                            htmlFor="department"
                          >
                            Department
                          </label>
                          <Field
                            className="employee-fields98"
                            as="select"
                            id="department"
                            name="department"
                          >
                            <option value="">Select Department</option>
                            <option value="HR">HR</option>
                            <option value="ACCOUNTS">ACCOUNTS</option>
                            <option value="FINANCE">FINANCE</option>
                            <option value="IT-HARDWARE">IT-HARDWARE</option>
                          </Field>
                          <ErrorMessage
                            name="department"
                            component="div"
                            className="error-message98"
                          />
                        </div>

                        <div className="employee-group98">
                          <label
                            className="employee-label98"
                            htmlFor="designation"
                          >
                            Designation
                          </label>
                          <Field
                            className="employee-fields98"
                            as="select"
                            id="designation"
                            name="designation"
                          >
                            <option value="">Select Designation</option>
                            <option value="Manager">Manager</option>
                            <option value="Accounts Manager">
                              Accounts Manager
                            </option>
                            <option value="Finance Executive">
                              Finance Executive
                            </option>
                          </Field>
                          <ErrorMessage
                            name="designation"
                            component="div"
                            className="error-message98"
                          />
                        </div>

                        <div className="employee-group98">
                          <label
                            className="employee-label98"
                            htmlFor="joiningDate"
                          >
                            Joining Date
                          </label>
                          <Field
                            className="employee-fields98"
                            type="date"
                            id="joiningDate"
                            name="joiningDate"
                          />
                          <ErrorMessage
                            name="joiningDate"
                            component="div"
                            className="error-message98"
                          />
                        </div>

                        <div className="employee-group98">
                          <label className="employee-label9828">Gender</label>

                          <label className="employee-labels98">
                            <Field
                              type="radio"
                              name="gender"
                              value="Male"
                              className="field-with-margin1"
                            />
                            Male
                          </label>
                          <label className="employee-labels98">
                            <Field
                              type="radio"
                              name="gender"
                              value="Female"
                              className="field-with-margin1"
                            />
                            Female
                          </label>
                          <ErrorMessage
                            name="gender"
                            component="div"
                            className="error-message98"
                          />
                        </div>

                        <div className="employee-group98">
                          <label className="employee-label98">
                            Date of Birth
                          </label>
                          <Field
                            className="employee-fields98"
                            type="date"
                            id="dateOfbirth"
                            name="dateofbirth"
                          />
                        </div>

                        <ErrorMessage
                          name="dateofbirth"
                          component="div"
                          className="error-message98"
                        />
                        <div className="employee-group98">
                          <label
                            className="employee-label98"
                            htmlFor="bloodGroup"
                          >
                            Blood Group
                          </label>
                          <Field
                            as="select"
                            className="employee-fields98"
                            id="bloodGroup"
                            name="bloodGroup"
                          >
                            <option value="">Select</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                          </Field>
                          <ErrorMessage
                            name="bloodGroup"
                            component="div"
                            className="error-message98"
                          />
                        </div>

                        <div className="employee-group98">
                          <label className="employee-label9828">
                            Martial Status
                          </label>

                          <label className="employee-labels98">
                            <Field
                              type="radio"
                              name="martialstatus"
                              value="Single"
                              className="field-with-margin98"
                            />
                            Single
                          </label>
                          <label className="employee-labels980">
                            <Field
                              type="radio"
                              name="martialstatus"
                              value="married"
                              className="field-with-margin98"
                            />
                            Married
                          </label>
                          <ErrorMessage
                            name="martialstatus"
                            component="div"
                            className="error-message98"
                          />
                        </div>

                        <div className="employee-group98">
                          <label
                            className="employee-label98"
                            htmlFor="phonenumber"
                          >
                            Phone No
                          </label>
                          <Field
                            className="employee-fields98"
                            type="employee-fields"
                            id="phonenumber"
                            name="phonenumber"
                            placeholder="Enter Mobile Number"
                          />
                          <ErrorMessage
                            name="phonenumber"
                            component="div"
                            className="error-message98"
                          />
                        </div>
                        <div className="employee-group98">
                          <label
                            className="employee-label98"
                            htmlFor="alternateNumber"
                          >
                            Alternate No
                          </label>
                          <Field
                            className="employee-fields98"
                            type="tel"
                            id="alternateno"
                            name="alternateno"
                            placeholder="Enter Alternate Number"
                          />
                          <ErrorMessage
                            name="alternateno"
                            component="div"
                            className="error-message98"
                          />
                        </div>

                        <div className="employee-group98">
                          <label className="employee-label98" htmlFor="email">
                            Email
                          </label>
                          <Field
                            className="employee-fields98"
                            type="employee-email"
                            id="email"
                            name="email"
                            placeholder="Enter E-mail Id"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="error-message98"
                          />
                        </div>

                        <div className="employee-group98">
                          <label
                            className="employee-label98"
                            htmlFor="password"
                          >
                            Password
                          </label>
                          <Field
                            className="employee-fields98"
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                          />
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="error-message98"
                          />
                        </div>
                          <div className="employee-group98">
                          <label
                            className="employee-label98"
                            htmlFor="confirmPassword"
                          >
                            Confirm Password
                          </label>
                          <Field
                            className="employee-fields98"
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                          />
                          <ErrorMessage
                            name="confirmPassword"
                            component="div"
                            className="error-message98"
                          />
                        </div>
                        <div className="employee-group98">
                          <label
                            className="employee-label98"
                            htmlFor="CurrentAddress"
                          >
                            Current Address
                          </label>
                          <Field
                            className="employee-fields98"
                            id="CurrentAddress"
                            type="employee-fields"
                            name="CurrentAddress"
                            placeholder="Enter Current Address"
                          />
                          <ErrorMessage
                            name="CurrentAddress"
                            component="div"
                            className="error-message98"
                          />
                        </div>

                        <div className="employee-group98">
                          <label
                            className="employee-label98"
                            htmlFor="permanentAddress"
                          >
                            Permanent Address
                          </label>
                          {/* <textarea className="employee-fields98" type="employee-fields" id="permanentaddress" name="permanentaddress" /> */}
                          <Field
                            className="employee-fields98"
                            id="permanentaddress"
                            type="employee-fields"
                            name="permanentaddress"
                            placeholder="Enter Permanent Address"
                          />

                          <ErrorMessage
                            name="permanentaddress"
                            component="div"
                            className="error-message98"
                          />
                        </div>
                        <div className="employee-group98">
                          <label
                            className="employee-label98"
                            htmlFor="workLocation"
                          >
                            Work Location
                          </label>
                          <Field
                            className="employee-fields98"
                            as="select"
                            id="workLocation"
                            name="workLocation"
                          >
                            <option value="">Select Work Location</option>
                            <option value="BANGALORE">Bangalore</option>
                            <option value="CHENNAI">Chennai</option>
                            <option value="HYDERABAD">Hyderabad</option>
                          </Field>
                          <ErrorMessage
                            name="workLocation"
                            component="div"
                            className="error-message98"
                          />
                        </div>

                        {/* <div className="employee-group988">
                      <button className="employee-button98" type="submit" disabled={isSubmitting} data-aos="fade-up">
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                      </button>
                    </div> */}
                        <div className="employee-group988">
                          <button
                            className="employee-button98"
                            type="button"
                            onClick={handleNext}
                            data-aos="fade-up"
                          >
                            Next
                          </button>
                        </div>
                      </>
                    )}
                    {step === 2 && (
                      <>
                        <div className="outsideborderr9999">
                          <div>
                            <h2>
                              {" "}
                              <u>IDENTITY DETAILS</u>{" "}
                            </h2>{" "}
                            <br />
                          </div>
                        </div>
                        <div className="employee-group98">
                          <label
                            className="employee-label98"
                            htmlFor="Aadharno"
                          >
                            Aadhar No
                          </label>
                          <Field
                            className="employee-fields98"
                            type="number"
                            id="Aadharno"
                            name="Aadharno"
                            placeholder="Enter Aadhar Number"
                            maxLength={12}
                          />
                          <ErrorMessage
                            name="Aadharno"
                            component="div"
                            className="error-message98"
                          />
                        </div>

                        <div className="employee-group98">
                          <label className="employee-label98" htmlFor="pan no">
                            PAN No
                          </label>
                          <Field
                            className="employee-fields98"
                            type="text"
                            id="panno"
                            name="panno"
                            placeholder="Enter Pancard Number"
                          />
                          <ErrorMessage
                            name="panno"
                            component="div"
                            className="error-message98"
                          />
                        </div>

                        <div className="employee-group98">
                          <label
                            className="employee-label98"
                            htmlFor="passport"
                          >
                           Passport
                          </label>
                          <Field
                            className="employee-fields98"
                            type="text"
                            id="passport"
                            name="passport"
                            placeholder="Enter Passport Number"
                          />
                          <ErrorMessage
                            name="passport"
                            component="div"
                            className="error-message98"
                          />
                        </div>

                        {/* <div className="employee-group98">
                          <label
                            className="employee-label98"
                            htmlFor="license number"
                          >
                            Driving License
                          </label>
                          <Field
                            className="employee-fields98"
                            type="text"
                            id="licensenumber"
                            name="licensenumber"
                            placeholder="Enter Driving License Number"
                          />
                          <ErrorMessage
                            name="licensenumber"
                            component="div"
                            className="error-message98"
                          />
                        </div> */}

                        <button
                          className="employee-button98"
                          type="button"
                          onClick={handleBack}
                          data-aos="fade-up"
                        >
                          Back
                        </button>
                        <button
                          className="employee-button98"
                          type="button"
                          onClick={handleNext}
                          data-aos="fade-up"
                        >
                          Next
                        </button>
                      </>
                    )}
                    {step === 3 && (
                      <>
                        <div className="outsideborderr9999">
                          <div>
                            <h2>
                              {" "}
                              <u>PROFESSIONAL DETAILS</u>{" "}
                            </h2>{" "}
                            <br />
                          </div>
                        </div>
                        <div className="employee-group98">
                          <label
                            className="employee-label98"
                            htmlFor="Account name"
                          >
                            A/C HolderName
                          </label>
                          <Field
                            className="employee-fields98"
                            type="employee-fields"
                            id="AccountHolder"
                            name="AccountHolder"
                            placeholder="Enter Account Holdername"
                          />
                          <ErrorMessage
                            name="Account name"
                            component="div"
                            className="error-message98"
                          />
                        </div>
                        <div className="employee-group98">
                          <label
                            className="employee-label98"
                            htmlFor="accountNumber"
                          >
                            Account Number
                          </label>
                          <Field
                            className="employee-fields98"
                            type="number" // Change type to "text" to allow custom pattern validation
                            id="accountNumber"
                            name="accountNumber"
                            placeholder="Enter Account Number"
                            pattern="[0-9]*" // This pattern allows only numeric input
                          />
                          <ErrorMessage
                            name="accountNumber"
                            component="div"
                            className="error-message98"
                          />
                        </div>

                        <div className="employee-group98">
                          <label
                            className="employee-label98"
                            htmlFor="ifsccode"
                          >
                            IFSC Code
                          </label>
                          <Field
                            className="employee-fields98"
                            type="text"
                            id="ifsccode "
                            name="ifsccode"
                            placeholder="Enter IFSC code"
                          />
                          <ErrorMessage
                            name="ifsccode "
                            component="div"
                            className="error-message98"
                          />
                        </div>

                        <div className="employee-group98">
                          <label
                            className="employee-label98"
                            htmlFor="bankname"
                          >
                            Bank Name
                          </label>
                          <Field
                            className="employee-fields98"
                            type="text"
                            id="bankname"
                            name="bankname"
                            placeholder="Enter  Bank Name"
                          />
                          <ErrorMessage
                            name="bankname"
                            component="div"
                            className="error-message98"
                          />
                        </div>

                        <div className="employee-group98">
                          <label className="employee-label98" htmlFor="Branch">
                            Branch
                          </label>
                          <Field
                            className="employee-fields98"
                            type="text"
                            id="Branch"
                            name="Branch"
                            placeholder="Enter Branch Name"
                          />
                          <ErrorMessage
                            name="Branch"
                            component="div"
                            className="error-message98"
                          />
                        </div>

                        <div className="employee-group98">
                          <label className="employee-label98" htmlFor="uan">
                            UAN
                          </label>
                          <Field
                            className="employee-fields98"
                            type="number"
                            id="uan"
                            name="uan"
                            placeholder="Enter UAN Number"
                          />
                          <ErrorMessage
                            name="uan"
                            component="div"
                            className="error-message98"
                          />
                        </div>

                        <button
                          className="employee-button98"
                          type="button"
                          onClick={handleBack}
                          data-aos="fade-up"
                        >
                          Back
                        </button>
                        <button
                          className="employee-button98"
                          type="button"
                          onClick={handleNext}
                          data-aos="fade-up"
                        >
                          Next
                        </button>
                      </>
                    )}

                    {step === 4 && (
                      <>
                        <div className="outsideborderr9999">
                          <div>
                            <h2>
                              {" "}
                              <u>DOCUMENTATION</u>{" "}
                            </h2>{" "}
                            <br />
                          </div>
                        </div>
                        <div className="employee-group98">
                          <label className="employee-label98" htmlFor="ssc">
                            SSC
                          </label>
                          <Field
                            className="employee-fields98"
                            type="file"
                            id="ssc"
                            name="ssc"
                            multiple // Allow multiple files to be selected
                          />
                          <ErrorMessage
                            name="ssc"
                            component="div"
                            className="error-message98"
                          />
                        </div>

                        <div className="employee-group98">
                          <label className="employee-label98" htmlFor="inter">
                            Intermediate
                          </label>
                          <Field
                            className="employee-fields98"
                            type="file"
                            id="inter"
                            name="inter"
                            multiple // Allow multiple files to be selected
                          />
                          <ErrorMessage
                            name="inter"
                            component="div"
                            className="error-message98"
                          />
                        </div>

                        <div className="employee-group98">
                          <label className="employee-label98" htmlFor="ug">
                            UG
                          </label>
                          <Field
                            className="employee-fields98"
                            type="file"
                            id="ug"
                            name="ug"
                            multiple // Allow multiple files to be selected
                          />
                          <ErrorMessage
                            name="ug"
                            component="div"
                            className="error-message98"
                          />
                        </div>

                        <div className="employee-group98">
                          <label className="employee-label98" htmlFor="Btech">
                            B.Tech
                          </label>
                          <Field
                            className="employee-fields98"
                            type="file"
                            id="Btech"
                            name="Btech"
                            multiple // Allow multiple files to be selected
                          />
                          <ErrorMessage
                            name="Btech"
                            component="div"
                            className="error-message98"
                          />
                        </div>
                        <div className="employee-group98">
                          <label className="employee-label98" htmlFor="pg">
                            PG
                          </label>
                          <Field
                            className="employee-fields98"
                            type="file"
                            id="pg"
                            name="pg"
                            multiple // Allow multiple files to be selected
                          />
                          <ErrorMessage
                            name="pg"
                            component="div"
                            className="error-message98"
                          />
                        </div>

                        <div className="employee-group98">
                          <label
                            className="employee-label98"
                            htmlFor="previous-payslip"
                          >
                            Previous Payslip
                          </label>
                          <Field
                            className="employee-fields98"
                            type="file"
                            id="previouspayslip"
                            name="previouspayslip"
                            multiple // Allow multiple files to be selected
                          />
                          <ErrorMessage
                            name="previouspayslip"
                            component="div"
                            className="error-message98"
                          />
                        </div>

                        <div className="employee-group98">
                          <label
                            className="employee-label98"
                            htmlFor="experience"
                          >
                            Experience
                          </label>
                          <Field
                            className="employee-fields98"
                            as="select"
                            id="experience"
                            name="experience"
                          >
                            <option value="">Select Experience</option>
                            <option value="0-1">0-1 year</option>
                            <option value="1-3 years">1-3 years</option>
                            <option value="4-6 years">4-6 years</option>
                            <option value="7+ years">7+ years</option>
                          </Field>
                          <ErrorMessage
                            name="experience"
                            component="div"
                            className="error-message98"
                          />
                        </div>

                        <div className="employee-group98">
                          <label
                            className="employee-label98"
                            htmlFor="Previouspackage"
                          >
                            Previous-CTC
                          </label>
                          <Field
                            className="employee-fields98"
                            type="text"
                            id="Previouspackage"
                            name="Previouspackage"
                            placeholder="Enter Previous CTC"
                          />
                          <ErrorMessage
                            name=" Previouspackage"
                            component="div"
                            className="error-message98"
                          />
                        </div>

                        <div className="employee-group98">
                          <label
                            className="employee-label98"
                            htmlFor="previousRole"
                          >
                            Previous-Role
                          </label>
                          <Field
                            className="employee-fields98"
                            type="text"
                            id="previousrole"
                            name="previousrole"
                            placeholder="Enter previous Role"
                          />
                          <ErrorMessage
                            name="previousrole"
                            component="div"
                            className="error-message98"
                          />
                        </div>

                        <button
                          className="employee-button98"
                          type="button"
                          onClick={handleBack}
                          data-aos="fade-up"
                        >
                          Back
                        </button>

                        {/* Fields for step 2 */}
                        {/* ... (Step 2 fields) */}
                        <div className="employee-group988">
                          <button
                            className="employee-button98"
                            type="submit"
                            disabled={isSubmitting}
                            data-aos="fade-up"
                          >
                            {isSubmitting ? "Submitting..." : "Submit"}
                          </button>
                        </div>
                      </>
                    )}
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
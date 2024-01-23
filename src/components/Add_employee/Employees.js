import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./Employees.css";
import Sidebar from "../Sidebar";
import { color } from "framer-motion";
import { BASE_URL } from "../../Helper/Helper";

const Employees = () => {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };


  const [formData, setFormData] = useState({
    experience: '',
    fresherDescription: '',
    experiencedDropdown: '',
    previousrole: ''
  });



  const [selectedImage, setSelectedImage] = useState(null);
  const [displayImage, setDisplayImage] = useState(false);
  const [employeeId, setEmployeeId] = useState(null);
  const initialValues = {
    employeeid: '',
    fullname: '',
    fathername: '',
    mothername: '',
    department: '',
    desigination: '',
    bloodgroup: '',
    gender: '',
    martialstatus: '',
    dateofbirth: '',
    contactno: '',
    alternateno: '',
    email: '',
    password: '',
    confirmpassword: '',
    localaddress: '',
    permenantaddress: '',
    joiningdate: '',
    worklocation: '',

    aadharno: '',
    panno: '',
    passport: '',
    drivinglicense: '',

    accountno: '',
    accountname: '',
    ifsccode: '',
    bankname: '',
    branch: '',
    uan: '',


    tenth: '',
    inter: '',
    btech: '',
    experience: '',
    previouspayslip: '',
    previousrole: '',
  };

  const validationSchema = Yup.object().shape({
    //   fullname: Yup.string().required('Full Name is required'),
    //   // lastname: Yup.string().required('Last Name is required'),
    //   fathername: Yup.string().required("Father's Name is required"),
    //   mothername: Yup.string().required("Mother's Name is required"),
    //   desigination: Yup.string().required('Desigination is required'),
    //   department: Yup.string().required('Department is required'),
    //   gender: Yup.string().required('Gender is required'),
    //   bloodgroup: Yup.string().required('Blood Group is required'),
    //   martialstatus: Yup.string().required('Marital Status is required'),
    //   dateofbirth: Yup.date().required('Date of Birth is required').nullable(),
    //   contactno: Yup.string().required('Contact Number is required'),
    //   alternateno: Yup.string(),
    //   email: Yup.string().email('Invalid email address').required('Email is required'),
    //   password: Yup.string().required('Password is required'),
    //   confirmpassword: Yup.string()
    //     .oneOf([Yup.ref('password'), null], 'Passwords must match')
    //     .required('Confirm Password is required'),
    //     localaddress: Yup.string().required('Local Address is required'),
    //     permenantaddress: Yup.string().required('Permanent Address is required'),
    //   joiningdate: Yup.date().required('Joining Date is required').nullable(),
    //   worklocation: Yup.string().required('Work Location is required'),
    //   aadhar: Yup.string().required('Aadhar Number is required'),
    //   pan: Yup.string().required('PAN Number is required'),
    //   passport: Yup.string().required('Passport Number is required'),
    //   drivinglicense: Yup.string().required('License Number is required'),
    //  accountname: Yup.string().required('Account Holder Name is required'),
    //  accountno: Yup.string().required('Account Number is required'),
    //   ifsccode: Yup.string().required('IFSC Code is required'),
    //   bankname: Yup.string().required('Bank Name is required'),
    //   branch: Yup.string().required('Branch is required'),
    //   uan: Yup.string().required('UAN is required'),
    //   tenth: Yup.string().required('SSC details are required'),
    //   inter: Yup.string().required('Intermediate details are required'),
    //   btech: Yup.string().required('Btech details are required'),
    //   previouspayslip: Yup.string(),
    //   experience: Yup.string().required('Experience details are required'),
    //   previouspayslip: Yup.string().required('Previous Payslips are required'),
    //   previousrole: Yup.string().required('Previous Role details are required'),
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
        `${BASE_URL}/employee_data/add`,
        formData
      );

      console.log("Response:", response); // Log the entire response

      if (response.status === 201) {
        alert("Form submitted successfully");
        setTimeout(() => {
          resetForm();
          setSelectedImage(null);
          setDisplayImage(false);
          setEmployeeId(response.data.employeeid);
          fetchLatestEmployeeId();
          setStep(1);
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
    try {
      const image = e.target.files[0];
      if (image) {
        console.log("Selected Image:", image);
        setSelectedImage(image);
        setDisplayImage(true);
      }
    } catch (error) {
      console.error("Image Change Error:", error);
    }
  };

  const initialValue = "";
  const [latestEmployeeId, setLatestEmployeeId] = useState(initialValue);



  const handleEdit = (currentId) => {
    // Logic to change the employee ID - for example, prompting the user for a new ID
    const newEmployeeId = prompt('Enter new Employee ID:', currentId);

    // Update the latestEmployeeId if a new ID is entered
    if (newEmployeeId !== null && newEmployeeId !== '') {
      setLatestEmployeeId(newEmployeeId);
    }
  };

  // Fetch the latest employee ID from the backend
  const fetchLatestEmployeeId = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/employee_data/latest_id`
      );
      const latestId = response.data.latestId;

      // Extract the numeric part and increment
      const numericPart = parseInt(latestId.match(/\d+/), 10);
      const nextNumericPart = isNaN(numericPart) ? 1 : numericPart + 1;

      // Format the new employee ID
      const formattedNextId = `MTSD${nextNumericPart
        .toString()
        .padStart(4, "0")}`;
      setLatestEmployeeId(formattedNextId);
    } catch (error) {
      console.error("Error fetching latest employee ID:", error);
    }
  };

  useEffect(() => {
    fetchLatestEmployeeId();
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

                {({ values, isSubmitting }) => (
                  <Form className="width657">
                    {step === 1 && (
                      <>
                        <h2 className="form-title01">
                          {" "}
                          <u>BASIC DETAILS</u>{" "}
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
                              Employee ID{" "}
                            </label>
                            <div className="readonly-field">
                              {latestEmployeeId}
                              <br />
                              {/* <button
                        className="edit-button"
                        onClick={() => handleEdit(latestEmployeeId)}
                      >
                        Edit
                      </button> */}

                            </div>
                          </div>
                        </div>

                        <div className="employee-group98">
                          <label
                            className="employee-label98"
                            htmlFor="fullname"
                          >
                            Full Name
                          </label>
                          <Field
                            className="employee-fields98"
                            type="employee-fields"
                            id="fullname"
                            name="fullname"
                            placeholder="Enter your Fullname"
                          />
                        </div>
                        <ErrorMessage
                          name="fullname"
                          component="div"
                          className="error-message98"
                        />

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
                            placeholder="Enter your Fathername"
                          />

                        </div> <ErrorMessage
                          name="fathername"
                          component="div"
                          className="error-message98"
                        />

                        <div className="employee-group98">
                          <label
                            className="employee-label98"
                            htmlFor="motherName"
                          >
                            Mother Name
                          </label>
                          <Field
                            className="employee-fields98"
                            type="employee-fields"
                            id="mothername"
                            name="mothername"
                            placeholder="Enter your Mothername"
                          />
                        </div>
                        <ErrorMessage
                          name="mothername"
                          component="div"
                          className="error-message98"
                        />


                        <div className="employee-group98">
                          <label
                            className="employee-label98"
                            htmlFor="department"
                          >
                            Department
                          </label>
                          <Field
                            as="select"
                            className="employee-fields98"
                            id="department"
                            name="department"
                          >
                            <option value="">Select</option>
                            <option value="Full Stack Development">Full Stack Development</option>
                            <option value="HR">HR</option>
                            <option value="Digital Marketing">Digital Marketing</option>
                            <option value="App Development/Flutter">App Development/Flutter</option>
                            <option value="Data Scientist">Data Scientist</option>
                          </Field>
                        </div>
                        <ErrorMessage
                          name="department"
                          component="div"
                          className="error-message98"
                        />

                        <div className="employee-group98">
                          <label
                            className="employee-label98"
                            htmlFor="desigination"
                          >
                            Desigination
                          </label>
                          <Field
                            as="select"
                            className="employee-fields98"
                            id="desigination"
                            name="desigination"
                          >
                            <option value="">Select</option>
                            <option value="Front End Developer">Front End Developer</option>
                            <option value="Back End Developer">Back End Developer</option>
                            <option value="Team Lead">Team Lead</option>
                            <option value="Manager">Manager</option>
                            <option value="HR Executive">HR Executive</option>
                            <option value="HR Manage">HR Manage</option>
                            <option value="Digital Marketing Specialist">Digital Marketing Specialistt</option>
                            <option value="SEO Analyst">SEO Analyst</option>
                            <option value="Content Strategist">Content Strategist</option>
                            <option value="Flutter Developer">Flutter Developer</option>
                            <option value="Mobile App Developer">Mobile App Developer</option>
                            <option value="UI/UX Designer">UI/UX Designer</option>
                            <option value="Data Scientist">Data Scientist</option>
                            <option value="Machine Learning Engineer">Machine Learning Engineer</option>
                            <option value="Data Analyst">Data Analyst</option>
                          </Field>
                        </div>
                        <ErrorMessage
                          name="desigination"
                          component="div"
                          className="error-message98"
                        />

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
                        </div>
                        <ErrorMessage
                          name="gender"
                          component="div"
                          className="error-message98"
                        />

                        <div className="employee-group98">
                          <label
                            className="employee-label98"
                            htmlFor="bloodgroup"
                          >
                            Blood Group
                          </label>
                          <Field
                            as="select"
                            className="employee-fields98"
                            id="bloodgroup"
                            name="bloodgroup"
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
                        </div>
                        <ErrorMessage
                          name="bloodgroup"
                          component="div"
                          className="error-message98"
                        />

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
                        </div>
                        <ErrorMessage
                          name="martialstatus"
                          component="div"
                          className="error-message98"
                        />

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
                            htmlFor="contactno"
                          >
                            Contact No
                          </label>
                          <Field
                            className="employee-fields98"
                            type="number"
                            id="contactno"
                            name="contactno"
                            placeholder="Enter your Contact Number"
                          />
                        </div>
                        <ErrorMessage
                          name="contactno"
                          component="div"
                          className="error-message98"
                        />

                        <div className="employee-group98">
                          <label
                            className="employee-label98"
                            htmlFor="alternateno"
                          >
                            Alternate No
                          </label>
                          <Field
                            className="employee-fields98"
                            type="number"
                            id="alternateno"
                            name="alternateno"
                            placeholder="Enter your Alternate Number"
                          />
                        </div>
                        <ErrorMessage
                          name="alternateno"
                          component="div"
                          className="error-message98"
                        />

                        <div className="employee-group98">
                          <label className="employee-label98" htmlFor="email">
                            Email
                          </label>
                          <Field
                            className="employee-fields98"
                            type="employee-email"
                            id="email"
                            name="email"
                            placeholder="Enter your Email"
                          />
                        </div>
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="error-message98"
                        />

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
                            placeholder="Enter your Password"
                          />
                        </div>
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="error-message98"
                        />

                        <div className="employee-group98">
                          <label
                            className="employee-label98"
                            htmlFor="confirmpassword"
                          >
                            Confirm Password
                          </label>
                          <Field
                            className="employee-fields98"
                            type="confirmpassword"
                            id="confirmpassword"
                            name="confirmpassword"
                            placeholder="Enter your Confirm Password"
                          />
                        </div>
                        <ErrorMessage
                          name="confirmpassword"
                          component="div"
                          className="error-message98"
                        />

                        <div className="employee-group98">
                          <label
                            className="employee-label98"
                            htmlFor="localaddress"
                          >
                            Local Address
                          </label>
                          <Field
                            className="employee-fields98"
                            id="localaddress"
                            type="localaddress"
                            name="localaddress"
                            placeholder="Enter your Local Address"
                          />
                        </div>
                        <ErrorMessage
                          name="localaddress"
                          component="div"
                          className="error-message98"
                        />

                        <div className="employee-group98">
                          <label
                            className="employee-label98"
                            htmlFor="permenantaddress"
                          >
                            Permenant Address
                          </label>
                          {/* <textarea className="employee-fields98" type="employee-fields" id="permanentaddress" name="permanentaddress" /> */}
                          <Field
                            className="employee-fields98"
                            id="permenantaddress"
                            type="employee-fields"
                            name="permenantaddress"
                            placeholder="Enter your Permanent Address"
                          />
                        </div>
                        <ErrorMessage
                          name="permenantaddress"
                          component="div"
                          className="error-message98"
                        />

                        <div className="employee-group98">
                          <label className="employee-label98">
                            Joining Date
                          </label>
                          <Field
                            className="employee-fields98"
                            type="date"
                            id="joiningdate"
                            name="joiningdate"
                            placeholder="Enter your Joining Date"
                          />
                        </div>
                        <ErrorMessage
                          name="joiningdate"
                          component="div"
                          className="error-message98"
                        />
                        <div className="employee-group98">
                          <label
                            className="employee-label98"
                            htmlFor="worklocation"
                          >
                            Work Location
                          </label>
                          <Field
                            as="select"
                            className="employee-fields98"
                            id="worklocation"
                            name="worklocation"
                          >
                            <option value="">Select</option>
                            <option value="Bangalore">Bangalore</option>
                            <option value="Chennai">Chennai</option>
                            <option value="Hyderabad">Hyderabad</option>
                          </Field>
                        </div>

                        <ErrorMessage
                          name="worklocation"
                          component="div"
                          className="error-message98"
                        />

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
                            htmlFor="aadhar"
                          >
                            Aadhar No
                          </label>
                          <Field
                            className="employee-fields98"
                            type="aadhar"
                            id="aadhar"
                            name="aadhar"
                            placeholder="Enter your Aadhar Number"
                          />
                        </div>
                        <ErrorMessage
                          name="aadhar"
                          component="div"
                          className="error-message98"
                        />

                        <div className="employee-group98">
                          <label className="employee-label98" htmlFor="pan">
                            PAN No
                          </label>
                          <Field
                            className="employee-fields98"
                            type="text"
                            id="pan"
                            name="pan"
                            placeholder="Enter your PAN Number"
                          />
                        </div>
                        <ErrorMessage
                          name="pan"
                          component="div"
                          className="error-message98"
                        />

                        <div className="employee-group98">
                          <label className="employee-label98" htmlFor="passport">
                            Passport
                          </label>
                          <Field
                            className="employee-fields98"
                            type="text"
                            id="passport"
                            name="passport"
                            placeholder="Enter your Passport"
                          />
                        </div>
                        <ErrorMessage
                          name="passport"
                          component="div"
                          className="error-message98"
                        />


                        <div className="employee-group98">
                          <label
                            className="employee-label98"
                            htmlFor="drivinglicense"
                          >
                            Driving License
                          </label>
                          <Field
                            className="employee-fields98"
                            type="text"
                            id="drivinglicense"
                            name="drivinglicense"
                            placeholder="Enter your Driving License"
                          />
                        </div>
                        <ErrorMessage
                          name="drivinglicense"
                          component="div"
                          className="error-message98"
                        />

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
                            htmlFor="accountname"
                          >
                            Account Name
                          </label>
                          <Field
                            className="employee-fields98"
                            type="employee-fields"
                            id="accountname"
                            name="accountname"
                            placeholder="Enter your Account Name"
                          />
                        </div>
                        <ErrorMessage
                          name="accountname"
                          component="div"
                          className="error-message98"
                        />
                        <div className="employee-group98">
                          <label
                            className="employee-label98"
                            htmlFor="accountno"
                          >
                            Account Number
                          </label>
                          <Field
                            className="employee-fields98"
                            type="number" // Change type to "text" to allow custom pattern validation
                            id="accountno"
                            name="accountno"
                            pattern="[0-9]*" // This pattern allows only numeric input
                            placeholder="Enter your Account Number"
                          />
                        </div>
                        <ErrorMessage
                          name="accountno"
                          component="div"
                          className="error-message98"
                        />

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
                            id="ifsccode"
                            name="ifsccode"
                            placeholder="Enter your IFSC Code"
                          />
                        </div>
                        <ErrorMessage
                          name="ifsccode"
                          component="div"
                          className="error-message98"
                        />

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
                            placeholder="Enter your Bank Name"
                          />
                        </div>
                        <ErrorMessage
                          name="bankname"
                          component="div"
                          className="error-message98"
                        />

                        <div className="employee-group98">
                          <label className="employee-label98" htmlFor="branch">
                            Branch
                          </label>
                          <Field
                            className="employee-fields98"
                            type="text"
                            id="branch"
                            name="branch"
                            placeholder="Enter your Branch Name"
                          />
                        </div>
                        <ErrorMessage
                          name="branch"
                          component="div"
                          className="error-message98"
                        />

                        <div className="employee-group98">
                          <label
                            className="employee-label98"
                            htmlFor="uan"
                          >
                            UAN
                          </label>
                          <Field
                            className="employee-fields98"
                            type="number"
                            id="uan"
                            name="uan"
                            placeholder="Enter your UAN Number"
                          />
                        </div>
                        <ErrorMessage
                          name="uan"
                          component="div"
                          className="error-message98"
                        />

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
                          <label className="employee-label98" htmlFor="tenth">
                            SSC
                          </label>
                          <Field
                            className="employee-fields98"
                            type="file"
                            id="tenth"
                            name="tenth"
                            multiple // Allow multiple files to be selected
                          />
                        </div>
                        <ErrorMessage
                          name="tenth"
                          component="div"
                          className="error-message98"
                        />

                        <div className="employee-group98">
                          <label className="employee-label98" htmlFor="inter">
                            Inter
                          </label>
                          <Field
                            className="employee-fields98"
                            type="file"
                            id="inter"
                            name="inter"
                            multiple // Allow multiple files to be selected
                          />
                        </div>
                        <ErrorMessage
                          name="inter"
                          component="div"
                          className="error-message98"
                        />

                        <div className="employee-group98">
                          <label className="employee-label98" htmlFor="btech">
                            Btech:
                          </label>
                          <Field
                            className="employee-fields98"
                            type="file"
                            id="btech"
                            name="btech"
                            multiple // Allow multiple files to be selected
                          />
                        </div>
                        <ErrorMessage
                          name="btech"
                          component="div"
                          className="error-message98"
                        />

                        <div className="employee-group98">
                          <label
                            className="employee-label98"
                            htmlFor="previouspayslip"
                          >
                            Previous Pay-Slip
                          </label>
                          <Field
                            className="employee-fields98"
                            type="file"
                            id="previouspayslip"
                            name="previouspayslip"
                            multiple // Allow multiple files to be selected
                          />
                        </div>
                        <ErrorMessage
                          name="previouspayslip"
                          component="div"
                          className="error-message98"
                        />

                        <div className="employee-group98">
                          <label className="employee-label98">Experience:</label>
                          <div className="radio-buttons">
                            <label>
                              <Field
                                type="radio"
                                name="experience"
                                value="fresher"
                                className="employee-radio"
                              />
                              Fresher
                            </label>
                            <label>
                              <Field
                                type="radio"
                                name="experience"
                                value="experienced"
                                className="employee-radio"
                              />
                              Experienced
                            </label>  &nbsp; &nbsp;
                          </div>
                          {values.experience === "fresher" && (
                            <div>
                              <label htmlFor="fresherDescription" > Skills</label> <br />

                              <Field
                                as="textarea"
                                name="fresherDescription"
                                className="employee-textarea"
                                id="fresherDescription"
                                placeholder="Enter description..."
                              />
                            </div>
                          )}
                          {values.experience === "experienced" && (
                            <div>
                              <Field
                                as="select"
                                name="experiencedDropdown"
                                className="employee-dropdown"
                                id="experiencedDropdown"
                              >
                                {/* Options for experienced dropdown */}
                                <option value="">Years of Experience</option>
                                <option value="Below 1 Year">Below 1 Year</option>
                                <option value=" 1 Year">1-2 Years</option>
                                <option value=" 2 Year">2-3 Years</option>
                                <option value=" 3 Year">3-4 Years</option>
                                <option value=" 4 Year">4-5 Years</option>
                                <option value=" 5 Year">5+ Years</option>
                              </Field>
                              <div className="employee-group98">
                                <label className="employee-label98" htmlFor="previousrole">
                                  Previous-Role
                                </label>
                                <Field
                                  className="employee-fields98"
                                  type="text"
                                  id="previousrole"
                                  name="previousrole"
                                  placeholder="Enter your Previous-Role"
                                />
                                <ErrorMessage
                                  name="previousrole"
                                  component="div"
                                  className="error-message98"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                        <ErrorMessage
                          name="experience"
                          component="div"
                          className="error-message98"
                        />


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

export default Employees;
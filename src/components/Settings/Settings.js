import React from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './Settings.css'
import Sidebar from '../Sidebar';

const Settings = () => {

  const initialValues = {
    // Initial values for the form fields
    // Add your initial values here
    companyName: '',
    phone: '',
    email: '',
    url: '',
    fax: '',
    companyAddress: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  };

  const validationSchema = Yup.object().shape({
    companyName: Yup.string().required('Company Name is required'),
   
  });

 const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setSubmitting(true);
      console.log('values ',values);
      await axios.post('http://localhost:3003/company_details/add', values);
      alert('Form submitted successfully');
      resetForm();
    } catch (error) {
      console.error(error);
      alert('Error submitting form');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    
     <div className='main-divkarthik'> 
     <Sidebar/>
      <div className='homekarthik'>
      <div className="outsideborderr-div123456">
        <div className="employee-form-container-div123456">
        <header className="App-header-div123456">
          <h1>Company Configuration</h1>
        </header>
        <hr></hr>
        <div className="border-div123456">
          <div className="settings-container-div123456">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className='form-container291123'>
                    <div className='field-container-div12345'>
                      <label className="employee-label1-div123456"  htmlFor="companyName">Company Name :</label>
                      <Field className="employee-fields-name-div123456" type="text" id="companyName" name="companyName" placeholder="Company Name" size="10" />
                    </div>
                    <div className='field-container-div12345'>
                      <label className="employee-label1-div123456"  htmlFor="phone">Phone :</label>
                      <Field className="employee-fields-phone-div123456" type="text" id="phone" name="phone" placeholder="98743637" size="50" />
                    </div>
                  <div className='field-container-div12345'>
                    <label className="employee-label1-div123456"  htmlFor="email">Email :</label>
                    <Field className="employee-fields-email-div123456" type="text" id="email" name="email" placeholder="Email" size="50" />
                  </div>
                  <div className='field-container-div12345'>
                    <label className="employee-label1-div123456" htmlFor="url">Website URL        :</label>
                    <Field className="employee-fields-website-div123456" type="text" id="url" name="url" placeholder="https://matricaltechnologies.in" size="50" />
                  </div>
                  <div className='field-container-div12345'>
                    <label className="employee-label1-div123456" htmlFor="companyAddress">Company Address:</label>
                    
                    <Field className="employee-fields-company-div123456" type="text" id="companyAddress" name="companyAddress" placeholder="Bangalore" size="50" />
                  </div>
                  <div className='field-container-div12345'>
                    <label className="employee-label1-div123456" htmlFor="city">City :</label>
                    <Field className="employee-fields-city-div123456" type="text" id="city" name="city" placeholder="bangalore" size="50" />
                  </div>
                  <div className='field-container-div12345'>
                    <label className="employee-label1-div123456" htmlFor="state">State :</label>
                    <Field className="employee-fields-state-div123456" type="text" id="state" name="state" placeholder="bangalore" size="50" />
                  </div>
                  <div className='field-container-div12345'>
                    <label className="employee-label1-div123456"  htmlFor="postalCode">Pin Code :</label>
                    <Field className="employee-fields-pin-div123456" type="text" id="postalCode" name="postalCode" placeholder="560079" size="50" />
                  </div>
                  <div className='field-container-div12345'>
                    <label className="employee-label1-div123456"  htmlFor="country">Country :</label>
                    <Field className="employee-fields-country-div123456" type="text" id="country" name="country" placeholder="India" size="50" />
                  </div>
                  {/* <hr className='hr-tag-div123456'></hr> */}
                  <div className="save-div123456">
                    <button className="employee-button-div123456" type="submit" disabled={isSubmitting} data-aos="fade-up">
                      {isSubmitting ? 'Submitting...' : 'Save'}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
);
};

export default Settings;
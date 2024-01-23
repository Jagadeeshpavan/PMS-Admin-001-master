import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './AddHoliday.css'; // Assuming you have a CSS file for styling
import Sidebar from '../Sidebar';
import { BASE_URL } from '../../Helper/Helper';

const AddHoliday = () => {
  const initialValues = {
    date: '',
    description: '',
  };

  const validationSchema = Yup.object().shape({
    date: Yup.string().required('Date is required'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setSubmitting(true);
      await axios.post(`${BASE_URL}/holiday_data/add`, values);
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
    <div>
      <Sidebar />
      <div className="homesan">
        <div className="outsideborderrsan">
          <div className="employee-form-containersan">
            <h2 className="form-titlesan">Add Holiday</h2>
            <hr />
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="employee-groupsan">
                    <label className="employee-labelsan" htmlFor="date">
                      Date
                    </label>
                    <Field
                      className="employee-fieldssan"
                      type="date"
                      id="date"
                      name="date"
                    />
                    <ErrorMessage
                      name="date"
                      component="div"
                      className="error-messagesan"
                    />
                  </div>

                  <div className="employee-groupsan">
                    <label
                      className="employee-labelsan"
                      htmlFor="description"
                    >
                      Description
                    </label>
                    <Field
                      as="textarea"
                      className="employee-fieldssan"
                      id="description"
                      name="description"
                      style={{
                        padding: '10px',
                        border: '1px solid rgb(204, 204, 204)',
                        width: '100%',
                        boxSizing: 'border-box',
                        height: '100px',
                      }}
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="error-messagesan"
                    />
                  </div>

                  <div className="employee-groupsan45">
                    <button
                      className="employee-buttonsan"
                      type="submit"
                      disabled={isSubmitting}
                      data-aos="fade-up"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddHoliday;

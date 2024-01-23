// Department.js

import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./Department.css";
import Sidebar from "../../Sidebar";
import { BASE_URL } from "../../../Helper/Helper";

const Department = () => {
  const initialValues = {
    departmentname: "",
    designation: [],
    newDepartmentName: "",
    newDesignations: "",
    existingDepartments: "",
  };

  const getValidationSchema = () => {
    return Yup.object().shape({
      departmentname: Yup.string().required("Department name is required"),
      designation: Yup.array().when("departmentname", {
        is: "addNew",
        then: Yup.array()
          .min(1, "Select at least one designation")
          .required("Designation is required"),
      }),
      newDepartmentName: Yup.string().when("departmentname", {
        is: "addNew",
        then: Yup.string().required("New department name is required"),
      }),
      newDesignations: Yup.string().when("departmentname", {
        is: "addNew",
        then: Yup.string().required("New designations are required"),
      }),
    });
  };
  
  const [isAddingDepartment, setAddingDepartment] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [selectedDesignations, setSelectedDesignations] = useState([]);
  const [designationOptions, setDesignationOptions] = useState({});
  const fetchDepartments = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/department_data`);
      const existingDepartments = response.data;
  
      const newDepartments = existingDepartments.filter(
        (dep) => !departments.includes(dep)
      );
  
      const uniqueDepartmentsSet = new Set([...departments, ...newDepartments]);
      const uniqueDepartmentsArray = Array.from(uniqueDepartmentsSet);
  
      setDepartments(uniqueDepartmentsArray);
  
      const fetchDepartmentDetails = async (department) => {
        if (!designationOptions[department] && newDepartments.includes(department)) {
          const response = await axios.get(
           `${BASE_URL}/department_data/${department}`
          );
          const departmentData = response.data;
          setDesignationOptions((prevOptions) => ({
            ...prevOptions,
            [departmentData.departmentname]: departmentData.designation,
          }));
        }
      };
  
      await Promise.all(uniqueDepartmentsArray.map(fetchDepartmentDetails));
    } catch (error) {
      console.error("Error fetching department data:", error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleAddDepartmentClick = () => {
    setAddingDepartment(true);
  };

  const handleAddDepartmentSubmit = async (values) => {
    try {
      console.log("Submitting new department and designations:", values);
      await axios.post(`${BASE_URL}/department_dataasd/add`, {
        departmentname: values.newDepartmentName,
        designation: values.newDesignations.split(",").map((d) => d.trim()),
      });
      alert("New department and designations added successfully");
      await fetchDepartments(); // Fetch updated department list
      // Reset form values after successful submission
      setAddingDepartment(false);
    } catch (error) {
      console.error(error);
      alert("Error adding a new department and designations");
    }
  };

  const handleExistingDepartmentSubmit = async (values) => {
    try {
      const existingDepartment = values.departmentname;
      let existingDesignations = [];
  
      if (existingDepartment !== "addNew" && values.designation) {
        existingDesignations = values.designation;
      }
  
      console.log("Submitting existing department and designations:", existingDepartment, existingDesignations);
  
      await axios.post(`${BASE_URL}/department_dataasd/add`, {
        departmentname: existingDepartment,
        designation: existingDesignations,
      });
  
      alert("Existing department and designations submitted successfully");
    } catch (error) {
      console.error(error);
      alert("Error submitting existing department and designations");
    } finally {
      // Reset any state if needed
    }
  };

  const handleDepartmentChange = (selectedValue, setFieldValue, values) => {
    setFieldValue("departmentname", selectedValue);
    setFieldValue("designation", []);
    setSelectedDesignations([]);
  
    if (selectedValue === "addNew") {
      setAddingDepartment(true);
      setDesignationOptions({
        ...designationOptions,
        newDepartment: ["Designation1", "Designation2"],
      });
    } else {
      setAddingDepartment(false);
  
      const departmentDesignations =
        selectedValue === "HR"
          ? ["HR Executive", "HR Manager"]
          : designationOptions[selectedValue] ||
            getDefaultDesignations(selectedValue);
  
      setSelectedDesignations(departmentDesignations);
    }
  };

  const getDefaultDesignations = (department) => {
    switch (department) {
      case "Full Stack Development":
        return ["Front End Developer", "Back End Developer", "Team Lead", "Manager"];
      case "HR":
        return ["HR Executive", "HR Manager"];
      case "Digital Marketing":
        return ["Digital Marketing Specialist", "SEO Analyst", "Content Strategist"];
      case "App Development/Flutter":
        return ["Flutter Developer", "Mobile App Developer", "UI/UX Designer"];
      case "Data Science":
        return ["Data Scientist", "Machine Learning Engineer", "Data Analyst"];
      default:
        return [];
    }
  };

  const departmentOptions = [
    ...departments.map((department) => ({
      label: department,
      value: department,
    })),
    { label: "HR", value: "HR" },
    { label: "Full Stack Development", value: "Full Stack Development" },
    { label: "Digital Marketing", value: "Digital Marketing" },
    { label: "App Development/Flutter", value: "App Development/Flutter" },
    { label: "Data Science", value: "Data Science" },
  ];

  return (
    <div className="home1s">
      <Sidebar />
      <div className="outsideborderr1s">
        <div className="employee-form-container1s">
          <h2 className="form-title1s">Add Department</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={getValidationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              console.log("Form submitted", values);

              try {
                if (values.departmentname === "addNew") {
                  await handleAddDepartmentSubmit(values);
                } else {
                  await handleExistingDepartmentSubmit(values);
                }
              } catch (error) {
                console.error(error);
                alert("An error occurred.");
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <Form className="sandeep1s">
                <button
                  className="employee-button1s"
                  onClick={handleAddDepartmentClick}
                  type="button"
                >
                  Add New Department
                </button>

                {!isAddingDepartment && (
                  <div className="employee-group1s">
                    <label className="employee-label1s" htmlFor="departmentname">
                      Department Name:
                    </label>
                    <div className="department-dropdown-container">
                      <Field
                        as="select"
                        id="departmentname"
                        name="departmentname"
                        className="employee-fields1s"
                        onChange={(e) => {
                          const selectedValue = e.target.value;
                          handleDepartmentChange(
                            selectedValue,
                            setFieldValue,
                            values
                          );
                        }}
                      >
                        <option value="" label="Select a department" />
                        {departmentOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Field>
                    </div>
                    <ErrorMessage
                      name="departmentname"
                      component="div"
                      className="error-message1s"
                    />
                  </div>
                )}

                {isAddingDepartment && (
                  <>
                    <div className="employee-group1s">
                      <label
                        className="employee-label1s"
                        htmlFor="newDepartmentName"
                      >
                        New Department Name:
                      </label>
                      <Field
                        type="text"
                        id="newDepartmentName"
                        name="newDepartmentName"
                        className="employee-fields1s"
                      />
                      <ErrorMessage
                        name="newDepartmentName"
                        component="div"
                        className="error-message1s"
                      />
                    </div>

                    <div className="employee-group1s">
                      <label
                        className="employee-label1s"
                        htmlFor="newDesignations"
                      >
                        New Designations (comma-separated):
                      </label>
                      <Field
                        type="text"
                        id="newDesignations"
                        name="newDesignations"
                        className="employee-fields1s"
                      />
                      <ErrorMessage
                        name="newDesignations"
                        component="div"
                        className="error-message1s"
                      />
                    </div>
                  </>
                )}

                {selectedDesignations.length > 0 && (
                  <div className="employee-group1s">
                    <label className="employee-label1s" htmlFor="designation">
                      Designations:
                    </label>
                    {selectedDesignations.map((designation) => (
                      <div key={designation} className="checkbox-group">
                        <Field
                          type="checkbox"
                          id={`designation_${designation}`}
                          name="designation"
                          value={designation}
                          className="employee-checkbox"
                          checked={values.designation.includes(designation)}
                          onChange={() => {
                            const updatedDesignations =
                              values.designation.includes(designation)
                                ? values.designation.filter(
                                    (d) => d !== designation
                                  )
                                : [...values.designation, designation];

                            setFieldValue("designation", updatedDesignations);
                          }}
                        />
                        <label htmlFor={`designation_${designation}`}>
                          {designation}
                        </label>
                      </div>
                    ))}
                    <ErrorMessage
                      name="designation"
                      component="div"
                      className="error-message1s"
                    />
                  </div>
                )}
                <div className="employee-btngroup">
                  {isAddingDepartment && (
                    <button
                      className="employee-button1s"
                      type="button"
                      onClick={() =>
                        handleAddDepartmentSubmit(values, isSubmitting)
                      }
                      disabled={isSubmitting}
                      data-aos="fade-up"
                    >
                      Save
                    </button>
                  )}
                  {!isAddingDepartment && (
                    <button
                      className="employee-button1s"
                      type="submit"
                      disabled={isSubmitting}
                      data-aos="fade-up"
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Department;
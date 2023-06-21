import React, { Component, useContext } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import DepartmentData from "../../departmentData.json"
import { DataContext } from '../context/ContextData';
import { saveAs } from "file-saver";
import './createdata.css';


class CreateDataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      age: '',
      phone: '',
      department: '',
      departmentsData: DepartmentData.Departments,
      errors: {},
    };
  }

  componentDidMount() {
    if (this.props.params.id) {
      const Editdata = this.props.context.data.find(el => el.id == this.props.params.id)
      const { name, email, age, phone, department } = Editdata;
      this.setState({
        name: name,
        email: email,
        age: age,
        phone: phone,
        department: department,
      })
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  exportFile(data) {
    const newdata = JSON.stringify({data})
    var blob = new Blob([newdata], { type: "application/json;charset=utf-8" });
    saveAs(blob, "testfile1.txt");
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, age, phone, department } = this.state;

    const formErrors = this.validateForm();
    if (Object.keys(formErrors).length === 0) {
      const updatedData = this.props.context.data.map((item) => {
        if (item.id == this.props.params.id) {
          return {
            ...item,
            name: name,
            email: email,
            age: age,
            phone: phone,
            department: department
          };
        }
        return item;
      });

      if (!this.props.params.id) {
        const newDataRow = {
          id: Math.floor(Math.random() * 10),
          name: name,
          email: email,
          age: age,
          phone: phone,
          department: department
        };
        updatedData.push(newDataRow);
      }
      this.props.context.setData(updatedData);

      // code for text file
      this.exportFile(updatedData)
      // code for text file
        this.props.navigate('/list');
        this.setState({ errors: {} }); // Reset errors state
      } else {
        this.setState({ errors: formErrors });
      }
  };

    validateForm = () => {
      const { name, email, age, phone, department } = this.state;
      const formErrors = {};

      if (!name.trim()) {
        formErrors.name = 'Name is required';
      }

      if (!email.trim()) {
        formErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        formErrors.email = 'Email is invalid';
      }

      if (!age.toString().trim()) {
        formErrors.age = 'Age is required';
      } else if (isNaN(age) || parseInt(age) <= 0) {
        formErrors.age = 'Age must be a positive number';
      }

      if (!phone.toString().trim()) {
        formErrors.phone = 'Phone is required';
      } else if (!/^\d+$/.test(phone)) {
        formErrors.phone = 'Phone must contain only numbers';
      }

      if (!department.trim()) {
        formErrors.department = 'Department is required';
      }
      return formErrors;
    };

    render() {
      const { name, email, age, phone, department, departmentsData, errors } = this.state;
      return (
        <div className='form-main-div'>
          <form onSubmit={this.handleSubmit} className='form-sumbit'>
            <div className='singleField'>
              <label>Name:</label>
              <input
                className='forminput'
                type="text"
                name="name"
                value={name}
                onChange={this.handleChange}
              />
              {errors.name && <span className='validation-err'>{errors.name}</span>}
            </div>
            <div className='singleField'>
              <label>Email:</label>
              <input
                type="email"
                className='forminput'
                name="email"
                value={email}
                onChange={this.handleChange}
              />
              {errors.email && <span className='validation-err'>{errors.email}</span>}
            </div>
            <div className='singleField'>
              <label>Age:</label>
              <select
                name="age"
                className='forminput'
                value={age}
                onChange={this.handleChange}
              >
                <option value="">Select Age</option>
                {
                  Array.from({ length: 101 }, (_, index) => (
                    <option key={index} value={index}>{index}</option>
                  ))
                }
              </select>

              {errors.age && <span className='validation-err'>{errors.age}</span>}
            </div>
            <div className='singleField'>
              <label>Phone:</label>
              <input
                type="text"
                className='forminput'
                name="phone"
                value={phone}
                onChange={this.handleChange}
              />
              {errors.phone && <span className='validation-err'>{errors.phone}</span>}
            </div>
            <div className='singleField'>
              <label>Department:</label>
              <select
                name="department"
                className='forminput'
                value={department}
                onChange={this.handleChange}
              >
                <option value="">Select Department</option>
                {departmentsData.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </select>
              {errors.department && <span className='validation-err'>{errors.department}</span>}
            </div>
            <div className='singleField'>
              <button className='forminput' type="submit">Submit</button>
            </div>
          </form>
        </div>
      );
    }
  }

  const CreateData = () => {
    const params = useParams()
    const navigate = useNavigate()
    const context = useContext(DataContext)
    return <CreateDataTable params={params} context={context} navigate={navigate} />
  }

export default CreateData;

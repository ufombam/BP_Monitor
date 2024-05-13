import React, { useEffect, useState } from 'react';
import { FormData, CountryType } from './components/interfaces/interface';
import { Dayjs } from 'dayjs';
import Form1 from './components/form1/Form1';
import Form2 from './components/form2/Form2';
import './App.css';



const StartupForm: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [formNotComplete, setFormNotComplete] = useState<boolean>(true);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [alert, setAlert] = useState<boolean>(false);
  const [response, setResponse] = useState<string>('');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    website: '',
    location: {
      code: '',
      label: ''
    },
    industry: '',
    technology: [],
    foundedDate: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    checkFormData();
  };

  const handleClick = (): void =>  {
    setLoading(true);
}

  const handleLocation = (countryData: CountryType | null): void => {
    checkFormData();
    setFormData({...formData, location: countryData});
  };

  const handleTech = (event: React.ChangeEvent<{}>, newValue: string[]): void => {
    setFormData({...formData, technology: newValue});
    checkFormData();
  };

  const handleDate = (newValue: Dayjs): void => {
    setFormData({...formData, foundedDate: newValue});
    checkFormData();
  };

  const handleAlertResponse = (res: string,  state: boolean): void => {
    setAlert(true);
    setResponse(res)
  }

  useEffect(() => {
    checkFormData();
    // eslint-disable-next-line
  }, [formData]);

  const checkFormData = (): void => {
    if (formData.foundedDate &&
        formData.industry &&
        formData.location &&
        formData.name &&
        formData.technology[0] &&
        formData.website) {
          setFormNotComplete(false)
        } else {
          setFormNotComplete(true)
        }
  };

  const handleNext = () => {
    setPage(2);
  };

  const handleBack = () => {
    setPage(1);
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    // Submit the form data
    fetch('https://vidare_test_endpoint.com/api/postEndpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setTimeout(() => { //simulating success on submission
        setFormData({
          name: '',
          website: '',
          location: {
            code: '',
            label: '',
          },
          industry: '',
          technology: [],
          foundedDate: null,
        })
        setLoading(false);
        console.log('Response:', data);
        handleAlertResponse('notOkay',  true); //send 'notOkay' to demonstrate success - default ('ok')
      }, 4000);
      setTimeout(() => {
        setPage(1);
      },10000)
    })
    .catch(error => {
      setTimeout(() => { //simulating error on submission
        setFormData({
          name: '',
          website: '',
          location: {
            code: '',
            label: '',
          },
          industry: '',
          technology: [],
          foundedDate: null,
        })
        setLoading(false);
        console.error('There was a problem with the POST request - Invalid endpoint');
        handleAlertResponse('ok',  true); //send 'notOkay' to demonstrate success - default ('notOkay')
      }, 4000)
      setTimeout(() => {
        setPage(1);
      },10000)
    });
  };

  return (
    <div className='App'>
      {page === 1 ? (
        <Form1 onNext={handleNext} onChange={handleChange} formData={formData} locationData={handleLocation}  />
      ) : (
        <Form2
          onDateChange={handleDate}
          onTechChange={handleTech}
          onBack={handleBack}
          onSubmit={handleSubmit}
          onChange={handleChange}
          formData={formData}
          formState={formNotComplete}
          loading={loading}
          onSubmitClick={handleClick}
          sendAlert={alert}
          alertResponse={response}
          closeAlert={handleAlertResponse}
        />
      )}
    </div>
  );
};

export default StartupForm;

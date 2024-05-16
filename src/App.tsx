import React, { useEffect, useState } from 'react';
import { FormData, BloodPressure, Timetable } from './components/interfaces/interface';
import Form1 from './components/form1/Form1';
import Form2 from './components/form2/Form2';
import './App.css';



const StartupForm: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [formNotComplete, setFormNotComplete] = useState<boolean>(true);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [bpRange, setBpRange] = useState<string>('');
  const [advice, setAdvice] = useState<string>('');
  const [formData, setFormData] = useState<FormData>({
    systolic: "",
    diastolic: "",
  });
  const [bloodPressure, setBloodPressure] = useState<BloodPressure>({ systolic: 0, diastolic: 0 });
  const [eatingTimetable, setEatingTimetable] = useState<string[]>([]);
  const [exerciseTimetable, setExerciseTimetable] = useState<Timetable[]>([]);

  const generateRecommendations = (bloodPressure: BloodPressure): { eating: string[], exercise: Timetable[] } => {
    let eatingRecommendations: string[] = [];
    let exerciseRecommendations: Timetable[] = [];

    // Determine blood pressure range
    if (bloodPressure.systolic <= 90 && bloodPressure.diastolic <= 60) {
      setBpRange('hypotension');
      setAdvice('If the healthcare professional who took your blood pressure referred you to your Medical Practitioner follow their advice and attend the appointment.')
    } else if (bloodPressure.systolic <= 120 && bloodPressure.diastolic <= 80) {
      setBpRange('Healthy');
      setAdvice('Ensure you checkup regularly')
    } else if (bloodPressure.systolic <= 140 && bloodPressure.diastolic <= 90) {
      setBpRange('very high');
      setAdvice('If the healthcare professional who took your blood pressure referred you to your Medical Practitioner follow their advice and attend the appointment.')
    } else if (bloodPressure.systolic <= 160 && bloodPressure.diastolic <= 100) {
      setBpRange('Extremely high');
      setAdvice('If the healthcare professional who took your blood pressure referred you to your Medical Practitioner follow their advice and attend the appointment.')
    } else {
      setBpRange('ABNORMAL READING');
      setAdvice("Please re-check");
    }
    // Generate recommendations based on blood pressure range
    switch (bpRange) {
      case 'Healthy':
        eatingRecommendations = ['Healthy balanced diet with fruits and vegetables', 'Regular physical activity'];
        exerciseRecommendations = [
          { day: 'Monday', activity: 'Morning: Yoga' },
          { day: 'Tuesday', activity: 'Evening: Walking' },
          { day: 'Wednesday', activity: 'Afternoon: Swimming' },
          {day: "Thursday", activity: "Morning: Cycling"},
          {day: "Friday", activity: "Evening: Dance class"},
          {day: "Saturday", activity: "Morning: Hiking"},
          {day: "Sunday", activity: "Afternoon: Tennis"}
              /*...*/
        ];
        break;
      case 'very high':
        eatingRecommendations = ['Limit sodium intake', 'Increase potassium-rich foods', 'Moderate physical activity'];
        exerciseRecommendations = [
          { day: 'Monday', activity: 'Morning: Stretching' },
          { day: 'Tuesday', activity: 'Evening: Swimming' },
          { day: 'Wednesday', activity: 'Afternoon: Pilates' },
          {day: "Thursday", activity: "Morning: Aerobic exercise"},
          {day: "Friday", activity: "Evening: Pilates"},
          {day: "Saturday", activity: "Morning: Brisk walking"},
          {day: "Sunday", activity: "Afternoon: Gardening"}
          /*...*/
        ];
        break;
      case 'hypotension':
        eatingRecommendations = ['Increase fluid intake throughout the day, including water, fruit juices, and sports drinks.', 'Consume salty foods to help raise blood pressure, such as Salted snacks like pretzels', 'Incorporate healthy sources of sodium into meals'];
        exerciseRecommendations = [
          { day: 'Monday', activity: 'Morning: Stretching' },
          { day: 'Tuesday', activity: 'Evening: Swimming' },
          { day: 'Wednesday', activity: 'Afternoon: Short walks' },
          { day: 'Thursday', activity: 'Afternoon: leisurely bike rides' }, 
          { day: 'Friday', activity: 'Morning: Stretching' }, 
          { day: 'Saturday', activity: 'Afternoon: Gentle yoga or tai chi sessions' } 
        ]
        break;
      default:
        // Handle default case
        break;
    }

    return { eating: eatingRecommendations, exercise: exerciseRecommendations };
  };

  const handleGenerateTimetables = () => {
    const { eating, exercise } = generateRecommendations(bloodPressure);
    setEatingTimetable(eating);
    setExerciseTimetable(exercise);
    console.log("generated");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setBloodPressure({...bloodPressure, [name]: value})
    checkFormData();
  };

  const handleClick = (): void =>  {
    setLoading(true);
}

  useEffect(() => {
    checkFormData();
    handleGenerateTimetables();
    // eslint-disable-next-line
  }, [formData]);

  const checkFormData = (): void => {
    if (formData.systolic &&
        formData.diastolic) {
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
    handleGenerateTimetables();
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
        setLoading(false);
        console.log('Response:', data);
        setFormData({
          systolic: "",
          diastolic: "",
        });
      }, 4000);
    })
    .catch(error => {
      setTimeout(() => { //simulating error on submission
        setLoading(false);
        setFormData({
          systolic: "",
          diastolic: "",
        });
        console.error('There was a problem with the POST request - Invalid endpoint');
      }, 4000)
    });
  };

  return (
    <div className='App'>
      {page === 1 ? (
        <Form1 
        onNext={handleNext}
        onChange={handleChange} 
        formData={formData} 
        formState={formNotComplete}
        loading={loading}
        onSubmit={handleSubmit}
        onSubmitClick={handleClick}
          />
      ) : (
        <Form2
          eatingTimetable={eatingTimetable}
          exerciseTimetable={exerciseTimetable}
          bpRange={bpRange}
          advice={advice}
          bloodPressure={bloodPressure} 
          onBack={handleBack}
        />
      )}
    </div>
  );
};

export default StartupForm;

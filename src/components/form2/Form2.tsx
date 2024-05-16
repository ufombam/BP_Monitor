import React, { useRef } from 'react';
import { FormData, Timetable, BloodPressure } from '../../components/interfaces/interface';
import { Button, Box, FormControl, InputLabel, MenuItem, TextField, Autocomplete, Stack, Collapse, Alert, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Select from '@mui/material/Select';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import Footer from '../footer/Footer';
import logo from '../../assets/logo/vester_ai.png';
import Typed from 'typed.js';
import './Form2.css';



const Form2: React.FC<{ 
        onBack: () => void;
        eatingTimetable: string[];
        exerciseTimetable: Timetable[];
        bpRange: string;
        advice: string;
        bloodPressure: BloodPressure;
        sendAlert: boolean;
        alertResponse: string;
        formData: FormData; 
        closeAlert: (res: string,  state: boolean) => void;
    }> = ({
    eatingTimetable,
    exerciseTimetable,
    bpRange,
    advice,
    bloodPressure,
    onBack,
    formData,
    sendAlert,
    alertResponse,
    closeAlert
}) => {
    console.log(eatingTimetable, exerciseTimetable)
    return (
        <div className='fm2-body'>
                <div className='fm2-right'>
                <h1>{`${bloodPressure.systolic}/${bloodPressure.diastolic}`}</h1>
                <h3>{`Your Blood pressure suggests ${bpRange} reading - ${advice}`}</h3>
                    <h3>Below is your personalized exercise and meal recommendation</h3>
                    <h2>Eating Timetable:</h2>
                    <ul>
                        {eatingTimetable.map((item, index) => (
                        <li key={index}>{item}</li>
                        ))}
                    </ul>
                    <h2>Exercise Timetable:</h2>

                    <table>
                        <thead>
                        <tr>
                            <th>Day</th>
                            <th>Activity</th>
                        </tr>
                        </thead>
                        <tbody>
                        {exerciseTimetable.map((item, index) => (
                            <tr key={index}>
                            <td>{item.day}</td>
                            <td>{item.activity}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className='fm2-left'>
                    <Stack 
                        direction="row" 
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}
                        >
                        <Button
                            variant="outlined"
                            startIcon={<ArrowBackIos />}
                            onClick={onBack}
                            color="secondary"
                            >
                            BACK
                        </Button>
                    </Stack>
                </div>
            <Footer />
    </div>
  );
};

export default Form2;
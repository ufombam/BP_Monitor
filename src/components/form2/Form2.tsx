import { Timetable, BloodPressure } from '../../components/interfaces/interface';
import { Button, Stack } from '@mui/material';
import { ArrowBackIos} from '@mui/icons-material';
import Footer from '../footer/Footer';
import './Form2.css';



const Form2: React.FC<{ 
        onBack: () => void;
        eatingTimetable: string[];
        exerciseTimetable: Timetable[];
        bpRange: string;
        advice: string;
        bloodPressure: BloodPressure;
    }> = ({
    eatingTimetable,
    exerciseTimetable,
    bpRange,
    advice,
    bloodPressure,
    onBack,
}) => {
    console.log(eatingTimetable, exerciseTimetable)
    return (
        <div className='fm2-body'>
                <div className='fm2-right'>
                    <h1>{`${bloodPressure.systolic}/${bloodPressure.diastolic}`}</h1>
                    <p>{`Your Blood pressure reading is `}<span>{`${bpRange} - `}</span>{`${advice}`}</p>
                    <h3>Below is your personalized exercise and meal recommendation</h3>
                    <h2>Eating Recommendation:</h2>
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
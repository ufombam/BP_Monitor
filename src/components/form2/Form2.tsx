import React, { useRef } from 'react';
import { FormData } from '../../components/interfaces/interface';
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
        onSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void; 
        onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void; 
        formData: FormData; 
        onTechChange: (event: React.ChangeEvent<{}>, newValue: string[]) => void;
        onDateChange: (newValue: string | any) => void;
        formState: boolean;
        loading: boolean,
        onSubmitClick: () => void;
        sendAlert: boolean;
        alertResponse: string;
        closeAlert: (res: string,  state: boolean) => void;
    }> = ({
    onBack,
    onSubmit,
    onChange,
    formData,
    onTechChange,
    onDateChange,
    formState,
    loading,
    onSubmitClick,
    sendAlert,
    alertResponse,
    closeAlert
}) => {

    const industries = ['Finance', 'Healthcare', 'Education', 'Technology', 'Other'];

    const technologies = ['AI/ML', 'Blockchain', 'IoT', 'Mobile', 'Web', 'Other'];

    //Typwriter effect configuration
    const typeEffectEl = useRef(null);
    React.useEffect(() => {
        const typed = new Typed(typeEffectEl.current, {
            strings: ['<h1><span>AI Assessment:</span> </h1><h1>Your Path to Precision</h1><h1>and Progress! </h1><p>"Welcome to Vester AI, your AI assessment ally. Elevate your journey with personalized insights tailored for success."</p>'],
            typeSpeed: 10,
            showCursor: false,
            loop: false,
            loopCount: Infinity
        });
    
        return () => {
          // Destroy Typed instance during cleanup to stop animation
          typed.destroy();
        };
      }, []);

    return (
    <div className='fm2-body'>
        <div className='fm2-main'>
            <div className='fm2-left'>
                <div className="fm2-left_header"><img src={logo} alt="vester_logo" /></div>
                <div ref={typeEffectEl}>
                </div>
            </div>
            <div className='fm2-right'>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '90%' },
                    }}
                    noValidate
                    autoComplete="off"
                    >
                        <h1 style={{width: "100%"}}>Additional Information</h1>
                        <FormControl fullWidth required>
                            <InputLabel id="industry_label">Industry</InputLabel>
                            <Select
                                labelId="industry"
                                id="industry_tag"
                                value={formData.industry}
                                label="Industry"
                                name='industry'
                                onChange={(event: any) => {
                                    return onChange(event);
                                }}
                                >
                                {industries.map((industry, index) =>
                                    <MenuItem key={index} value={industry}>{industry}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                        <Autocomplete
                            id="technology used"
                            multiple
                            sx={{ width: 300 }}
                            options={technologies}
                            value={formData.technology}
                            onChange={(event: any, value) => {
                               return onTechChange(event, value);
                            }}
                            autoHighlight
                            getOptionLabel={(option) =>  option}
                            renderOption={(props, option) => (
                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                            {option}
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Technology Used"
                                name='technology'
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                }}
                                required
                            />
                        )}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Founded Date"
                            maxDate={dayjs(new Date())}
                            value={formData.foundedDate} 
                            onChange={(newValue: any) => {
                                const myDate = (newValue?.toDate().toLocaleDateString().split('/').join('-'));
                                return  onDateChange(dayjs(myDate));
            
                            }}
                            slotProps={{
                            textField: {
                                helperText: 'MM/DD/YYYY',
                            },
                            }}
                        />
                    </LocalizationProvider>
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
                            <LoadingButton
                                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                                    onSubmitClick()
                                    return onSubmit(event)
                                }}
                                endIcon={<ArrowForwardIos />}
                                loading={loading}
                                loadingPosition="end"
                                variant="contained" 
                                disabled={formState ? true : false}
                                color="secondary"
                            >
                                <span>SUBMIT</span>
                            </LoadingButton>
                        </Stack>
                        {
                        alertResponse === 'ok' ? 
                        <Collapse in={sendAlert}>
                            <Alert
                                action={
                                    <IconButton
                                      aria-label="close"
                                      color="inherit"
                                      size="small"
                                      onClick={() => {
                                        closeAlert('', false);
                                      }}
                                    >
                                      <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                  }
                                severity="success"
                                sx={{ mb: 2 }}
                                >
                                Your Information has been received!
                            </Alert>
                        </Collapse> :
                        alertResponse === 'notOkay' ?
                        <Collapse in={sendAlert}>
                            <Alert
                                action={
                                    <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        closeAlert('', false);
                                    }}
                                    >
                                    <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                }
                                severity="warning"
                                sx={{ mb: 2 }}
                                >
                                Oops! That didn't work
                            </Alert>
                        </Collapse> :
                        <div></div>
                        }
                </Box>
            </div>
        </div>
        <Footer />
    </div>
    );
};

export default Form2;
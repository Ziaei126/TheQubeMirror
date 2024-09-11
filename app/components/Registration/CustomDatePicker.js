import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useFormikContext, useField } from 'formik';
import dayjs from 'dayjs'; // Import Day.js
import 'dayjs/locale/en-gb';

const CustomDatePicker = ({ field, 
    form: { touched, errors } 
}) => {
  
  const { setFieldValue } = useFormikContext();

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
        <DatePicker
        sx={{
            width: '100%',
         }}
          value={field.value ? dayjs(field.value, 'YYYY-MM-DD') : null} // Convert to Day.js object in the correct format
          onChange={(val) => {
            setFieldValue(field.name, val ? dayjs(val).format('YYYY-MM-DD') : null); // Set value in Formik's state with the correct format
          }}
          fullWidth
        />
        {touched[field.name] &&
       errors[field.name] && <div className="text-red-600 mt-1">please enter valid date</div>}
      </LocalizationProvider>
    </div>
  );
};

export default CustomDatePicker;
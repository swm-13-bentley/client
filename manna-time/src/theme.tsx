import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: '#5194FF',
        },
        secondary: {
            main: '#333333',
        },
        error: {
            main: '#FF543A',
        },
    }

});

export default theme;
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1F6FCE',
            light: '#4F9CFF',
            dark: '#0052B4',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#00D4FF',
            light: '#62EFFF',
            dark: '#0099CC',
            contrastText: '#ffffff',
        },
        success: {
            main: '#2ECC71',
            light: '#5DDE71',
            dark: '#1AA851',
        },
        warning: {
            main: '#F39C12',
            light: '#F5B041',
            dark: '#C27D0E',
        },
        error: {
            main: '#E74C3C',
            light: '#EC7063',
            dark: '#C0392B',
        },
        background: {
            default: '#F5F7FA',
            paper: '#FFFFFF',
        },
        text: {
            primary: '#1A1F36',
            secondary: '#687389',
            disabled: '#B8BCC8',
        },
        divider: '#E8ECF1',
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 600,
            letterSpacing: '-0.01562em',
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
            letterSpacing: '-0.00833em',
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 600,
        },
        h4: {
            fontSize: '1.5rem',
            fontWeight: 600,
        },
        h5: {
            fontSize: '1.25rem',
            fontWeight: 600,
        },
        h6: {
            fontSize: '1rem',
            fontWeight: 600,
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.7,
        },
        body2: {
            fontSize: '0.875rem',
            lineHeight: 1.6,
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 600,
                    borderRadius: 8,
                    padding: '10px 24px',
                },
                contained: {
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0 4px 12px rgba(0, 150, 136, 0.3)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                },
                elevation1: {
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 8,
                    },
                },
            },
        },
    },
});

export default theme;

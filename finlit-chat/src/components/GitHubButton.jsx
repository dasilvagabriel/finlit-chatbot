import React from "react";
import Box from '@mui/material/Box';
import { GitHub as GitHubIcon } from '@mui/icons-material';

export default function GitHubButton() {
    return (
        <Box sx={{
            position: 'fixed',
            bottom: '10vh',
            right: '5vw',
            cursor: 'pointer',
            zIndex: 10,
            width: '140px',
            height: '40px',
            color: 'black',
            backgroundColor: 'white',
            fontSize: '12px',
            fontFamily: 'Inter',
            borderRadius: '20px',
            padding: '8px',
            textAlign: 'center',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
            justifyContent: 'center',
            display: 'flex', 
            alignItems: 'center'
        }}>
            <a href="https://github.com/dasilvagabriel/finlit-chatbot" target="_blank" rel="noopener noreferrer" 
               style={{textDecoration: 'none', display: 'flex', alignItems: 'center'}}>
                <GitHubIcon sx={{ mr: 1 }} /> <b>Check the code</b>
            </a>
        </Box>
    );
}

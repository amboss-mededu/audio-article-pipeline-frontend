import React, {useState} from 'react';
import { TextSubmissionForm } from './components/TextSubmissionForm';
import {Box, dark, light, ThemeProvider} from "@amboss/design-system";


function App() {
    const [theme, setTheme] = useState(false)

    return (
        <ThemeProvider theme={theme ? dark : light}>
            <Box className="App">
                <TextSubmissionForm />
            </Box>
        </ThemeProvider>
  );
}

export default App;

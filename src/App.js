import logo from './logo.svg';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppBar, Box, Grid, Toolbar, Typography,Container,Button} from '@mui/material';
import { useEffect, useState } from 'react';
import { getRandomWord, isAllowedCharacter } from './utils/client';
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const styles = ({
  logo: {
    height: 40,
  },
  word: {
    fontSize: 50, 
    letterSpacing: 20,
    fontWeight: 'bold',
    marginTop: 30,
  }
})

function App() {
  const [word, setWord] = useState();
  const [currentState, setCurrentState] = useState();
  const [mistakes, setMistakes] = useState([]);
  const [changeimg,setChangeimg]= useState(0);
 
useEffect(() => {
    const word = getRandomWord();
    setWord(word.toLowerCase());
    {console.log(word.toLowerCase())};
  }, []);

  useEffect(() => {
    if (!word || word.length === 0) {
      return;
    }
    let initialState = '';
    for (let i = 0; i < word.length; i++) {
      initialState = `${initialState}_`;
    } 
    setCurrentState(initialState);
  }, [word]);

  const processKeyPress = (key) => {
    if (!isAllowedCharacter(key)) {
      return;
    }
    key = key.toLowerCase();
    if (mistakes.includes(key)) {
      return;
    }
    if (word.indexOf(key) < 0) {
      setMistakes([key, ...mistakes]);
      return;
    }
    let newState = '';
    for (let i = 0; i < word.length; i++) {
      if (word[i] === key) {
        newState = `${newState}${key}`;
      } else {
        newState = `${newState}${currentState[i]}`;
      }
    }
    setCurrentState(newState);
  }

  const showresult=(yay)=>{
    return (
      <ThemeProvider theme={darkTheme}>
      <CssBaseline />
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
          <Toolbar>
            <Grid component="div" sx={{ flexGrow: 1 }}>
              <img src={logo} alt="Hangman Logo" style={styles.logo}/>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
      <main>
      <Grid container spacing={2}>
        <Grid item xs={3}></Grid>
          <Grid item xs={6} style={styles.word}>
            {yay}<br/>
          </Grid>
        </Grid>
      </main>
      <Container fixed style={{'justifyContent': 'center','alignItems': 'center','display': 'flex','marginTop': '150px','flexDirection':'column'}}>
      <img src={require(`./images/${changeimg}.jpg`)} alt="Hangman Logo" style={{height:'400px'}}/>
      <Button style={{'marginTop':'15px'}} variant="contained" color="success" onClick={()=>{setMistakes([]);const word = getRandomWord();setWord(word.toLowerCase());console.log(word);}} >
      Restart
      </Button>
      </Container>
    </ThemeProvider>
  );
  }
  const showresultsbefore=()=>{
  return (
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
        <Toolbar>
          <Grid component="div" sx={{ flexGrow: 1 }}>
            <img src={logo} alt="Hangman Logo" style={styles.logo}/>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
    <main>
    <Grid container spacing={2}>
      <Grid item xs={3}></Grid>
      <Grid item xs={6} style={styles.word}>
      <Typography>Guess car manufacturer OR get HANGED</Typography>
          {currentState}<br/>
          <Typography>Mistakes: {mistakes.length}</Typography>
        </Grid>
      </Grid>
    </main>
    <Container fixed style={{'justifyContent': 'center','alignItems': 'center','display': 'flex','marginTop': '150px'}}>
    <img src={require(`./images/${changeimg}.jpg`)} alt="Hangman Logo" style={{height:'400px'}}/>
    </Container>
  </ThemeProvider>
);

  }
  useEffect(()=>{
    for(let i=0;i<7;i++){
    if(mistakes.length === i) setChangeimg(i);
    }
    
  },[mistakes,changeimg])
  
  
 
  document.onkeyup = function(event) {
    processKeyPress(event.key);
  }
  

if(mistakes.length>=6){
    
  return showresult('You Lose');
}
else if(currentState===word) return showresult('You Win');
else{
 return showresultsbefore();
}
}
export default App;
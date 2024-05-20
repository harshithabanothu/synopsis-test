// App.js
import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box

} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: 240,
    transition: 'width 0.3s',
  },
  hoverArea: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    width: '20px',
    zIndex: 1201,
  },
  // appBar: {
  //   zIndex: theme.zIndex.drawer + 1,
  // },
  menuButton: {
    marginRight:'20px'
  },
  title: {
    flexGrow: 1,
  },
  centerBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 100,
    minHeight: 100,
  },
}));

const App = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [type, setType] = React.useState('');

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };

  return (
    <div onMouseLeave={handleMouseLeave}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Synopsis-Test
          </Typography>
          <Box sx={{ minWidth: 80 }}/>
          <Box className={classes.centerBox}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">type</InputLabel>
            <Select
               labelId="demo-simple-select-label"
               id="demo-simple-select"
               value={type}
               label="Type"
               onChange={handleChange}
              >
             <MenuItem value="Synopsis">Synopsis</MenuItem>
             <MenuItem value="Designer">Designer</MenuItem>
           
          </Select>
         </FormControl>
          </Box>
         
        </Toolbar>
      </AppBar>
      <div className={classes.hoverArea} onMouseEnter={handleMouseEnter} />
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        classes={{ paper: classes.drawerPaper }}
      >
        <List>
          <ListItem button>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="About" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Contact" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default App;

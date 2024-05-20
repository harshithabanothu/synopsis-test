// App.js
import React, { useState, useEffect } from 'react';
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

import config from "./mock/config.json";
import { type } from '@testing-library/user-event/dist/type';

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
    marginRight: '20px'
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
  const [items, setItems] = useState(config);
  const [selectedItem, setSelectedItem] = useState(null);

  if (items.length > 0 && !selectedItem) setSelectedItem(items[0]);

  const handleChange = (event) => {
    let value = event.target.value
    let obj = JSON.parse(JSON.stringify(selectedItem))
    obj.type = value
    setSelectedItem(obj);
  };

  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  if (!selectedItem) {
    return
  }
  return (
    <div onMouseLeave={handleMouseLeave}>
      <CssBaseline />
      <AppBar position="relative fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {selectedItem.name}
          </Typography>
          <Box sx={{ minWidth: 30 }} />
          <Box className={classes.centerBox}>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-simple-select-label">type</InputLabel>
              <Select
               labelId="demo-simple-select-label"
               id="demo-simple-select"
                value={selectedItem.type}
                onChange={handleChange}
                label="type"
              >
                <MenuItem value="widget">Widget</MenuItem>
                <MenuItem value="designer">Designer</MenuItem>

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
          {items.map(item => (<ListItem button key={item.id} onClick={() => handleItemClick(item)}>
            <ListItemText primary={item.name} />
          </ListItem>
          ))}
        </List>
      </Drawer>
      <div style={{ position: 'absolute' }}>
        {selectedItem.id}
      </div>
    </div>
  );
};

export default App;

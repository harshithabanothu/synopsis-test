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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Synopsis } from 'gtms-synopsis';
import config from './mock/config.json';
// const data={
//   appid: "ROOT_SYNOPSIS", // Application identifer for rendering app
//   type: "widget", // widget or designer
//   hierarchy: hierarchy, //hierarchy in JSON format
//   data: data, //Flat Data in JSON format
//   flexcelData: flexcelData, //flexcelData Flat Data in JSON format
//   dictionaries: dictionaries, // dictionaries in JSON format
//   units: units, // Units or Currencies we are supporting
//   fields: fields, // Need the fields in the same sequence in which data is coming
//   styleFormats: styleFormats, // Need the styleFormats object for styling
//   formats: {
//       dateFormat: "MM/DD/YYYY", //Date format key
//       decimalNotation: "Z", // Decimal Notation key
//       currencyFormat: "", //Currency Format Key
//       negNumFormat: "", //Negative Number Format Key
//   },
//   options: {
//       showDownloadButton: true,
//       showUserViews: true,
//       showFilters: true,
//       showUserSettings: true,
//       showFullScreenButton: true,
//   },                              // Options for hiding the toolbar buttons
//   themeDefaults : themeDefaults ,// Need the default theme object styles from SAP UI5
//   onChange: onChange, // Callback function for getting the updated data
//   onFullScreen: onFullScreen, // Callback function for toggling the fullscreen
// };

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
  const [selectedItem, setSelectedItem] = useState(items.length > 0 ? items[0] : null);

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedItem((prevSelectedItem) => ({
      ...prevSelectedItem,
      type: value,
    }));
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
    return null;
  }

  return (
    <div style={{ height: "100%" }} onMouseLeave={handleMouseLeave}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {selectedItem.name}
          </Typography>
          <Box sx={{ minWidth: 30 }} />
          <Box className={classes.centerBox}>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedItem.type}
                onChange={handleChange}
                label="Type"
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
          {items.map((item) => (
            <ListItem button key={item.id} onClick={() => handleItemClick(item)}>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div style={{ marginTop: "100px", height: "calc(100% - 100px)" }}>
        {/* {selectedItem.id} */}
        {
          items.map(item => {
            return (
              <div id={item.appid} className={(selectedItem.id === item.id) ? 'displayBlock' : "displayNone"} style={{ height: "100%" }}>
                <Synopsis config={item} />
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default App;

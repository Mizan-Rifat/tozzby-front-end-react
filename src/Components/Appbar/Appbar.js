import React, { useState, useEffect, useContext } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import MuiAppBar from '@material-ui/core/AppBar';
import { Toolbar, Paper, IconButton, Typography, InputBase, Badge, MenuItem, Menu } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Hidden } from '@material-ui/core';
import axios from 'axios';
import { AppContext } from '../../App';
import ListIcon from '@material-ui/icons/List';
import MiniCart from '../Cart/MiniCart'
import { Link } from 'react-router-dom';
import Auth from '../Auth/Auth';
import CategoryList from '../Sidebars/CategoryList';

import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SearchBox from './SearchBox';
import CategoryDrawer from './CategoryDrawer';
import { useHistory } from 'react-router-dom';
import AuthCheck from '../Common/AuthCheck';




const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    // position:'relative'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    cursor: 'pointer',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  titleLink: {
    color: 'white',
    '&:hover': {
      color: 'white',
      textDecoration: 'none'
    }
  },
  search: {
    position: 'relative',
    display: 'flex',
    borderRadius: theme.shape.borderRadius,

    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    height: '35px',
    color: 'inherit',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `1em`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  select: {

  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },

  toolbar: {
    // minHeight: 90,
    // alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    // paddingBottom: theme.spacing(2),
  },
  tab: {
    background: 'darkslateblue',
    display: 'flex',
    display: 'inline-block',
    padding: '10px 22px',
    marginLeft: '58px',
    cursor: 'pointer'
  },

  listContainer: {
    position: 'absolute',
    left: '60px',
    top: '60px',
    minHeight: '250px',
    transition: '.2s ease-in',

  },
  show: {
    top: 46,
    opacity: 1
  },
  hide: {
    opacity: 0,
    pointerEvents: 'none'
  },

}));

export default function PrimarySearchAppBar() {
  const history = useHistory();

  const { user, userDispatch, cartItems,wishListItems, authOpen, setAuthOpen } = useContext(AppContext);
  const [authenticated] = AuthCheck();

  const [showCart, setShowCart] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';

  const handleLogin = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    setAuthOpen({ comp: 1, state: true });
  }

  const handleRegister = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    setAuthOpen({ comp: 2, state: true });
  }
  const handleLogout = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    axios.get(`${process.env.REACT_APP_DOMAIN}/api/customer/logout?token=true`,
      {
        withCredentials: true
      }
    )
      .then(response => {
        userDispatch({
          type:'LOGOUT',
        })
      }).catch(error=>{
        console.log(error)
      })
  }

  const handleAccount = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    history.push('/account')

  }

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {
        authenticated ?
          <>
            <MenuItem onClick={handleAccount}>My account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </>

          :
          <>
            <MenuItem onClick={handleLogin}>Login</MenuItem>
            <MenuItem onClick={handleRegister}>Register</MenuItem>
          </>
      }

    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit" onClick={()=>history.push('/account/wishlist')}>
          <Badge badgeContent={wishListItems.length} color="secondary">
            <FavoriteIcon />
          </Badge>
        </IconButton>

      </MenuItem>

      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit" onClick={()=>history.push('/cart')}>
          <Badge badgeContent={cartItems.items_count} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>

      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>

      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <MiniCart showCart={showCart} setShowCart={setShowCart} />
      <MuiAppBar position="fixed">
        <Toolbar className={classes.toolbar}>


          <Hidden mdUp>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={() => setCatOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>


          <Typography className={classes.title} variant="h6" noWrap>
            <Link to='/' className={classes.titleLink}>My-Ecommerce</Link>
          </Typography>


          <SearchBox style={{ flex: 1 }} />


          {/* 
          <div className={classes.search}>




            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>

            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />



          </div> */}


          {/* <div className={classes.grow} /> */}



          <div className={classes.sectionDesktop}>

            <IconButton aria-label="show 4 new mails" color="inherit" onClick={()=>history.push('/account/wishlist')}>
              <Badge badgeContent={wishListItems.length} color="secondary">
                <FavoriteIcon  />
              </Badge>
            </IconButton>

            <IconButton color="inherit" onMouseEnter={() => setShowCart(true)} onMouseLeave={() => setShowCart(false)}  onClick={()=>history.push('/cart')}>
              <Badge badgeContent={cartItems.items_count} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>

          </div>

          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>



        </Toolbar>

        <div className="" style={{ position: 'relative' }} >

          <div
            className={classes.tab}
            onMouseEnter={() => setShowCategories(true)}
            onMouseLeave={() => setShowCategories(false)}
          >

            <ListIcon />

            <h5 style={{ fontSize: '16px', fontWeight: 700, marginLeft: '5px', display: 'inline' }}>
              ALL CATEGORIES
            </h5>

          </div>

          <Paper elevation={3} className={`${classes.listContainer} ${showCategories ? classes.show : classes.hide}`} onMouseEnter={() => setShowCategories(true)} onMouseLeave={() => setShowCategories(false)} >
            <CategoryList />
          </Paper>

        </div>

      </MuiAppBar>

      <CategoryDrawer open={catOpen} setOpen={setCatOpen} />

      {/* <Auth open={open} setOpen={setOpen} /> */}

      {renderMobileMenu}
      {renderMenu}


    </div>
  );
}

import React, { useEffect } from "react";
import { AppBar, Badge, Box, Divider, IconButton, Toolbar, Typography } from "@mui/material";
import FavoriteIcon from '../../icons/favorite.svg';
import FactsSoftIcon from '../../icons/facts-soft.svg';
import CartIcon from '../../icons/cart.svg';
import { useSelector } from "react-redux";
import AddToCart from "../addToCart/AddToCart";

function Header() {
    const { data, screenScroll, viewCartInHeader } = useSelector((state) => state.data);

    useEffect(() => {
        if (data.cart?.items > 0) {
            const element = document.getElementsByClassName('MuiBadge-badge')[0];
            element.classList.add('animate');
            element.addEventListener('animationend', () => element.classList.remove('animate'));
            return () => element.removeEventListener('animationend', () => element.classList.remove('animate'));
        }
    }, [data.cart?.items]);

    return (
        <Box sx={{ flexGrow: 1, height: 64 }}>
            <AppBar className={screenScroll ? 'shadowClass' : 'borderClass'} position="fixed" color="white">
                <Toolbar className="toolbar-wrapper" sx={{ paddingRight: 0 }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 400 }} color="error">
                        {data.article?.title}
                    </Typography>
                    {!viewCartInHeader && <AddToCart classes='cart-selection-header'/>}
                    <IconButton
                        size="medium"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 1 }}
                    >
                        <img src={FavoriteIcon} alt="cart" style={{ width: 24, height: 24, opacity: 0.4 }} />
                    </IconButton><IconButton
                        size="medium"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 1 }}
                    >
                        <img src={FactsSoftIcon} alt="cart" style={{ width: 24, height: 24, opacity: 0.4 }} />
                    </IconButton>
                    <Divider orientation="vertical" variant="fullWidth" flexItem sx={{ mr: 2.5 }} />
                    <IconButton
                        size="medium"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 1 }}
                    >
                        <Badge className="badgeCount" badgeContent={data.cart?.items} color="error">
                            <img src={CartIcon} alt="cart" style={{ width: 24, height: 24, opacity: 0.4 }} />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;
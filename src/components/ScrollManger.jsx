import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollManager = ({ children }) => {
    const location = useLocation();
    const scrollPositions = useRef({});

    useEffect(() => {
        // Scroll to the top of the page on navigation
        window.scrollTo(0, 0);
    }, [location.pathname]);

    useEffect(() => {
        // Restore scroll position when navigating back
        return () => {
            scrollPositions.current[location.pathname] = window.scrollY;
        };
    }, [location.pathname]);

    useEffect(() => {
        // Scroll to saved position if available
        const scrollPosition = scrollPositions.current[location.pathname];
        if (scrollPosition !== undefined) {
            window.scrollTo(0, scrollPosition);
        }
    }, [location.pathname]);

    return <>{children}</>;
};

export default ScrollManager;

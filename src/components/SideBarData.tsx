import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';

export const SideBarData = [
    {
        title: "Customer",
        icon: <PersonIcon />,
        link: "/customers",
    },
    {
        title: "Training",
        icon: <DirectionsRunIcon />,
        link: "/trainings",
    },
    {
        title: "Calendar",
        icon: <CalendarMonthIcon />,
        link: "",
    },
    {
        title: "Statistic",
        icon: <LeaderboardIcon />,
        link: "",
    }
]

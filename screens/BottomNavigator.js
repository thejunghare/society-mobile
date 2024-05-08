import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';

import DashboardScreen from './DashboardScreen';
import SettingsScreen from './SettingsScreen';

const BottomNavigator = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'dashboard', title: 'Dashboard', focusedIcon: 'home', unfocusedIcon: 'home-outline' },
        { key: 'settings', title: 'Settings', focusedIcon: 'cog',unfocusedIcon: 'cog-outline' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        dashboard: DashboardScreen,
        settings: SettingsScreen,
    });
    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
            labeled={true}
            compact={true}
            sceneAnimationEnabled={true}
            sceneAnimationType='shifting'
        />
    );
};

export default BottomNavigator;
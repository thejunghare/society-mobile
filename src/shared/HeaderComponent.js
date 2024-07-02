import * as React from 'react';
import { StyleSheet, Text, View, Image,TouchableWithoutFeedback } from 'react-native';
import { Menu,Button, Icon ,Provider,Divider } from 'react-native-paper';

const HeaderComponent = () => {
    const [visible, setVisible] = React.useState(false);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    return (
        <Provider>
             <TouchableWithoutFeedback onPress={closeMenu}>
        <View style={style.headerParent}>
            <View style={style.headerChild}>
                <Image source={require('../../assets/Images/Logo.png')} style={style.headerImage} />
                <Text style={style.headerText}>माझी सोसायटी</Text>
            </View>
            <View style={style.headerChild}>
                <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={ 
                <Button onPress={openMenu}>
                    <Icon source='dots-vertical' size={20} />
                </Button>
                    }
                    contentStyle={style.menuContent}
                    >
                        <Menu.Item onPress={() => {}} title="My Payment" titleStyle={style.menuItemText} />
                        <Divider style={style.divider} />
                        <Menu.Item onPress={() => {}} title="My Bills" titleStyle={style.menuItemText} />
                        <Divider style={style.divider} />
                        <Menu.Item onPress={() => {}} title="Notice" titleStyle={style.menuItemText} />
                        <Divider style={style.divider} />
                        <Menu.Item onPress={() => {}} title="Complaints" titleStyle={style.menuItemText} />
                    </Menu>
            </View>
        </View>
        </TouchableWithoutFeedback>
        </Provider>
    );
}
const style = StyleSheet.create({
    headerParent: {
        minWidth: '100%',
        minHeight: '100%',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    headerChild: {      
        width: '40%',
        height: '100%',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    headerImageView: {
         shadowColor: '#3EB489',
        shadowOffset: { width: 0, height: 3},
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
        backgroundColor: '#fff',
        borderRadius: 8, 
    },
    headerImage: {
        width: 50,
        height: 65,
    },
    headerText: {
        paddingLeft: 6,
        color: '#3EB489',
        fontWeight: 'bold',
        fontSize: 24
    },
        dots: {
            fontSize: 24,
            color: '#3EB489',
        },
        menuContent: {
            backgroundColor: '#ffffff',
            borderRadius: 12,
            elevation: 5, // Adds shadow on Android
            shadowColor: '#000', // Adds shadow on iOS
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.8,
            shadowRadius: 8,
        },
        menuItemText: {
            color: 'rgba(0, 0, 0, 0.7)', // Black with low opacity
        fontWeight: 'bold',
        fontSize: 18,
        },
        divider: {
            backgroundColor: 'rgba(0, 0, 0, 0.1)', // Light gray color
            height: 1,
            marginHorizontal: 8,
        },
});
export default HeaderComponent;
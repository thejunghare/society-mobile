import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button, Icon } from 'react-native-paper';

const HeaderComponent = () => {
    return (
        <View style={style.headerParent}>
            <View style={style.headerChild}>
                <Image source={require('../assets/Images/logo.png')} style={style.headerImage} />
                <Text style={style.headerText}>माझी सोसायटी</Text>
            </View>
            <View style={style.headerChild}>
                <Button>
                    <Icon source='dots-vertical' size={20} />
                </Button>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    headerParent: {
        /*  borderColor: 'black',
         borderWidth: 1, */

        minWidth: '100%',
        minHeight: '100%',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    headerChild: {
        /* borderColor: 'red',
        borderWidth: 1, */

        width: '40%',
        height: '100%',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    headerImageView: {
        /* shadowColor: '#3EB489',
        shadowOffset: { width: 0, height: 3},
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
        backgroundColor: '#fff',
        borderRadius: 8, */
    },
    headerImage: {
        width: 50,
        height: 80,
    },
    headerText: {
        color: '#3EB489',
        fontWeight: 'bold',
        fontSize: 24
    },
})

export default HeaderComponent;
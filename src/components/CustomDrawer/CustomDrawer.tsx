import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import React, { useContext } from 'react';
import { Button, View } from 'react-native';
import authContext from '../../utils/authContext';

type Props = {
    state: any;
    navigation: any;
    descriptors: any;
};

const CustomDrawer = (props: Props) => {
    const { setAuthenticated } = useContext(authContext);

    const handleDisconnect = () => {
        setAuthenticated(false);
    };

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <View className="mt-auto ml-10">
                <Button title="Disconnect" onPress={handleDisconnect} />
            </View>
        </DrawerContentScrollView>
    );
};

export default CustomDrawer;

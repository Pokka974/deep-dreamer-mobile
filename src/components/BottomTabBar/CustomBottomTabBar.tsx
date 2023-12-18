import { View, Text, Pressable, useWindowDimensions } from 'react-native';
import React from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import BottomTabIcon from './BottomTabIcon';
import Animated, {
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native';

const CustomBottomTabBar = ({
    state,
    descriptors,
    navigation,
}: BottomTabBarProps) => {
    const { width } = useWindowDimensions();
    const MARGIN = 20;
    const TAB_BAR_WIDTH = width - 2 * MARGIN;
    const TAB_WIDTH = TAB_BAR_WIDTH / state.routes.length;

    const translateAnimation = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: withSpring(TAB_WIDTH * state.index) }],
        };
    });

    return (
        <View
            style={[{ width: TAB_BAR_WIDTH, bottom: MARGIN }]}
            className="flex-1 flex-row h-[70px] absolute self-center bg-[#7db4b4] rounded-2xl items-center justify-around overflow-hidden"
        >
            <Animated.View
                style={[
                    { width: TAB_WIDTH, ...StyleSheet.absoluteFillObject },
                    translateAnimation,
                ]}
                className="items-center justify-center"
            >
                <View className="w-16 h-16 rounded-2xl bg-white" />
            </Animated.View>
            {state.routes.map((route: any, index: any) => {
                const { options } = descriptors[route.key];

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, {
                            merge: true,
                        });
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <Pressable
                        key={index}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                    >
                        <View>
                            <BottomTabIcon
                                route={route.name}
                                isFocused={isFocused}
                            />
                        </View>
                    </Pressable>
                );
            })}
        </View>
    );
};

export default CustomBottomTabBar;

import React, { useEffect, useState } from 'react';
import { View, Text, Animated } from 'react-native';

const BlinkingCursor = () => {
    const opacity = new Animated.Value(1);

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ]),
        ).start();
    }, []);

    return (
        <Animated.View style={{ opacity }}>
            <View
                style={{ height: 24, width: 10, backgroundColor: 'white' }}
            ></View>
        </Animated.View>
    );
};

export default BlinkingCursor;

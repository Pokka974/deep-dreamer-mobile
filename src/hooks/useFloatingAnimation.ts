import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

const useFloatingAnimation = (duration = 2000) => {
    const floatAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const runFloatingAnimation = () => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(floatAnimation, {
                        toValue: 1,
                        duration: duration,
                        useNativeDriver: true,
                    }),
                    Animated.timing(floatAnimation, {
                        toValue: 0,
                        duration: duration,
                        useNativeDriver: true,
                    }),
                ]),
            ).start();
        };

        runFloatingAnimation();
    }, [duration]);

    const floatingStyle = {
        transform: [
            {
                translateY: floatAnimation.interpolate({
                    inputRange: [-1, 1],
                    outputRange: [-15, 15],
                }),
            },
        ],
    };

    return floatingStyle;
};

export default useFloatingAnimation;

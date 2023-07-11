import React, { useEffect, useState, useRef } from 'react';
import { Text } from 'react-native';
import * as Haptics from 'expo-haptics';

function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function TypingText({ text }: any) {
    const [displayedText, setDisplayedText] = useState('');
    const index = useRef(0);
    const intervalRef = useRef<number | null>(null); // <--- specify the type here

    useEffect(() => {
        setDisplayedText('');
        index.current = 0;

        intervalRef.current = window.setInterval(
            () => {
                // <--- use window.setInterval here
                if (index.current < text.length) {
                    setDisplayedText(
                        (prevState) => prevState + text.charAt(index.current),
                    );
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); // add haptic feedback
                    index.current++;
                } else {
                    window.clearInterval(intervalRef.current!); // <--- use window.clearInterval here
                }
            },
            getRandomInt(45, 100),
        ); // speed of typing

        return () => {
            window.clearInterval(intervalRef.current!);
        }; // <--- use window.clearInterval here
    }, [text]);

    return <Text className="text-white text-base">{displayedText}</Text>;
}

export default TypingText;

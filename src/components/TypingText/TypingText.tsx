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
                if (index.current < text.length) {
                    setDisplayedText(
                        (prevState) => prevState + text.charAt(index.current),
                    );
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); // device vibration
                    index.current++;
                } else {
                    window.clearInterval(intervalRef.current!);
                }
            },
            getRandomInt(10, 40),
        ); // speed of typing

        return () => {
            window.clearInterval(intervalRef.current!);
        };
    }, [text]);

    return (
        <Text className="text-black fond-quicksandLight text-lg">
            {displayedText}
        </Text>
    );
}

export default TypingText;

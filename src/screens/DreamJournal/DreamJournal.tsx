import { View, Text, FlatList, ImageBackground } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../../firebaseConfig';
import { set } from 'react-hook-form';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';

type Props = {};

interface IDream {
    userUID: string;
    dreamDescription: string;
    dreamInterpretation: string;
    dreamImageURL: string;
    createdAt: any;
}

const DreamJournal = (props: Props) => {
    const [dreamList, setDreamList] = useState<IDream[]>([]);

    const loadDreams = async () => {
        const querySnapshot = await getDocs(collection(FIRESTORE_DB, 'dreams'));
        let dreams: IDream[] = [];
        querySnapshot.forEach((doc) => {
            const dream = {
                ...doc.data(),
                createdAt: doc.data().createdAt.toDate(),
            };
            dreams.sort((a, b) => b.createdAt - a.createdAt);
            dreams.push(dream as IDream);
        });
        setDreamList(dreams);
    };
    useFocusEffect(
        useCallback(() => {
            loadDreams();
        }, []),
    );

    const renderDreamItem = ({ item }: { item: IDream }) => (
        <View>
            <ImageBackground
                className={`mt-4 p-3 rounded-lg  text-black min-h-[200px] shadow-sm shadow-zinc-100/50`}
                source={{ uri: item.dreamImageURL }}
                resizeMode="cover"
                style={{ opacity: 0.8, borderRadius: 20 }}
            >
                <View className="flex-row items-center justify-between">
                    <Text className="w-[70%] font-quicksandMedium text-xl">
                        {item.dreamDescription}
                    </Text>
                    <Text className="w-[30%] font-quicksand">
                        {item.createdAt.toLocaleString()}
                    </Text>
                </View>
                <Text className="font-quicksand">
                    {item.dreamInterpretation}
                </Text>
            </ImageBackground>
        </View>
    );

    return (
        <LinearGradient
            colors={['#4b6384', '#7db4b4', '#f2e5e5']}
            className="h-full"
        >
            <View className="flex-1 px-4">
                <FlatList
                    data={dreamList}
                    renderItem={renderDreamItem}
                    keyExtractor={(item) => item.userUID}
                />
            </View>
        </LinearGradient>
    );
};

export default DreamJournal;

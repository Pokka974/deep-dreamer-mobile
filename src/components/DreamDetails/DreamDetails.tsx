import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import React, { useCallback, useState } from 'react';
import { NavigationProp, useFocusEffect } from '@react-navigation/native';

type Props = {
    route: any;
    navigation: NavigationProp<any, any>;
};

const DreamDetails = ({ route, navigation }: Props) => {
    const { dreamInterpretation, dreamDescription, dreamImageURL, createdAt } =
        route.params;
    const screenHeight = Dimensions.get('window').height;
    const blurhash =
        '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

    return (
        <ScrollView className="flex-1">
            <Image
                source={{ uri: dreamImageURL }}
                style={{ height: screenHeight / 3 }}
                className={`w-full`}
                placeholder={blurhash}
                contentFit="cover"
                cachePolicy="memory"
                alt={dreamDescription}
                transition={1000}
            />
            <View className="p-2">
                <View className="flex-row items-start justify-between w-full">
                    <Text className="w-[70%] font-quicksandBold text-2xl">
                        {dreamDescription}
                    </Text>
                    <Text className="w-[30%] text-right font-quicksand">
                        {createdAt}
                    </Text>
                </View>
                <Text className="font-quicksand mt-2">
                    {dreamInterpretation}
                </Text>
            </View>
        </ScrollView>
    );
};

export default DreamDetails;

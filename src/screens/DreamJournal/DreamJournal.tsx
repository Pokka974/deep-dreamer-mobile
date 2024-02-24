import { NavigationProp, useFocusEffect } from '@react-navigation/native';
import { Image } from 'expo-image';
import React, { useCallback, useState } from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

type Props = {
    navigation: NavigationProp<any, any>;
};

interface IDream {
    id: string;
    userUID: string;
    dreamDescription: string;
    dreamInterpretation: string;
    dreamImageURL: string;
    createdAt: any;
}

const DreamJournal = ({ navigation }: Props) => {
    const [dreamList, setDreamList] = useState<IDream[]>([]);
    const [refreshing, setRefreshing] = useState<boolean>(false);

    // const loadDreams = async () => {
    //     setRefreshing(true);
    //     const querySnapshot = await getDocs(collection(FIRESTORE_DB, 'dreams'));

    //     const newDreams: IDream[] = querySnapshot.docs.map((doc) => {
    //         const dream = {
    //             id: doc.id,
    //             ...doc.data(),
    //             createdAt: doc.data().createdAt.toDate(),
    //         };
    //         return dream as IDream;
    //     });

    //     if (newDreams) {
    //         const sortedDreams = newDreams.toSorted(
    //             (a, b) => b.createdAt - a.createdAt,
    //         );
    //         setRefreshing(false);
    //         setDreamList(sortedDreams);
    //     }
    // };

    const blurhash =
        '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

    useFocusEffect(
        useCallback(() => {
            // loadDreams();
        }, []),
    );

    const renderDreamItem = ({ item }: { item: IDream }) => (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate('DreamDetails', {
                    dreamInterpretation: item.dreamInterpretation,
                    dreamDescription: item.dreamDescription,
                    dreamImageURL: item.dreamImageURL,
                    createdAt: item.createdAt.toLocaleString(),
                })
            }
            className="flex-1 h-60 mt-3 bg-white rounded-lg"
        >
            <Image
                className="object-cover w-full h-2/5 rounded-t-lg"
                source={{ uri: item.dreamImageURL }}
                placeholder={blurhash}
                contentFit="cover"
                alt={item.dreamDescription}
                transition={1000}
            />
            <View className="h-3/5 flex-col gap-2 px-1">
                <View className="flex-row items-center justify-between">
                    <Text className="w-[70%] font-quicksandMedium text-xl">
                        {item.dreamDescription}
                    </Text>
                    <Text className="w-[30%] font-quicksand text-right">
                        {item.createdAt.toLocaleString()}
                    </Text>
                </View>
                <Text
                    ellipsizeMode="tail"
                    numberOfLines={4}
                    className="font-quicksand"
                >
                    {item.dreamInterpretation}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView className="h-full bg-dark">
            <View className="flex-1 px-4 pt-10">
                <FlatList
                    data={dreamList}
                    onRefresh={() => {}}
                    refreshing={refreshing}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderDreamItem}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </SafeAreaView>
    );
};

export default DreamJournal;

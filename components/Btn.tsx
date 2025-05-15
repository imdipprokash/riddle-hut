import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
//@ts-ignore
import PlayIcon from '../assets/icons/playIcon.png'
import { hp, wp } from '../helper/contant';
interface BtnProps {
    title: string;
    onPress: () => void;
    style?: object;
    textStyle?: object;
}
const Btn: React.FC<BtnProps> = ({ title, onPress, style, textStyle }) => {
    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity
                activeOpacity={0.7}
                style={[
                    styles.button,
                    style,
                ]}
                onPress={onPress}
            >
                <Text style={[styles.text, textStyle]}>{title}</Text>
                <Image source={PlayIcon} resizeMode='contain' style={{ width: 40, height: 40 }} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,

        elevation: 12,
        height: hp(9),
        backgroundColor: "#000",
        borderRadius: 10,
        paddingRight: 8
    },
    button: {
        backgroundColor: '#16a34a',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: wp(5),
        height: hp(8),

    },
    text: {
        color: '#f2f2f2',
        fontSize: hp(3.5),
        // fontWeight: 'bold',
        fontFamily: 'KanchenjungaRegular'
    },
});

export default Btn;
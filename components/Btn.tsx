import React from 'react';
import { TouchableOpacity, Text,  StyleSheet, Image } from 'react-native';
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
        <TouchableOpacity activeOpacity={0.7} style={[styles.button, style]} onPress={onPress}>
            <Text style={[styles.text, textStyle]}>{title}</Text>
            <Image source={PlayIcon} resizeMode='contain'  style={{width:40,height:40}}/> 
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#65a30d',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:wp(5),
        height:hp(8)
    },
    text: {
        color: '#f2f2f2',
        fontSize: wp(8),
        // fontWeight: 'bold',
        fontFamily:'KanchenjungaRegular'
    },
});

export default Btn;
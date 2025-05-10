import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import { hp, wp } from '../../helper/contant'

type Props = {}

const PlaySrc = (props: Props) => {
  const riddleQestion = {
    'qestion': 'I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?',
    'ans': 'Map'
  }
  return (
    <View style={{ gap: hp(10) }}>
      <Header showBackBtn={true} />
      {/* Show question */}
      <View style={styles.questionContainer}>
        <Text style={styles.textStyle}>{riddleQestion.qestion}</Text>
      </View>
      {/* Answer input */}
      <View style={styles.ansView}>
        {riddleQestion.ans.split('').map((char, index) => (
          <View key={index} style={styles.charContainer}>
            {index === 1 ? (
              <TextInput
                style={[styles.inputStyle, { backgroundColor: 'darkgreen', color: "#fff", padding: 10 }]}
                placeholder="_"
                value={char}
                placeholderTextColor="#ccc"
                maxLength={1}
              />
            ) : (
              <TextInput
                style={styles.inputStyle}
                placeholder="_"
                placeholderTextColor="#ccc"
                maxLength={1}
              />
            )}
          </View>
        ))}
      </View>

    </View>
  )
}

export default PlaySrc

const styles = StyleSheet.create({

  questionContainer: {
    backgroundColor: "#f2f2f2",
    marginHorizontal: wp(8),
    paddingHorizontal: wp(3),
    paddingVertical: hp(2),
    borderRadius: 8,
    elevation: 10
  },

  textStyle: {
    fontSize: wp(6),
    fontFamily: 'KanchenjungaRegular',
    fontWeight: '600',
    textAlign: "center",
    paddingHorizontal: wp(1),
    color: '#000'

  },
  ansView: { flexDirection: 'row', gap: wp(2), alignSelf: 'center' },

  inputStyle: {
    fontSize: wp(8),
    fontFamily: 'KanchenjungaBold',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderColor: '#000',
    // width: wp(10),
    width: wp(12),
    height: hp(6.4),
    borderRadius: 4,
    color: "#000"


  },
  charContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(12),
    height: hp(6.4),
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
  },
})

//   < View style = { [styles.ansView,]} >
//   {
//     riddleQestion.ans.split('').map((e, index) => <View key={index}  >
//       {index === 1 ? <Text style={styles.ansText}>{e}</Text> : <TextInput style={styles.ansText} placeholder='_' />}

//     </View>)
//   }
// </View >
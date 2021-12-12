// import React, {useEffect, useState} from 'react';
// import CallChatCard from '../../components/Molecules/CallCard/CallChatCard';
// import {getAllAstrologers} from '../../services/Astrologer.service';
// import {Astrologer} from '../../types/ExternalModel.model';
// import {StyleSheet, View, Text, ScrollView} from 'react-native';
// import Footer from '../../components/Molecules/Footer/Footer';
// export default function Call({navigation}: any) {
//   const [list, setList] = useState<Astrologer[]>([]);
//   const openAstroProfile = (event: any) => {
//     navigation.navigate('AstrologerProfile');
//   };
//   useEffect(() => {
//     getAllAstrologers()
//       .then(astrologers => {
//         setList(astrologers.data);
//       })
//       .catch(err => {
//         //Show Something
//       });
//   }, []);
//   return (
//     <>
//       <ScrollView style={{height: '100%'}}>
//         {list.map((l, i) => (
//           <View
//             key={i}
//             onTouchEnd={openAstroProfile}
//             style={{
//               justifyContent: 'center',
//               alignItems: 'center',
//               marginHorizontal: 3,
//               marginVertical: 1,
//             }}>
//             <CallChatCard
//               name={l.name}
//               fields={l.fields}
//               languages_known={l.languages_known}
//               experience={l.experience}
//               rate={l.rate}
//               phone={l.phone}
//               navigation={navigation}
//             />
//           </View>
//         ))}
//       </ScrollView>
//       <Footer></Footer>
//     </>
//   );
// }

import * as React from 'react';
import {View, useWindowDimensions, Text} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {COLORS} from '../../../constants/theme';

const FirstRoute = (foo: any) => (
  <View style={{flex: 1, backgroundColor: '#fff'}}></View>
);

const SecondRoute = () => <View style={{flex: 1, backgroundColor: '#fff'}} />;

const renderScene = ({route}: any) => {
  switch (route.key) {
    case 'first':
      return <FirstRoute foo={'abcd'} />;
    case 'second':
      return <SecondRoute />;
    default:
      return null;
  }
};
export default function TabViewExample() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Info'},
    {key: 'second', title: 'Reviews'},
  ]);
  const renderTabBar = (props: any) => (
    <TabBar
      pressColor="#FF7007"
      {...props}
      indicatorStyle={{backgroundColor: COLORS.primary[200]}}
      style={{backgroundColor: '#fff'}}
      renderLabel={({route, focused, color}) => (
        <Text
          style={[
            {margin: 8, fontSize: 16, fontWeight: 'bold'},
            focused ? {color: COLORS.primary[400]} : {color: '#B9B9B9'},
          ]}>
          {route.title}
        </Text>
      )}
    />
  );

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
    />
  );
}

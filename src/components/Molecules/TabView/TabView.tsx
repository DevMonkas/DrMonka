import * as React from "react";
import { View, useWindowDimensions, Text } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

const FirstRoute = () => <View style={{ flex: 1, backgroundColor: "#fff" }} />;

const SecondRoute = () => <View style={{ flex: 1, backgroundColor: "#fff" }} />;

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

export default function TabViewExample() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Info" },
    { key: "second", title: "Reviews" },
  ]);
  const renderTabBar = (props: any) => (
    <TabBar
      pressColor="#FF7007"
      {...props}
      indicatorStyle={{ backgroundColor: "#FF7007" }}
      style={{ backgroundColor: "#fff" }}
      renderLabel={({ route, focused, color }) => (
        <Text
          style={[
            { margin: 8, fontSize: 16, fontWeight: "bold" },
            focused ? { color: "#FF7007" } : { color: "#B9B9B9" },
          ]}
        >
          {route.title}
        </Text>
      )}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}

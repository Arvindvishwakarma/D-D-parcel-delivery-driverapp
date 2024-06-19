/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import * as React from 'react';
import { View, Text, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import AssignedOrderCardScreen from './AssignedOrderCardScreen';


const FirstRoute = ({ navigation }) => (
  <ScrollView style={{ flex: 1, paddingHorizontal: 20, backgroundColor: 'white' }}>
    <AssignedOrderCardScreen />
  </ScrollView>
);

const renderScene = SceneMap({
  Assigned: FirstRoute,
});

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: 'black' }}
    style={{ backgroundColor: '#fff', color: 'black' }}
    renderLabel={({ route, focused, color }) => (
      <Text style={{ color: 'black', fontSize: 10, fontWeight: 'bold' }}>
        {route.title}
      </Text>
    )}
  />
);

export default function MainOrderViewScreen({ navigation }) {

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([{ key: 'Assigned', title: 'Assigned' }]);


  return (
    <>


      <TabView
        style={{ marginTop: -25 }}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={props => (
          <TabBar
            {...props}

            tabStyle={{ width: 130, }}
            scrollEnabled={true}
            style={{ backgroundColor: '#50E687' }}
          />
        )}

      />


    </>
  );
}

const style = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    backgroundColor: '#ecf0f1',
  },
});
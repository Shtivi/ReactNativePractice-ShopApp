import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Button, Platform, SafeAreaView, View } from 'react-native';
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import { useDispatch } from 'react-redux';
import Colors from '../constants/Colors';
import CartScreen, { screenOptions as cartScreenOptions } from '../screens/shop/CartScreen';
import OrdersScreen, { screenOptions as ordersScreenOptions } from '../screens/shop/OrdersScreen';
import ProductDetailScreen, { screenOptions as productDetailScreenOptions } from '../screens/shop/ProductDetailScreen';
import ProductsOverviewScreen, { screenOptions as productOverviewScreenOptions } from '../screens/shop/ProductsOverviewScreen';
import AuthScreen, { screenOptions as authScreenOptions } from '../screens/user/AuthScreen';
import EditProductScreen, { screenOptions as editProductScreenOptions } from '../screens/user/EditProductScreen';
import UserProductsScreen, { screenOptions as userProductsScreenOptions } from '../screens/user/UserProductsScreen';
import { logout } from '../store/actions/auth';


const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

const ProductsStackNavigator = createStackNavigator()
const ProductsNavigator = () => (
  <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
    <ProductsStackNavigator.Screen
      name="ProductsOverview"
      component={ProductsOverviewScreen}
      options={productOverviewScreenOptions}
    />
    <ProductsStackNavigator.Screen
      name="ProductDetail"
      component={ProductDetailScreen}
      options={productDetailScreenOptions}
    />
    <ProductsStackNavigator.Screen
      name="Cart"
      component={CartScreen}
      options={cartScreenOptions}
    />
  </ProductsStackNavigator.Navigator>
)

const OrdersStackNavigator = createStackNavigator()
const OrdersNavigator = () => (
  <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
    <OrdersStackNavigator.Screen
      name="Orders"
      component={OrdersScreen}
      options={ordersScreenOptions}
    />
  </OrdersStackNavigator.Navigator>
)

const AdminStackNavigator = createStackNavigator()
const AdminNavigator = () => (
  <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
    <AdminStackNavigator.Screen
      name="UserProducts"
      component={UserProductsScreen}
      options={userProductsScreenOptions}
      />
    <AdminStackNavigator.Screen
      name="EditProduct"
      component={EditProductScreen}
      options={editProductScreenOptions}
      />
  </AdminStackNavigator.Navigator>
)

const Tabs = AnimatedTabBarNavigator()
// export const ShopNavigator = () => (
//   <Tabs.Navigator
//     tabBarOptions={{
//       activeTintColor: 'black',
//       inactiveTintColor: 'black',
//       activeBackgroundColor: Colors.accent,
//       labelStyle: {
//         fontWeight: 'bold',
//       },
//       tabStyle: {
//         shadowColor: "#000",
//         shadowOffset: {
//           width: 0,
//           height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,
//         elevation: 5
//       }
//     }}
//     appearence={{
//       shadow: true,
//       floating: true,
//       topPadding: 10,
//       horizontalPadding: 10,
//       whenActiveShow: 'icon-only',
//       whenInactiveShow: 'icon-only',
//       dotSize: 'small',
//     }}>
//     <Tabs.Screen
//       name="Products"
//       component={ProductsNavigator}
//       options={{
//         tabBarIcon: ({ focused, color, size }) => (
//           <Ionicons
//             name={Platform.OS === 'android' ? 'md-home' : 'ios-home'}
//             size={24}
//             color={focused ? color : '#222'} />
//         )
//       }}
//     />
//     <Tabs.Screen
//       name="Orders"
//       component={OrdersNavigator}
//       options={{
//         tabBarIcon: ({ focused, color, size }) => (
//           <Ionicons
//             name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
//             size={24}
//             color={focused ? color : '#222'} />
//         )
//       }}
//     />
//     <Tabs.Screen
//       name="Admin"
//       component={AdminNavigator}
//       options={{
//         tabBarIcon: ({ focused, color, size }) => (
//           <Ionicons
//             name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
//             size={24}
//             color={focused ? color : '#222'} />
//         )
//       }}
//     />
//   </Tabs.Navigator>
// )

const ShopDrawerNavigator = createDrawerNavigator()
export const ShopNavigator = () => {
  const dispatch = useDispatch()

  return (
    <ShopDrawerNavigator.Navigator
      drawerContentOptions={{
        activeTintColor: Colors.primary
      }}
      drawerContent={props => {
        return (
          <View style={{ flex: 1, }}>
            <SafeAreaView
              forceInset={{ top: 'always', horizontal: 'never' }}
              style={{ flex: 1, justifyContent: 'space-between' }}>
              <View>
                <DrawerItemList {...props} />
              </View>
              <View>
                <Button title="Logout" color={Colors.primary} onPress={() => {
                  dispatch(logout())
                }} />
              </View>
            </SafeAreaView>
          </View>
        )
      }}>
      <ShopDrawerNavigator.Screen
        name="Products"
        component={ProductsNavigator}
        options={{
          drawerIcon: props => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              size={23}
              color={props.color}
            />
          )
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Orders"
        component={OrdersNavigator}
        options={{
          drawerIcon: props => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
              size={23}
              color={props.color}
            />
          )
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          drawerIcon: props => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
              size={23}
              color={props.color}
            />
          )
        }}
      />
    </ShopDrawerNavigator.Navigator>
  )
}

const AuthStackNavigator = createStackNavigator()

export const AuthNavigator = () => (
  <AuthStackNavigator.Navigator>
    <AuthStackNavigator.Screen
      name='Auth'
      component={AuthScreen}
      options={authScreenOptions}
    />
  </AuthStackNavigator.Navigator>
)
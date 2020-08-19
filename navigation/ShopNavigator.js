import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Platform, SafeAreaView, View, Button } from 'react-native';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../constants/Colors';
import CartScreen, { screenOptions as cartScreenOptions } from '../screens/shop/CartScreen';
import OrdersScreen, { screenOptions as ordersScreenOptions } from '../screens/shop/OrdersScreen';
import ProductDetailScreen, { screenOptions as productDetailScreenOptions } from '../screens/shop/ProductDetailScreen';
import ProductsOverviewScreen, { screenOptions as productOverviewScreenOptions } from '../screens/shop/ProductsOverviewScreen';
import AuthScreen, {screenOptions as authScreenOptions} from '../screens/user/AuthScreen';
import EditProductScreen, { screenOptions as editProductScreenOptions } from '../screens/user/EditProductScreen';
import UserProductsScreen, { screenOptions as userProductsScreenOptions } from '../screens/user/UserProductsScreen';
import { useDispatch } from 'react-redux';
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

// const MainNavigator = createSwitchNavigator({
//   Startup: StartupScreen,
//   Auth: AuthNavigator,
//   Shop: ShopNavigator
// });

// export default createAppContainer(MainNavigator);
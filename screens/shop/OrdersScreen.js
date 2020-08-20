import React, { useState, useCallback, useEffect } from 'react';
import { FlatList, Text, Platform, View, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import * as ordersActions from '../../store/actions/orders';

import HeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';
import Colors from '../../constants/Colors';

const OrdersScreen = props => {
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const orders = useSelector(state => state.orders.orders);
  const dispatch = useDispatch()

  const loadOrders = useCallback(async () => {
    console.log("Loading orders")

    try {
      setIsRefreshing(true)
      await dispatch(ordersActions.getOrders())
    } catch (err) {
      // setError(err.message)
    } finally {
      setIsRefreshing(false)
    }
  }, [dispatch])

  useEffect(() => {
    setIsLoading(true)
    loadOrders()
    setIsLoading(false)
  }, [loadOrders])

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator
          size='large'
          color={Colors.primary}
        />
      </View>
    )
  }

  if (!isLoading && orders.length === 0) {
    return (
      <View>
        <Text>You have no orders yet</Text>
      </View>
    )
  }

  return (
    <FlatList
      onRefresh={loadOrders}
      refreshing={isRefreshing}
      data={orders}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  );
};

export const screenOptions = navData => ({
  headerTitle: 'Your Orders',
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title="Menu"
        iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
        onPress={() => {
          navData.navigation.toggleDrawer();
        }}
      />
    </HeaderButtons>
  )
})

export default OrdersScreen;

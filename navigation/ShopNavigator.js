import {createAppContainer, createStackNavigator, createDrawerNavigator} from "react-navigation";
import ProductOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import CartScreen from "../screens/shop/CartScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import Icon from "react-native-vector-icons/Ionicons";

import Colors from "../constants/Colors";
import React from "react";

const defaultNavOptions ={
    headerStyle:{
        backgroundColor:Colors.primary
    },
    headerTintColor :'white'
};

const ProductsNavigator = createStackNavigator({
    ProductsOverview : ProductOverviewScreen,
    ProductDetail:ProductDetailScreen,
    Cart: CartScreen
},{
    defaultNavigationOptions:defaultNavOptions,
    navigationOptions: {
        drawerIcon: drawerConfig => <Icon
            name='md-cart'
            size={23}
            color={drawerConfig.tintColor}
        />
    }
});

const OrdersNavigator = createStackNavigator({
    Orders : OrdersScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Icon
            name='md-list'
            size={23}
            color={drawerConfig.tintColor}
        />
    },
    defaultNavigationOptions:defaultNavOptions
});

const AdminNavigator = createStackNavigator({
    UserProducts : UserProductsScreen,
    EditProduct : EditProductScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Icon
            name='md-create'
            size={23}
            color={drawerConfig.tintColor}
        />
    },
    defaultNavigationOptions:defaultNavOptions
});

const ShopNavigator = createDrawerNavigator({
    Products : ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator
},{
    contentOptions:{
        activeTintColor : Colors.primary,
    }
})

export default createAppContainer(ShopNavigator);

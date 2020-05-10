import React, { useEffect, useState, useCallback } from 'react';
import {FlatList, Text, Button, View, ActivityIndicator, StyleSheet} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import *as cartActions  from '../../store/actions/cart';
import *as productActions from  '../../store/actions/products';
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";


const ProductOverviewScreen = props =>{
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing , setIsRefreshing] = useState(false);

    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const loadProducts = useCallback( async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            await  dispatch(productActions.fetchProducts());
        } catch (e) {
            setError(e.message);
        }
        setIsRefreshing(false);
        setIsLoading(false);
    }, [dispatch, setError, setIsLoading]);

    useEffect(() => {
       const willFocusSub = props.navigation.addListener('willFocus', loadProducts);

       return () => {
           willFocusSub.remove();
       };
    },[loadProducts]);

    useEffect(()=>{
        setIsLoading(true);
        loadProducts().then(() => {
            setIsLoading(false)
        });
    }, [dispatch, loadProducts]);

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetail',
            {
                productId:id,
                productTitle:title
            })
    };

    if (error){
       return (<View style={styles.centered}>
           <Text> An error occurred !! </Text>
               <Button
                   title='Try again'
                   onPress={loadProducts}
                   color={Colors.primary}
               />
       </View>
       );
    };

    if (isLoading){
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        )
    };
    if (!isLoading && products.length === 0){
        return (
            <View style={styles.centered}>
                <Text>
            No products found. Maybe start adding some !
                </Text>
            </View>
        )
    }

    return <FlatList
        data = {products}
        onRefresh={loadProducts}
        refreshing={isRefreshing}
        renderItem = { itemData => <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelect={() => {
                selectItemHandler(itemData.item.id, itemData.item.title)
            }}
        >
            <Button
                color={Colors.primary}
                title='View Details'
                onPress={() => {
                    selectItemHandler(itemData.item.id, itemData.item.title)
                }}
            />
            <Button
                color={Colors.primary}
                title='To Cart'
                onPress={()=>{
                    dispatch(cartActions.addToCart(itemData.item))
                }}
            />
        </ProductItem>
        }
    />
};

ProductOverviewScreen.navigationOptions = navData => {
   return{
       headerTitle: 'All products',
       headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton} >
           <Item
               title='Cart'
               iconName='md-cart'
               onPress={()=>{
                   navData.navigation.navigate('Cart')
               }}
           />
       </HeaderButtons>,
       headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton} >
           <Item
               title='Menu'
               iconName='md-menu'
               onPress={()=>{
                   navData.navigation.toggleDrawer()
               }}
           />
       </HeaderButtons>,
   }
};
const styles=StyleSheet.create({
    centered:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})

export default ProductOverviewScreen;

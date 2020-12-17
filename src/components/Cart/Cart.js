import React, { Component } from 'react';
import Title from '../Title';
import CartColums from './CartColums';
import EmptyCart from './EmptyCart';
import CartList from './CartList';
import CartTotal from './CartTotal';
import {ProductConsumer} from '../store/Context';
 class Cart extends Component {
    render() {
        return (
            <section>
                <ProductConsumer>
                    {value => {
                        const {cart} = value ;
                        if(cart.length <1){
                          return  <EmptyCart />  
                        }
                        else{
                            return (
                                <div>
                                <Title name='your' title='title' />
                                 <CartColums />
                                 <CartList  value={value}/>
                                 <CartTotal value={value} />
                                </div>
                            )
                        }
                    }}
                </ProductConsumer>
             
            </section>
        )
    }
}
export default Cart;

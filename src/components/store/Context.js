import React, { Component } from 'react';
import { storeProducts ,detailProduct} from '../../data';

 const ProductContext = React.createContext();
 //Provider
 //Consumer


 class ProductProvider extends Component {
     state ={
        //  products : storeProducts,
          products :[] ,
         detailProduct : detailProduct,
        //  cart : storeProducts, just for testing purpose
           cart:[],
         modelOpen : false,
         modelProduct : detailProduct,
         cartSubTotal:0,
         cartTax:0,
         cartTotal:0
     } 
    setProducts = () => {
        let temproducts = [];
         storeProducts.forEach(item => {
                const singleItem = {...item};
                temproducts = [...temproducts ,singleItem ];
            });
         this.setState({products : temproducts});
     }
     componentDidMount(){
         this.setProducts();
     }
    //  utility method for selecting perticular item
     setItem =(id) => {
         const product = this.state.products.find(item => item.id ===id);
         return product ;
     }
     handleDetail = (id) => {
          const product = this.setItem(id);
          this.setState(() => {
          return  {detailProduct : product}
          })
     } ;
     addToCart =(id) => {
           let temproducts =[...this.state.products];
           const index = temproducts.indexOf(this.setItem(id));
           const product = temproducts[index];
             
           product.inCart = true;
           product.count  = 1;
           const price = product.price;
           product.total = price;
           this.setState(() => {
               return {products:temproducts , cart : [...this.state.cart , product]}
           }, this.addtoTotals);
     }
     openmodel = (id) => {
         
         const product = this.setItem(id);
         
         this.setState(() => {
             return {modelProduct : product , modelOpen : true}
         },)
        
     }
     closeModel =() => {
         this.setState(() => {
             return {modelOpen :false}
         })
     }

     increament = (id) => {
         const tempCart = [...this.state.cart];
         const selectedItem = tempCart.find(item => item.id ===id);
         const index = tempCart.indexOf(selectedItem);
         const product = tempCart[index];
         product.count  = product.count+1;
         product.total = product.count * product.price;
         this.setState(() => {
             return {
                 cart : [...tempCart]
             }
         },this.addtoTotals)
     }
     decreament = (id) => {
        const tempCart = [...this.state.cart];
         const selectedItem = tempCart.find(item => item.id ===id);

         const index = tempCart.indexOf(selectedItem);
         const product = tempCart[index];
        
         if(product.count === 0){
              this.removeItem(id);
         }else{
            product.count  = product.count-1;
            product.total = product.count * product.price;
            this.setState(() => {
                return {
                    cart : [...tempCart]
                }
            },this.addtoTotals)
         }
         
        
        
    }
    removeItem = id => {
        const temproducts = [...this.state.products];
        let tempCart = [...this.state.cart];
        tempCart = tempCart.filter(item => item.id !==id);
        const index = temproducts.indexOf(this.setItem(id));
        let removedItem = temproducts[index];
        removedItem.inCart = false;
        removedItem.count  = 0;
        const price = removedItem.price;
        removedItem.total = price;

        this.setState(() => {
            return {
                cart :[...tempCart],
                products:[...temproducts],

            }
        }, this.addtoTotals)
    }
    clearCart = () => {
       this.setState(() => {
            return {cart :[]}
        },() => {this.setProducts() ;this.addtoTotals() ;})
    }

    addtoTotals = () => {
        let subTotals = 0;
        this.state.cart.map(subtotal => subTotals += subtotal.total);
        const temptax = subTotals * 0.1;
        const tax = parseFloat(temptax.toFixed(2));
        // const tax = +temptax.toFixed(2);
        const total = subTotals+tax;
        this.setState(() => {
            return {
                cartSubTotal : subTotals,
                cartTax:tax,
                cartTotal:total
            }
        })
    }
     
    render() {
        // console.log(this.state);
        return (
            <ProductContext.Provider value={{
                ...this.state ,
                handleDetail : this.handleDetail ,
                addToCart : this.addToCart,
                openModel:this.openmodel,
                closeModel: this.closeModel,
                increament : this.increament,
                decreament : this.decreament,
                removeItem : this.removeItem,
                clearCart : this.clearCart
            }}>
                 {this.props.children} 
            </ProductContext.Provider>
        )
    }
}


 const ProductConsumer = ProductContext.Consumer;

 export { ProductProvider , ProductConsumer }

import React, { Component } from 'react';
import styled from 'styled-components';
import {ProductConsumer} from '../components/store/Context';
import {ButtonContainer} from './Button';
import {Link} from 'react-router-dom';
 class Model extends Component {
    render() {
        return (
            <ProductConsumer>
                {value => {
                    const {modelOpen , closeModel} = value
                  
                    const {img , title ,price} = value.modelProduct;
                    if(!modelOpen) {
                        return null;
                    }
                    else{
                    return(
                        <ModalWrapper>
                        <div className="container"> 
                          <div className="row">
                            <div id="model" className="col-8 mx-auto col-md-6 col-lg-4
                            text-center text-capitalize p-5">
                               <h5>Item added to Cart </h5>
                               <img src={img} className="img-fluid" alt='item' />
                               <h5>{title}</h5>
                               <h5 className="text-muted"> price : ${price}</h5> 
                                  <Link to="/">
                                      <ButtonContainer onClick={() =>  closeModel()}>
                                      continue to shop
                                      </ButtonContainer>  
                                  </Link>
                                  <Link to="/cart">
                                      <ButtonContainer cart  onClick={() => closeModel()}>
                                      go in cart
                                      </ButtonContainer>  
                                  </Link> 
                            </div>
                           </div>
                        </div>
                    </ModalWrapper>
                    )
                }}
    }
            </ProductConsumer>
        )
    }
}

const ModalWrapper = styled.div`
     position : fixed;
     top :0;
     left:0;
     right:0;
     bottom :0;
     background : rgba(0,0,0,0.3);
     display:flex;
     justify-content: center;
     align-items : center;
     #model{
        background : var(--mainWhite);
     }
    
`;

export default Model;
